// controllers/authController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const User = require('../models/user');
const upload = require('../middlewares/multer'); 

const saltRounds = 10;
const secretKey = 'your_secret_key'; // Replace with your actual secret key for JWT

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/'); // Set the folder where the profile photos will be stored
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      cb(null, file.fieldname + '-' + uniqueSuffix);
    },
  });

// User Registration
const register = async (req, res) => {
    try {
      const { username, email, password } = req.body;
  
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      const user = new User({ username, email, password: hashedPassword });
  
      if (req.file) {
        user.profilePhoto = req.file.path; // Save the profile photo path to the user object
      }
  
      await user.save();
  
      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Error registering user' });
    }
  };
// User Login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '1h' });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Error logging in' });
  }
};

module.exports = { register, login };
