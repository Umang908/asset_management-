const multer = require('multer');
const path = require('path');

// Storage Config
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname.replace(/\s+/g, '-'));
    }
});

// File Filter
const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|pdf|docx/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    if (extname) {
        return cb(null, true);
    } else {
        cb(new Error('Only images and document files are allowed'));
    }
};

module.exports = multer({
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB max
    fileFilter: fileFilter
});