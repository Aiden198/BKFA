const multer = require('multer');  // for uploads

const path = require('path');

const storage = multer.diskStorage({ // NEED TO CHANGE TO PERSISTANT STORAGE FOR LAUNCH, ie railway volume

    destination: (req, file, cb) => {

        cb(null, 'uploads/news');
    },

    filename: (req, file, cb) => {

        const uniqueName =
            Date.now() +
            '-' +
            Math.round(Math.random() * 1e9); // no unique names, probably change later

        cb(
            null,
            uniqueName +
            path.extname(file.originalname)  // keeps original extension like .png
        );
    }
});

const fileFilter = (req, file, cb) => {

    const allowedTypes = [
        'image/jpeg',
        'image/png',
        'image/webp'
    ];

    if (allowedTypes.includes(file.mimetype)) {

        cb(null, true); // (no error, allow file)

    } else {

        cb(
            new Error('Only JPG, PNG and WEBP allowed'),
            false
        );
    }
};

module.exports = multer({
    storage,
    fileFilter
});