// middlewares/multer.js
const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Set the folder where the profile photos will be stored
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix);
  },
});

const fileFilter = (req, file, cb) => {
  // Accept only image files (you can modify this condition based on your requirements)
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file format. Only image files are allowed.'));
  }
};

const upload = multer({ storage, fileFilter });

module.exports = upload;
