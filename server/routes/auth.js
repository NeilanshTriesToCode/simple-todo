// Express JS route/endpoint for the login and signup pages of the app
const express = require('express');

const { signupUser, loginUser } = require('../db/conn');

// define routers for signup and login
const signupRouter = express.Router();
const loginRouter = express.Router();

// signup router/API endpoint
signupRouter.post('/signup', (req, res) => {
    // extract username, email and password from req.body
    const { username, email, password } = req.body;
    
    // create/sign-up user
    let flag = signupUser(username, email, password);

    if(flag){
        res.status(200).send('User created.');
    }
    else{
        res.status(500).send('An unknown error occurred.');
    }
});

// login router/API endpoint
loginRouter.post('/login', (req, res) => {
    // extract email and password from req.body
    const { email, password } = req.body;
    
    // create/sign-up user
    let flag = loginUser(email, password);

    if(flag){
        /*
         NOTE: 
         Later on, after login is successful, i can send res.json() and send a JSON
         containing all the user info so that it could be used on the client side's (ReactJS)
         global Context
        */
        res.status(200).send('User is logged in.');
    }
    else{
        res.status(401).send('Invalid credentials.');
    } 
});

module.exports = {
    signupRouter, 
    loginRouter
};