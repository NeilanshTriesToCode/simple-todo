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
        console.log('output', output);
        if(output){
            console.log('\nSign-up successful.');
            res.status(200).send('Signed-up successfully.');
        }
        else{
            res.status(500).send('An unknown error occurred.');
        }
    });
});

// login router/API endpoint
loginRouter.post('/login', async (req, res) => {
    // extract email and password from req.body
    const { email, password } = req.body;
    
    // create/sign-up user
    loginUser(email, password)
    .then(output => {
        console.log('output:', output);
        if(output){
            /*
             NOTE: 
             Later on, after login is successful, i can send res.json() and send a JSON
             containing all the user info so that it could be used on the client side's (ReactJS)
             global Context
            */
            res.status(200).send('Logged in successfully.');
        }
        else{
            console.log('Invalid credentials.');
            res.status(401).send('Invalid credentials.');
        } 
    });
});

module.exports = {
    signupRouter, 
    loginRouter
};