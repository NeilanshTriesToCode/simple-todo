// file to connect to db and other db-related methods
const { MongoClient } = require('mongodb');

const url = process.env.ATLAS_URL;

// create MongoDB client to connect to the DB
const client = new MongoClient(url);

// function to connect to the DB
const connectToServer = () => {
    // connect to the server
    client.connect()
        .then(mongoClient => {
            console.log('\nConnected to the database.');
        })
        .catch(err => {
            console.log('Couldn\'t connect to the database: ', err);
        }); 
};

// function to signup/create user
const signupUser = () => {
    
};

// function to login user
const loginUser = () => {

};


module.exports = {
    connectToServer,
    signupUser, 
    loginUser,
};

