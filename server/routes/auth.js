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
    // extract 
});

module.exports = {
    signupRouter, 
    loginRouter
};