
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { initializeSocket } = require('./socket'); // Adjust the path accordingly
const authController = require('./controllers/authController');
const submissionController = require('./controllers/submissionController');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors())

// Create HTTP server
const server = app.listen(port, () => {
  console.log('Server Listening', port);
});

// Initialize Socket.IO
initializeSocket(server);

app.use(express.json());

// Use express static folder
app.use(express.static('public'));

// Use auth routes
app.use('/auth', authController);
app.use('/submissions', submissionController);

app.get('/', function (req, res) {
    console.log("/user request calle");
    res.send("Hello from the root application URL");
});
