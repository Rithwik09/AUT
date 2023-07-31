const express = require('express');
const mongoose = require('mongoose');
const path = require('path');


const app =express();

const PORT = process.env.PORT || 9000;

mongoose.connect(PORT, {
useNewUrlParser: true,
useUnifiedTopology: true,
});

mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));
mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB successfully!');
});

app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));



const authRoutes = require('./routes/authRoutes.js');

app.use('/auth', authRoutes);

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});



