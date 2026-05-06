require('dotenv').config();
const express = require('express');
const path = require('path');
const crypto = require('crypto');
const app = express();
const bp = require('body-parser')
const cors = require('cors')
const {getTransporter, getMailData} = require("./mail-service");
const {createFinanceStore} = require("./finance-store");

const CONTACT_FORM_WINDOW_MS = 10 * 60 * 1000;
const CONTACT_FORM_MAX_SUBMISSIONS = 5;
const CONTACT_FORM_MAX_FIELD_LENGTH = 5000;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const AUTH_COOKIE_NAME = 'jt_auth';
const AUTH_TOKEN_MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000;
const contactFormAttempts = new Map();

const allowedOrigins = [
  'https://joantolos.com',
  'https://www.joantolos.com',
  'http://localhost:4200'
];

const getRequiredEnv = (name) => {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
};

const getAuthUsername = () => getRequiredEnv('AUTH_USERNAME');
const getAuthPassword = () => getRequiredEnv('AUTH_PASSWORD');
const getAuthSessionSecret = () => getRequiredEnv('AUTH_SESSION_SECRET');
const isProduction = () => process.env.NODE_ENV === 'production';

const financeStore = createFinanceStore();

const getClientIp = (req) => {
  const forwardedFor = req.headers['x-forwarded-for'];
  if (typeof forwardedFor === 'string' && forwardedFor.length > 0) {
    return forwardedFor.split(',')[0].trim();
  }

  return req.ip || req.socket.remoteAddress || 'unknown';
};

const cleanupExpiredAttempts = (now) => {
  for (const [ipAddress, attempts] of contactFormAttempts.entries()) {
    const recentAttempts = attempts.filter((attemptTimestamp) => now - attemptTimestamp < CONTACT_FORM_WINDOW_MS);
    if (recentAttempts.length === 0) {
      contactFormAttempts.delete(ipAddress);
    } else {
      contactFormAttempts.set(ipAddress, recentAttempts);
    }
  }
};

const isRateLimited = (req) => {
  const now = Date.now();
  cleanupExpiredAttempts(now);

  const ipAddress = getClientIp(req);
  const attempts = contactFormAttempts.get(ipAddress) || [];
  const recentAttempts = attempts.filter((attemptTimestamp) => now - attemptTimestamp < CONTACT_FORM_WINDOW_MS);

  if (recentAttempts.length >= CONTACT_FORM_MAX_SUBMISSIONS) {
    contactFormAttempts.set(ipAddress, recentAttempts);
    return true;
  }

  recentAttempts.push(now);
  contactFormAttempts.set(ipAddress, recentAttempts);
  return false;
};

const normalizeField = (value) => {
  if (typeof value !== 'string') {
    return '';
  }

  return value.trim();
};

const validateContactForm = (body) => {
  const name = normalizeField(body.name);
  const email = normalizeField(body.email);
  const subject = normalizeField(body.subject);
  const message = normalizeField(body.message);
  const website = normalizeField(body.website);

  if (website.length > 0) {
    return { valid: false, status: 400, message: 'Invalid form payload' };
  }

  if (!name || !email || !subject || !message) {
    return { valid: false, status: 400, message: 'Missing required fields' };
  }

  if (!EMAIL_PATTERN.test(email)) {
    return { valid: false, status: 400, message: 'Invalid email' };
  }

  if ([name, email, subject, message].some((field) => field.length > CONTACT_FORM_MAX_FIELD_LENGTH)) {
    return { valid: false, status: 400, message: 'Field too long' };
  }

  return {
    valid: true,
    sanitized: { name, email, subject, message }
  };
};

const base64UrlEncode = (value) => Buffer.from(value).toString('base64url');
const base64UrlDecode = (value) => Buffer.from(value, 'base64url').toString('utf8');

const getCookieValue = (req, cookieName) => {
  const cookieHeader = req.headers.cookie;
  if (!cookieHeader) {
    return null;
  }

  const cookies = cookieHeader.split(';').map((cookie) => cookie.trim());
  const matchingCookie = cookies.find((cookie) => cookie.startsWith(`${cookieName}=`));
  return matchingCookie ? decodeURIComponent(matchingCookie.split('=').slice(1).join('=')) : null;
};

const signToken = (value) => crypto.createHmac('sha256', getAuthSessionSecret()).update(value).digest('hex');

const createAuthToken = () => {
  const payload = JSON.stringify({
    username: getAuthUsername(),
    issuedAt: Date.now()
  });
  const encodedPayload = base64UrlEncode(payload);
  const signature = signToken(encodedPayload);
  return `${encodedPayload}.${signature}`;
};

const readAuthToken = (token) => {
  if (!token || !token.includes('.')) {
    return null;
  }

  const [encodedPayload, signature] = token.split('.');
  if (!encodedPayload || !signature || signToken(encodedPayload) !== signature) {
    return null;
  }

  try {
    const payload = JSON.parse(base64UrlDecode(encodedPayload));
    if (payload.username !== getAuthUsername()) {
      return null;
    }

    if (Date.now() - payload.issuedAt > AUTH_TOKEN_MAX_AGE_MS) {
      return null;
    }

    return payload;
  } catch (_error) {
    return null;
  }
};

const setAuthCookie = (res) => {
  const cookieParts = [
    `${AUTH_COOKIE_NAME}=${encodeURIComponent(createAuthToken())}`,
    'Path=/',
    'HttpOnly',
    'SameSite=Strict',
    `Max-Age=${Math.floor(AUTH_TOKEN_MAX_AGE_MS / 1000)}`
  ];

  if (isProduction()) {
    cookieParts.push('Secure');
  }

  res.setHeader('Set-Cookie', cookieParts.join('; '));
};

const clearAuthCookie = (res) => {
  const cookieParts = [
    `${AUTH_COOKIE_NAME}=`,
    'Path=/',
    'HttpOnly',
    'SameSite=Strict',
    'Max-Age=0'
  ];

  if (isProduction()) {
    cookieParts.push('Secure');
  }

  res.setHeader('Set-Cookie', cookieParts.join('; '));
};

const isAuthenticated = (req) => {
  const token = getCookieValue(req, AUTH_COOKIE_NAME);
  return !!readAuthToken(token);
};

app.use(express.static(__dirname + '/dist'));
app.use(cors({
  credentials: true,
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error('Origin not allowed by CORS'));
  }
}))
app.use(bp.json({ limit: '20kb' }))
app.use(bp.urlencoded({ extended: true, limit: '20kb' }))

app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

app.get('/ping', function(req, res) {
  res.json({ site: 'Alive!' });
});

app.post('/auth/login', function(req, res) {
  const username = normalizeField(req.body?.username);
  const password = normalizeField(req.body?.password);

  if (!username || !password) {
    return res.status(400).send({ message: 'Missing credentials' });
  }

  if (username !== getAuthUsername() || password !== getAuthPassword()) {
    clearAuthCookie(res);
    return res.status(401).send({ message: 'Invalid credentials' });
  }

  setAuthCookie(res);
  return res.status(200).send({ authenticated: true });
});

app.post('/auth/logout', function(_req, res) {
  clearAuthCookie(res);
  return res.status(200).send({ authenticated: false });
});

app.get('/auth/session', function(req, res) {
  return res.status(200).send({ authenticated: isAuthenticated(req) });
});

app.get('/api/finance', async function(req, res) {
  if (!isAuthenticated(req)) {
    return res.status(401).send({ message: 'Unauthorized' });
  }

  try {
    return res.status(200).send(await financeStore.getDashboard());
  } catch (error) {
    console.error('Failed to load finance dashboard', error);
    return res.status(500).send({ message: 'Finance dashboard unavailable' });
  }
});

app.put('/api/finance', async function(req, res) {
  if (!isAuthenticated(req)) {
    return res.status(401).send({ message: 'Unauthorized' });
  }

  try {
    return res.status(200).send(await financeStore.saveDashboard(req.body || {}));
  } catch (error) {
    console.error('Failed to save finance dashboard', error);
    return res.status(500).send({ message: 'Finance dashboard could not be saved' });
  }
});

app.post('/submit-contact-form', function(req, res) {
  if (isRateLimited(req)) {
    return res.status(429).send({ message: "Too many requests" });
  }

  const validation = validateContactForm(req.body || {});
  if (!validation.valid) {
    return res.status(validation.status).send({ message: validation.message });
  }

  getTransporter().sendMail(getMailData(validation.sanitized), (error, info) => {
    if (error) {
      console.error(error);
      return res.status(500).send({ message: "Mail failed" });
    }
    res.status(200).send({ message: "Mail send", message_id: info.messageId });
  });
});

app.get('/cv', function(req, res) {
  res.redirect('/assets/cv.pdf');
});

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname + '/dist/index.html'));
});

financeStore.init()
  .then(() => {
    app.listen(process.env.PORT || 4200);
  })
  .catch((error) => {
    console.error('Failed to initialize finance store', error);
    process.exit(1);
  });
