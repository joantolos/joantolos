const crypto = require('crypto')
const nodemailer = require("nodemailer");
const algorithm = 'aes-256-ctr'

const getRequiredEnv = (name) => {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

const getUser = () => getRequiredEnv('MAIL_USER');
const getPass = () => getRequiredEnv('MAIL_PASS');
const getSiteEmail = () => process.env.SITE_EMAIL || getUser();
const getSmtpHost = () => process.env.SMTP_HOST || 'smtp.gmail.com';
const getSmtpPort = () => +(process.env.SMTP_PORT || 465);
const isSmtpSecure = () => process.env.SMTP_SECURE !== 'false';

const getTransporter = () => {
  return nodemailer.createTransport({
    port: getSmtpPort(),
    host: getSmtpHost(),
    auth: {user: getUser(), pass: getPass()},
    secure: isSmtpSecure(),
  });
}

const escapeHtml = (text) => {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
};

const getMailData = (body) => {
  return {
    from: getUser(),
    to: getSiteEmail(),
    subject: escapeHtml(body.subject),
    html: '<br><b>Message from: ' + escapeHtml(body.name) + ' </b></br><br><b>With email: ' + escapeHtml(body.email) + ' </b></br><br>' + escapeHtml(body.message) + '<br/>',
  };
}

const encrypt = (text, secretKey) => {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
  const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);
  return {
    iv: iv.toString('hex'),
    content: encrypted.toString('hex')
  };
};

module.exports = {
  getTransporter,
  getMailData,
  encrypt
};
