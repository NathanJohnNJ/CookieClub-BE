const User = require("../users/model")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt") 
const saltRounds = process.env.SALT_ROUNDS

const hashPass = async (req, res, next) => {
    try {
        console.log(req.body)
        req.body.password = await bcrypt.hash(req.body.password,parseInt(saltRounds))	        
        console.log("Encrypting password.") 
        next()
	    } catch (error) {
            console.log(error)
	        res.status(501).json({errorMessage: error.message, error: error})
	}
}

const comparePass = async (req, res, next) => {
    try {
        req.user = await User.findOne({where: {username: req.body.username}})      
        if (req.user === null) {
            throw new Error ("Password or username doesn't match")
        }
        const comparePassword = await bcrypt.compare(req.body.password, req.user.password)
        if(!comparePassword){
            throw new Error ("Password or username doesn't match")
        } 
        console.log("PASSWORDS MATCH")
        next() 
    } catch (error) {
        console.log(error)
        res.status(501).json({errorMessage: error.message, error: error})
    }
}

const tokenCheck = async (req, res, next) => {
    console.log("Checking Token")
    try {
        console.log("Token passed = ", req.header("Authorization"))
        if (!req.header("Authorization")) {
            throw new Error("No header or token passed in the request")
        }
        const token = req.header("Authorization").replace("Bearer ", "")
        console.log("Encoded token = ", token)
        const decodedToken = jwt.verify(token, process.env.SECRET)
        console.log("DecodedToken = ", decodedToken)
        const user = await User.findOne({where: {id: decodedToken.id}})
        console.log("user = ", user)
        if(!user){
            throw new Error("User is not authorised")
        }
        req.authUser = user
        console.log("req.authUser = ", req.authUser)
        res.status(201).json({message: "Token check was a success."})
        next(req.authUser)
    } catch (error) {
        res.status(501).json({error})
        console.log(error)
    }
}

module.exports = {
   hashPass,
   comparePass,
   tokenCheck
}
