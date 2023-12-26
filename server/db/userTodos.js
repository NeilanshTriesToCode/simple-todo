// methods containing todo-related functions
const { ObjectId } = require('mongodb');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');     // to encrypt passwords

const { getUsersDB } = require('./conn');

// TEST function to get all to-dos of the user
const getTodos = async (uid) => {
    // return todos if user exists
    try{
         // retrieve user details 
        let user = await getUsersDB().findOne({ _id: new ObjectId(uid) });

        // if user found
        if(user){
            let { todos } = user;
            // check if the "todos" inside the user document is an empty Object
            if(Object.keys(todos).length > 0){
                console.log('\nTo-dos retrieved.');
                return { status: 200, message: 'Request complete.',  payload: { ...todos } };
            }

            // in case there are no todos currently
            console.log('\nNo to-dos found.');
            return { status: 200, message: 'No todos found.' };   // 204 = request complete, but no content found or to be returned

        }

        // user NOT found
        return { status: 404, message: 'Record not found. Incorrect uid.' };     // 404 = not found
    }catch(err){
        console.log(err);
        return { status: 500, message: 'An unknown error occurred. Please try again.' };      // 500 = internal server error
    } 
};

// function to add a TO-DO
/*
 ARGS:
 1. uid: user id
 2. todo: Object{} containing info for the new to-do
*/
const addTodo = async (uid, todo) => {
    // set filter to retrieve document by id
    let filter = { _id: new ObjectId(uid) };

    // prepare data to add
    /* 
     HOW TO-DOS ARE STORED:
     - every user document in the "Users" Collection has an empty Object{} "todos" by default.
     - Structure of "todos" when populated by list of to-dos:
        todos = {
            todo_ID_1 : {
                title: "todo 1",
                description: "description 1",
                isComplete: true
            },

            todo_ID_2 : {
                title: "todo 2",
                description: "description 2",
                isComplete: false
            },
        }
    - So key of the "todos" object is the id of the to-do generated using ObjectId(), and the 
      key corresponds to the to-do info encapsulated within a sub-object.
    */
    
    // new todo will have an id
    let newTodoId = new ObjectId();

    let updateTodo = {
        $set: {
            // add a new item inside the "todos" Object, nested within the user's document
            [`todos.${ newTodoId }`] : {
                ...todo,  // will contain to-do title and description
                isComplete: false,
                createdAt: new Date("<YYYY-mm-ddTHH:MM:ss>")  // current date 
            }
        },
    };

    // try adding the new todo
    try{
        let result = await getUsersDB().updateOne(filter, updateTodo);
        // console.log(result);

        // if add is successful
        if(result.modifiedCount === 1){
            // return response status
            console.log('\nAdded to-do to DB.');
            return { status: 201, message: 'To-do added successfully.' };
        }
        
        // if record NOT found
        console.log('\nIncorrect uid.');
        return { status: 404, message: 'Record not found.' };   

    }catch(err){
        console.log(err);
        return { status: 500, message: 'An unknown error occurred: Couldn\'t add the new task. Please try again.' };  
    }
};

// function to remove TO-Do
// REMINDER: To-dos are stored within the "todos" Object contained within the corresponding user's document
const removeTodo = async (uid, todoId) => {
    // set filter to retrieve document by id
    let filter = { _id: new ObjectId(uid) };

    // set up to remove todo with the matching todoId from the "todos" Object

    /* think of it as updating the corresponding user's document to remove the appropriate todo
       stored from the "todos" Object within the document.
    */
    let removeTodo = {
        $set: {
            // add a new item inside the "todos" Object, nested within the user's document
            [`todos.${ newTodoId }`] : {
                ...todo,  // will contain to-do title and description
                isComplete: false,
                createdAt: new Date("<YYYY-mm-ddTHH:MM:ss>")  // current date 
            }
        },
    };

    // remove the TO-DO
    try {
        let result = await getUsersDB().updateOne(filter, updateTodo);


    } catch (err) {
        console.log(err);
        return { status: 500, message: 'An unknown error occurred: Couldn\'t add the new task. Please try again.' };  
    }
};

module.exports = {
    getTodos,
    addTodo,
    removeTodo,
};