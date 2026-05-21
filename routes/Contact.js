var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');
var axios = require('axios');

router.get('/', function(req, res) {
  res.render('Contact', {
    submitted: req.query.submitted === '1'
  });
});

router.post('/submit', async function(req, res) {
  try {
    const {
      enquiryType,
      firstName,
      lastName,
      email,
      phone,
      message,
      'g-recaptcha-response': captchaToken
    } = req.body;

    if (!captchaToken) {
      return res.status(400).send('Captcha verification failed.');
    }

    const verificationURL =
      'https://www.google.com/recaptcha/api/siteverify';

    const captchaResponse = await axios.post(
      verificationURL,
      null,
      {
        params: {
          secret: process.env.RECAPTCHA_SECRET_KEY,
          response: captchaToken
        }
      }
    );

    if (!captchaResponse.data.success) {
      return res.status(400).send('Captcha verification failed.');
    }

    const newSubmission = {
      enquiryType,
      firstName,
      lastName,
      email,
      phone,
      message,
      submittedAt: new Date().toISOString()
    };

    const filePath = path.join(
      __dirname,
      '../data/contact-submissions.json'
    );

    let submissions = [];

    if (fs.existsSync(filePath)) {
      try {
        const fileData = fs.readFileSync(filePath, 'utf8');
        submissions = fileData ? JSON.parse(fileData) : [];
      } catch (err) {
        console.error('Error reading contact submissions file:', err);
        submissions = [];
      }
    }

    submissions.push(newSubmission);

    fs.writeFileSync(
      filePath,
      JSON.stringify(submissions, null, 2)
    );

    res.redirect('/contact?submitted=1');

  } catch (err) {
    console.error('Contact form error:', err);
    res.status(500).send('There was an error saving the form submission.');
  }
});

module.exports = router;