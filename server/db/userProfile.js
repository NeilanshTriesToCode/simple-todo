const { ObjectId } = require('mongodb');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');     // to encrypt passwords

const { getUsersDB } = require('./conn');

// function to signup/create user
const signupUser = async (username, email, password) => {
    // for hashing
    var salt = bcrypt.genSaltSync(10);

    // prepare document to be inserted
    let newUser = {
        username: username,
        email: email,
        password: await bcrypt.hash(password, salt),
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
    let user = await getUsersDB().findOne({ email: email });
       
    // validate user credentials
    try{
        // console.log(user);
        if(user){
            console.log('\nLogin successful.');
            /*
              NOTE: 
              - Later on, after login is successful, this function can return a JSON Object
                containing all the user info so that it could be used on the client side's (ReactJS)
                global Context. 
              - Since findOne() already returns the user data as an Object, can return the user's details to the  
                client/frontend side, which could be used in the client's Context.
              - For now, only returning a boolean.
            */
           
            // compare hashed passwords
            /* 
             the awaited value from the bcrypt.compare() method returns a boolean
             based on whether the entered password and the hashed value from the DB match.
            */
            return await bcrypt.compare(password, user.password);
            }
            else{
                console.log('\nInvalid user creds.');
                return false;
            }
    }catch(err){
        console.log(err);
    }
};

// view user profile (NOT TO BE USED, JUST FOR TESTING)
const getUserProfile = async (uid) => {
    // retrieve user data from the Collection
    let user = await getUsersDB().findOne({ _id: new ObjectId(uid) });

    try{
        // if record found
        if(user){
            console.log('\nUser profile retrieved.');

            // destructure to exclude user password and avoid
            // sending it in the response Object
            let { password, ...userData } = user;   

            // send user data along with response status
            return { ...userData, status: 200, message: 'Request complete.' }   // 200 = request fulfilled
        }

        // if record NOT found
        console.log('\nUser profile not found. Incorrect uid.');
        return { status: 404, message: 'Record not found. Incorrect uid.' }     // 404 = not found

    }catch(err){
        console.log(err);
        return { status: 500, message: 'Unknown error occured.' }      // 500 = internal server error
    }
};

// edit user profile
/*
  ARGS:
  1. uid: user id passed from the client
  2. updates: Object containing updated values of fields the user wants to change
*/
const updateProfile = async (uid, updates) => {
    // set filter to retrieve document by id
    let filter = { _id: new ObjectId(uid) };

    // prepare data to update
    let updateData = {
        $set: {
            ...updates
        }
    };

    // retrieve user data from the Collection
    try{
        let result = await getUsersDB().updateOne(filter, updateData);
        // console.log(result);

        // if record update is successful
        if(result.modifiedCount === 1){
            // send user data along with response status
            return { status: 201, message: 'Profile updated.' }   // 201 = content has been written successfully
        }
        
        // if record NOT found
        return { status: 404, message: 'Record not found.'}      // 404 = not found

    }catch(err){
        console.log(err);
        return { status: 500, message: 'Unknown error occured.' }      // 500 = internal server error
    }
};

module.exports = {
    signupUser,
    loginUser,
    getUserProfile,
    updateProfile
}