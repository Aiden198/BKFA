const express = require('express');
const router = express.Router();
const uploadNewsImage = require('../middleware/uploadNewsImage');

const newsController = require('../controllers/newsController');

router.get('/', newsController.renderAdminNewsPage);

router.get(
    '/create',
    newsController.renderCreatePage
);

router.post(
    '/create',
    uploadNewsImage.any(),
    newsController.createArticle
);

router.post(
    '/delete/:id',
    newsController.deleteArticle
);

router.get(
    '/edit/:id',
    newsController.renderEditPage
);

router.post(
    '/edit/:id',

    uploadNewsImage.any(),

    newsController.updateArticle
);

module.exports = router;