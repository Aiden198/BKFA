var express = require('express');
var router = express.Router();

const {
  saveSubmission
} = require('../services/submissionService');

const {
  sendEmail
} = require('../services/emailService');

const buildBabyShowerEmail = require(
  '../services/templates/babyShowerEmail'
);

router.get('/', function(req, res) {
  res.render('Volunteer');
});

router.get('/kitsathome', function(req, res) {
  res.render('KitsAtHome');
});

router.get('/hostanassemblyday', function(req, res) {
  res.render('HostAnAssemblyDay');
});

router.get('/babyshowers', function(req, res) {
  res.render('BabyShowers');
});

router.post('/babyshowers', async function(req, res) {

  try {

    const newSubmission = {
      ...req.body,
      submittedAt: new Date().toISOString()
    };

    await saveSubmission(
      'baby-shower-submissions',
      newSubmission
    );

    const html = buildBabyShowerEmail(
      newSubmission
    );

    await sendEmail({
      to: process.env.BABY_SHOWER_EMAIL,
      subject: 'New Baby Shower Booking',
      html,
      replyTo: req.body.email
    });

    res.redirect(
      '/volunteer/babyshowers?submitted=1'
    );

  } catch (err) {

    console.error(
      'Baby shower form error:',
      err
    );

    res.status(500).send(
      'There was an error submitting the form.'
    );
  }
});

module.exports = router;
