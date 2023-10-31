const jwt = require("jsonwebtoken")
const Nj = require("./model")
require("dotenv").config()

const registerNj = async (req, res) => {
    try {
        const nj = await Nj.create({
            username: req.body.username,
            password: req.body.password,
        })
        res.status(201).json({
            message: "Successfully registered",
            nj: {username: req.body.username},
            token: jwt.sign({id: user.id}, process.env.SECRET)
        })
    } catch (error) {
        res.status(501).json ({errorMessage: error.message})
    }
}

const login = async (req, res) => {
    try {
	    const loggedInUser = await Nj.findOne({
		    where: {
			    username: req.body.username
		    }
	    })
        res.status(200).json({
            message: `${req.body.username} successfully logged in.`,
		    user: loggedInUser,
            token: jwt.sign({id: loggedInUser.id}, process.env.SECRET)
        })
    } catch (error) {
        res.status(501).json({ errorMessage: error.message });
    }
}


module.exports = {
    registerNj,
    login
}

