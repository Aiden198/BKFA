var express = require('express');
var router = express.Router();
var axios = require('axios');

const {
  saveSubmission
} = require('../services/submissionService');

const {
  sendEmail
} = require('../services/emailService');

const buildMembershipEmail = require(
  '../services/templates/membershipEmail'
);

router.get('/', function(req, res) {

  res.render('BecomeAMember', {
    submitted: req.query.submitted === '1'
  });

});

router.post('/', async function(req, res) {

  if (process.env.NODE_ENV !== 'development') {
    const {
      'g-recaptcha-response': captchaToken
    } = req.body;

    if (!captchaToken) {
      return res.status(400).send(
        'Captcha verification failed.'
      );
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
      return res.status(400).send(
        'Captcha verification failed.'
      );
    }
  }

  try {

    const newSubmission = {
      ...req.body,
      submittedAt: new Date().toISOString()
    };

    await saveSubmission(
      'membership-submissions',
      newSubmission
    );

    const html = buildMembershipEmail(
      newSubmission
    );

    await sendEmail({
      to: req.body.email,
      subject: 'Thank you for your membership application',
      html,
      replyTo: process.env.MEMBERSHIP_EMAIL
    });

    res.redirect(
      '/becomeamember?submitted=1'
    );

  } catch (err) {

    console.error(
      'Membership form error:',
      err
    );

    res.status(500).send(
      'There was an error submitting the form.'
    );
  }
});

module.exports = router;