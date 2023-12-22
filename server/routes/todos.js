// Express route for tasks
const express = require('express');

const { getTodos, addTodo } = require('../db/userTodos');

// define router
const todosRouter = express.Router();

// GET route to return all TO-DOS of the user
// this will mostly be a TEST ROUTE
todosRouter.get('/profile/:id/todos', async (req, res) => {
    // extract user id
    const { id } = req.params;

    // test retrieving user todos
    getTodos(id).then(output => {
        console.log(`\n${output.status}: ${output.message}`);
        res.status(output.status).json({ ...output });
    });
});

// POST route to create a new to-do
todosRouter.post('/profile/:id/todos/add', async (req, res) => {
    const { id } = req.params;

    // extract todo from request body
    const { newTodo } = req.body; 
    console.log(newTodo);

    // call function to add new todo to DB
    addTodo(id, newTodo).then(output => {
        console.log(`\n${output.status}: ${output.message}`);
        res.status(output.status).json({ ...output });
    });
});

module.exports = {
    todosRouter,
};