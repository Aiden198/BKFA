var express = require('express');
var router = express.Router();
var axios = require('axios');

const {
  saveSubmission
} = require('../services/submissionService');

const {
  sendEmail
} = require('../services/emailService');

const buildKitOrderEmail = require(
  '../services/templates/kitOrderEmail'
);

router.get('/', function(req, res) {

  res.render('CleanBirthKits');

});

router.get('/buyassembledkits', function(req, res) {

  res.render('BuyAssembledKits', {
    submitted: req.query.submitted === '1'
  });

});

router.post('/buyassembledkits', async function(req, res) {

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

  try {

    const newSubmission = {
      ...req.body,
      totalPrice:
        Number(req.body.numKits || 0) * 7,
      submittedAt: new Date().toISOString()
    };

    await saveSubmission(
      'assembled-kit-orders',
      newSubmission
    );

    const html = buildKitOrderEmail(
      newSubmission
    );

    await sendEmail({
      to: process.env.KIT_ORDER_EMAIL,
      subject: 'New Clean Birth Kit Order',
      html,
      replyTo: req.body.email
    });

    res.redirect(
      '/cleanbirthkits/buyassembledkits?submitted=1'
    );

  } catch (err) {

    console.error(
      'Kit order form error:',
      err
    );

    res.status(500).send(
      'There was an error submitting the order.'
    );
  }
});

module.exports = router;