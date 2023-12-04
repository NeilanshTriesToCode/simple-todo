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
const signupUser = () => {

};

// function to login user
const loginUser = () => {

};



module.exports = {
    connectToServer,
    getDB, 
    getUsersDB,
    signupUser, 
    loginUser,
};

