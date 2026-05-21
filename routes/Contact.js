var express = require('express');
var router = express.Router();
var axios = require('axios');

const { sendEmail } = require('../services/emailService');
const buildContactEmail = require(
  '../services/templates/contactEmail'
);
const {
  saveSubmission
} = require('../services/submissionService');

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

    await saveSubmission(
        'contact-submissions',
        newSubmission
    );

    const html = buildContactEmail(newSubmission);

    await sendEmail({
      to: process.env.CONTACT_EMAIL,
      subject: `BKFA Contact Form - ${enquiryType}`,
      html,
      replyTo: email
    });

    res.redirect('/contact?submitted=1');

  } catch (err) {
    console.error('Contact form error:', err);
    res.status(500).send('There was an error saving the form submission.');
  }
});

module.exports = router;