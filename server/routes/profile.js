// Express route for user
const express = require('express');

const { getUserProfile, updateProfile } = require('../db/conn')

// define router
const profileRouter = express.Router();

// defining the GET endpoint, which displays user's profile
// JUST A TEST ROUTE, NOT GONNA USE IT
profileRouter.get('/profile/:id', async (req, res) => {
    const { id } = req.params;

    // test retrieving user data from DB and sending it to client
    getUserProfile(id)
    .then(output => {
        console.log(`\n${output.status}: ${output.message}`);
        res.status(output.status).json({ ...output });
    });
});

// defining the PUT endpoint to update the user's profile
profileRouter.put('/profile/update/:id', async (req, res) => {
    // get id from URL
    const { id } = req.params;

    // retrieve JSON Object from req.body
    const updateItems = req.body;

    // call method to update user profile
    updateProfile(id, updateItems)
    .then(output => {
        console.log(`\n${output.status}: ${output.message}`);
        res.status(output.status).json({ ...output });
    });
});


module.exports = {
    profileRouter,
}