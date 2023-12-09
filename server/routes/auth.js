// Express JS route/endpoint for the login and signup pages of the app
const express = require('express');

const { signupUser, loginUser } = require('../db/userProfile');

// define routers for signup and login
const signupRouter = express.Router();
const loginRouter = express.Router();

// signup router/API endpoint
signupRouter.post('/signup', async (req, res) => {
    // extract username, email and password from req.body
    const { username, email, password } = req.body;
    
    // create/sign-up user
    signupUser(username, email, password)
    .then(output => {
        console.log(`\n${output.status}: ${output.message}`);
        res.status(output.status).json({ ...output });
    });
});

// login router/API endpoint
loginRouter.post('/login', async (req, res) => {
    // extract email and password from req.body
    const { email, password } = req.body;
    
    // create/sign-up user
    loginUser(email, password)
    .then(output => {
        console.log(`\n${output.status}: ${output.message}`);
        res.status(output.status).json({ ...output });
    });
});

module.exports = {
    signupRouter, 
    loginRouter
};