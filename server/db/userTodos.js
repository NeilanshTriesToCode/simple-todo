// methods containing todo-related functions
const { ObjectId } = require('mongodb');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');     // to encrypt passwords

const { getUsersDB } = require('./conn');

// TEST function to get all tasks of the user
const getTodos = async (uid) => {
    // retrieve user details 
    let user = await getUsersDB().findOne({ _id: new ObjectId(uid) });

    // return todos if user exists
    try{
        // if user found
        if(user){
            let { todos } = user;
            // check if the "todos" inside the user document is an empty Object
            if(Object.keys(todos).length > 0){
                return { status: 200, message: 'Request complete.',  payload: todos };
            }

            // in case there are no todos currently
            return { status: 204, message: 'No todos found.' };   // 204: request complete, but no content found or to be returned
        }

        // user NOT found
        return { status: 404, message: 'Record not found. Incorrect uid.' }     // 404 = not found
    }catch(err){
        console.log(err);

    }
    
}