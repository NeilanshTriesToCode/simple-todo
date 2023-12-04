// Express JS route/endpoint for the login and signup pages of the app
const express = require('express');

const db = require('../db/conn');

// define routers for signup and login
const signupRouter = express.Router();
const loginRouter = express.Router();

// signup router/API endpoint
signupRouter.post('/signup', (req, res) => {
    console.log(req.body.email, req.body.pw);
    res.send('Signup route');
});

// login router/API endpoint
loginRouter.post('/login', (req, res) => {
    console.log(req.body.email, req.body.pw);
    res.send('Login route');
});

module.exports = {
    signupRouter, 
    loginRouter
};