// file to connect to db and other db-related methods
const { MongoClient } = require('mongodb');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');     // to encrypt passwords

const url = process.env.ATLAS_URL;

// create MongoDB client to connect to the DB
const client = new MongoClient(url);

var db;        // to contain the database object
var usersDB;  // to contain reference to the "Users" Collection containing users info

// function to connect to the DB
const connectToServer = () => {
    // connect to the server
    client.connect()
        .then(mongoClient => {
            // initialize db and "Users" Collection
            db = mongoClient.db('simple_todo');      // gets the "simple_todo" DB
            usersDB = db.collection('users');        // gets the "users" Collection from the "simple_todo" DB

            console.log('\nConnected to the database.');
        })
        .catch(err => {
            console.log('Couldn\'t connect to the database: ', err);
        }); 
};

// getter function to return DB object
const getDB = () => {
    return db;
}

// getter function to return reference to the "Users" Collection
const getUsersDB = () => {
    return usersDB;
}

// function to signup/create user
const signupUser = async (username, email, password) => {
    // for hashing
    var salt = bcrypt.genSaltSync(10);

    // prepare document to be inserted
    let newUser = {
        username: username,
        email: email,
        password: bcrypt.hash(password, salt),
        tasks: []
    };

    // create an account by
    // inserting document into the "Users" Collection
    try{
        let result = await getUsersDB().insertOne(newUser);
        if(result.acknowledged){
            console.log('\nUser added to DB.');
            return true;
        }
    }catch(err){
        console.log(err);
        return false;
    }
};

// function to login user
const loginUser = async (email, password) => {
    // for hashing
    var salt = bcrypt.genSaltSync(10);

    // validate user credentials
    try{
        let userID = await getUsersDB().findOne({
            email: email,
            password: await bcrypt.hash(password, salt)
        });

        if(userID){
            console.log('\nLogin successful.');
             /*
              NOTE: 
              - Later on, after login is successful, this function can return a JSON Object
              containing all the user info so that it could be used on the client side's (ReactJS)
              global Context. 
              - Since findOne() already returns the userID, can use this to return all the details to the client, 
              which could be used in the client's Context.
              - For now, only returning a boolean.
            */
            return true;
        }
    }catch(err){
        console.log(err);
        return false;
    }
};



module.exports = {
    connectToServer,
    getDB, 
    getUsersDB,
    signupUser, 
    loginUser,
};

