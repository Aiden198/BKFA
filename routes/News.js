var express = require('express');
var router = express.Router();
var path = require('path');

const newsController = require('../controllers/newsController');

router.get('/', newsController.renderNewsPage);

router.get(
    '/preview/:slug',
    newsController.renderPreviewPage
);

router.get('/:slug', newsController.renderArticlePage);

module.exports = router;