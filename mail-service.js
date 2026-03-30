const crypto = require('crypto')
const nodemailer = require("nodemailer");
const algorithm = 'aes-256-ctr'
const secretKey = process.env.SITE_SECRET

const getUser = () => {
  return decrypt({
    "iv": "ebb43f53b8e918d52e327ea67cfec376",
    "content": "147f3b2ceb4a17993338178e5d49b72c994d8ff5832df14d37053ca4f9bc64bb76"
  });
}

const getPass = () => {
  return decrypt({
    "iv": "c436a03f84b735a481e959857ffede8b",
    "content": "d323200777243c7c162ad4cf1cd9f645"
  });
}

const getSiteEmail = () => {
  return decrypt({
    "iv": "7ac2e1bd6f53d422f995442ebc27c9ef",
    "content": "27beaa698281b052fc6c47cc3dd4b36ff714"
  });
}

const getTransporter = () => {
  return nodemailer.createTransport({
    port: 465,
    host: "smtp.gmail.com",
    auth: {user: getUser(), pass: getPass()},
    secure: true,
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

const encrypt = (text) => {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
  const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);
  return {
    iv: iv.toString('hex'),
    content: encrypted.toString('hex')
  };
};

const decrypt = (hash) => {
  const decipher = crypto.createDecipheriv(algorithm, secretKey, Buffer.from(hash.iv, 'hex'));
  const decrypted = Buffer.concat([decipher.update(Buffer.from(hash.content, 'hex')), decipher.final()]);
  return decrypted.toString();
};

module.exports = {
  getTransporter,
  getMailData
};
