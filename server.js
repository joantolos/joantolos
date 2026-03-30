const express = require('express');
const path = require('path');
const app = express();
const bp = require('body-parser')
const cors = require('cors')
const {getTransporter, getMailData} = require("./mail-service");

app.use(express.static(__dirname + '/dist'));
app.use(cors())
app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))

app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

app.get('/ping', function(req, res) {
  res.json({ site: 'Alive!' });
});

app.post('/submit-contact-form', function(req, res) {
  getTransporter().sendMail(getMailData(req.body), (error, info) => {
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
