var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');

router.get('/', function(req, res) {
  res.render('Contact', {
    submitted: req.query.submitted === '1'
  });
});

router.post('/submit', function(req, res) {
  const { enquiryType, firstName, lastName, email, phone, message } = req.body;

  const newSubmission = {
    enquiryType,
    firstName,
    lastName,
    email,
    phone,
    message,
    submittedAt: new Date().toISOString()
  };

  const filePath = path.join(__dirname, '../data/contact-submissions.json');

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

  try {
    fs.writeFileSync(filePath, JSON.stringify(submissions, null, 2));
    res.redirect('/contact?submitted=1');
  } catch (err) {
    console.error('Error writing contact submissions file:', err);
    res.status(500).send('There was an error saving the form submission.');
  }
});

module.exports = router;