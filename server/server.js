// main server/backend file

// import dependencies
const express = require('express');
const cors = require('cors');
require('dotenv').config();      // sets the ".env" file as default config file

// import routes/API endpoints


const app = express();

const port = process.env.PORT || 5000;

// configure app
app.use(cors());          // allow CORS functionality across all routes
app.use(express.json());     // allow incoming requests to be parsed with JSON payloads

// use routes

app.listen(port, () => {
    console.log(`Server up and running on PORT: ${port}`);

});
