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

const buildKitOrderEmail = require(
  '../services/templates/kitOrderEmail'
);

router.get('/', function(req, res) {
  res.render('Volunteer');
});

router.get('/kitsathome', function(req, res) {
  res.render('KitsAtHome', {
    submitted: req.query.submitted === '1'
  });
});

router.post('/kitsathome', async function(req, res) {
  try {
    const newSubmission = {
      ...req.body,
      submittedAt: new Date().toISOString()
    };

    await saveSubmission('kits-at-home-submissions', newSubmission);

    const html = buildKitOrderEmail(newSubmission);

    await sendEmail({
      to: req.body.email,
      subject: 'Thank you for your Kits At Home booking',
      html
    });

    res.redirect('/volunteer/kitsathome?submitted=1');

  } catch (err) {
    console.error('Kits At Home form error:', err);
    res.status(500).send('There was an error submitting the form.');
  }
});

router.get('/hostanassemblyday', function(req, res) {
  res.render('HostAnAssemblyDay');
});

router.get('/babyshowers', function(req, res) {
  res.render('BabyShowers',  {
    submitted: req.query.submitted
  });
});

// Serve the dedicated Corporate Volunteering page from compact, hyphenated, and legacy-cased Volunteer URLs.
router.get([
  '/corporatevolunteering',
  '/corporate-volunteering',
  '/CorporateVolunteering',
  '/Corporate-Volunteering'
], function(req, res) {
  res.render('CorporateVolunteering');
});

// Keep legacy workplace-giving links working alongside the preferred slug.
router.get([
  '/workplacegiving',
  '/workplace-giving',
  '/WorkplaceGiving',
  '/Workplace-Giving'
], function(req, res) {
  res.render('WorkplaceGiving');
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
      to: req.body.email,
      subject: 'Thank you for your form Submission to the Birthing Kit Foundation',
      html,
      replyTo: process.env.BABY_SHOWER_EMAIL
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
