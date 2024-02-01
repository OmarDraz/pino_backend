require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { initializeSocket } = require('./socket'); // Adjust the path accordingly
const authController = require('./controllers/authController');
const submissionController = require('./controllers/submissionController');

const app = express();
const port = process.env.PORT || 3000;

// Create HTTP server
const server = app.listen(port, '0.0.0.0', () => {
  console.log('Server Listening');
});

// Initialize Socket.IO
initializeSocket(server);

app.use(cors());
app.use(express.json());

// Use express static folder
app.use(express.static('public'));

// Use auth routes
app.use('/auth', authController);
app.use('/submissions', submissionController);

const Submission = require('./models/submissionModel');

// Create an endpoint to save an attendee
app.post('/api/attendees', (req, res) => {
  const io = require('./socket').getIo();
  // Assuming you have the necessary data in the request body
  const newAttendee = new Submission(req.body);
  newAttendee.postSubmission(io, res);
});
