// Express route for tasks
const express = require('express');

const { getTodos } = require('../db/userTodos');

// define router
const todosRouter = express.Router();

// GET route to return all TODOS of the user
// this will mostly be a TEST ROUTE
todosRouter.get('/todos/:id', async (req, res) => {
    // extract user id
    const { id } = req.params;

    // test retrieving user todos
    getTodos(id).then(output => {
        console.log(`\n${output.status}: ${output.message}`);
        res.status(output.status).json({ ...output });
    });
});

module.exports = {
    todosRouter,
};