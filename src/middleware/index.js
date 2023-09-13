const User = require("../users/model")
const jwt = require("jsonwebtoken")

const bcrypt = require("bcrypt") 

//                         // must match what is in .env file
const saltRounds = process.env.SALT_ROUNDS


//next needs to be passed as a parameter so it can be used to call the next function
const hashPass = async (req, res, next) => {
    try {
        console.log(req.body)
        // This is where the password is encrypted
        req.body.password = await bcrypt.hash(req.body.password,parseInt(saltRounds))	        
        console.log("Inside hashPass middleware function")
         
        next()

	    } catch (error) {
            console.log(error)
	        res.status(501).json({errorMessage: error.message, error: error})
        
	}
}

// To compare the entered password with the save/hashed password
const comparePass = async (req, res, next) => {
    try {
        //TODO: 
        // Find user in our database using the username passed in req.body
        // req.user = await User ....

        // use .compare() method to compare if the plain text password matches the hashed version stored in the database 

        // Error handling if password don't match OR username doesn't exist in the database 

        // Determine if the user given in the body of the request exists in the DB
        req.user = await User.findOne({where: {username: req.body.username}})      

        // If no username is entered, display an error
        if (req.user === null) {
            throw new Error ("password or username doesn't match")
        }

        // For teaching purposes only
        //  let hashedPassword = req.user.password
        //  const comparePassword = await bcrypt.compare(req.body.password, hashedPassword)

        //  If the passwords match, comparePassword will contain trye
        //                               order - plain text password first, then the hashed password second
        const comparePassword = await bcrypt.compare(req.body.password, req.user.password)

        // if password is blank the above comparePassword will fail anyway
        // So just need to test if the passwords do match, continue to the controller, else thros and error and give a suitable message
        if(!comparePassword){
            // Creating out own new Error (Error is a class).
            // If there is an error it will go to the catch(error) code, otherwise it will continue to next()
            // Don't be specific about username or password - hackers would know which one to concentrate on
            throw new Error ("password or username doesn't match")
        } 
        
        console.log("************ PASSWORDS MATCH ************")
        next()  // This will call the login controller -  because it is next in the login route in routes.js
    } catch (error) {
        console.log(error)
        res.status(501).json({errorMessage: error.message, error: error})
    }
}

const tokenCheck = async (req, res, next) => {
    console.log("************** Hi from tokenCheck")

    try {

        console.log(" ************* req.header(Authorization) = ", req.header("Authorization"))
        console.log(req.header("Authorization"))
        //If not authorisation in header, error out
        if (!req.header("Authorization")) {
            throw new Error("No header or token passed in the request")
        }

        // Retrieve the encoded token from the header
        // If not true, error and stop, otherwise continue
        // It is standard practice to preface the authorisation with "Bearer ", but it will cause an error for us, therefore we change it to ""
        const token = req.header("Authorization").replace("Bearer ", "")
        console.log(" ************* encoded token = ", token)

        // First value is the encoded token, second value is the secret key from .env file
        const decodedToken = jwt.verify(token, process.env.SECRET)
        console.log(" ************* decodedToken = ", decodedToken)

          // Look for a user with that token in the DB
        const user = await User.findOne({where: {id: decodedToken.id}})
        console.log(" ************* user = ", user)
       
        
      
        // If no such user is found, the token is invalid
        if(!user){
            throw new Error("User is not authorised")
        }

        //  The user has been verified, and we are calling it req.authUser
        req.authUser = user
        console.log("********** req.authUser = ", req.authUser)

        // Just for testing - don't really want a response, because that ends it and we want to move on to the next part of the route
        // res.status(201).json({message: "success"})
        
        next()

    } catch (error) {
        res.status(501).json({errorMessage: error.message, error: error})
    }
}


// exported to be used in the routes file
module.exports = {
   hashPass,
   comparePass,
   tokenCheck
}
