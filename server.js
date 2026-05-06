const express = require('express');
const path = require('path');
const app = express();
const bp = require('body-parser')
const cors = require('cors')
const {getTransporter, getMailData} = require("./mail-service");

const CONTACT_FORM_WINDOW_MS = 10 * 60 * 1000;
const CONTACT_FORM_MAX_SUBMISSIONS = 5;
const CONTACT_FORM_MAX_FIELD_LENGTH = 5000;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const contactFormAttempts = new Map();

const allowedOrigins = [
  'https://www.joantolos.com',
  'http://localhost:4200'
];

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

app.use(express.static(__dirname + '/dist'));
app.use(cors({
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

app.listen(process.env.PORT || 4200);
