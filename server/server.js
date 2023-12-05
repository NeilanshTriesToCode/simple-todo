// main server/backend file

// import dependencies
const express = require('express');
const cors = require('cors');
require('dotenv').config();      // sets the ".env" file as default config file

// import DB-related files
const { connectToServer } = require('./db/conn');

// import routes/API endpoints
const { signupRouter, loginRouter } = require('./routes/auth');

const app = express();

const port = process.env.PORT || 5000;

// configure app
app.use(cors());                                  // allow CORS functionality across all routes
app.use(express.json());                          // allow incoming requests to be parsed with JSON payloads
app.use(express.urlencoded({ extended: true }));   // allow incoming requests to be parsed with URL payloads, so they can be accessed using req.body

// use routes
app.use(signupRouter);
app.use(loginRouter);

app.listen(port, () => {
    console.log(`Server up and running on PORT: ${port}.`);

    // connect to the DB 
    connectToServer();
});
