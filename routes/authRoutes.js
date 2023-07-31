const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authenticateJWT = require('../middlewares/authMiddleware');

// Add multer middleware for profile photo upload
const upload = require('../middlewares/multer');

// Register a new user with profile photo upload
router.post('/register', upload.single('profilePhoto'), authController.register);

router.get('/secure-route', authenticateJWT, (req, res) => {
    res.json({ message: 'This is a secure route!' });
  });

// Register a new user
router.post('/register', authController.register);

// Login a user
router.post('/login', authController.login);

module.exports = router;