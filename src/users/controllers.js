// login user, deleteUser, updateUser, (search via username and update email and password)
// find user or search 

const jwt = require("jsonwebtoken")
const User = require("./model")
console.log("!!!!!!!")

const registerUser = async (req, res) => {    
    console.log(req.body)
    try { 
        const user = await User.create ({
            forename: req.body.forename,
            surname: req.body.surname,
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        })

        res.status(201).json({
            message: "successfully registered",
            user: {username: req.body.username, email: req.body.email},
            token: await jwt.sign({id: user.id}, process.env.SECRET)
        })
    } catch (error) {
        res.status(501).json ({errorMessage: error.message})
    }
}


const login = async (req, res) => {
    try { 
        res.status(200).json({
            message: "success",
            user: req.user,
            token: await jwt.sign({id: req.user.id}, process.env.SECRET)
        })
    } catch (error) {
        res.status(501).json({ errorMessage: error.message });
    }
}

const findUser = async(req, res) => {
    try {
        let UserFound = await User.findOne({where: req.header("username")})
        console.log("Hi from findUser. req.body = ", req.body)
        if (!UserFound) {throw new Error("User not found")}
        console.log(UserFound)
        res.status(200).json({
            message: "success",
            user: UserFound,
        })
    } catch (err) {
        res.status(501).json({ errorMessage: err.message });
    }
}

const updateUser = async(req, res) => {
    try {
        const updateKey = req.body.updateKey
        const updateValue = req.body.updateValue
        const userUpdated = await User.update(
            {[updateKey]: updateValue},{
                where: {
                    id:req.authUser.id
                }
            })
        res.status(201).json({message: `${req.authUser.username}'s ${req.body.updateKey} successfully updated to ${req.body.updateValue}.`, user: userUpdated});
    } catch (err) {
        res.status(501).json({ errorMessage: err.message });
    }
}

const deleteUser = async(req, res) => {
    try {
        await User.destroy({
            where: {
                id:req.authUser.id
            }
        });
        res.status(201).json({message: `deleted user`});
    } catch (err) {
        res.status(501).json({ errorMessage: err.message });
    }
}

const findAllUsers = async (req, res) => {
    try {
        const users = await User.findAll({where: req.body})
        res.status(201).json({message: `users found`, body:users});
    } catch (err) {
        res.status(501).json({ errorMessage: err.message });
    }
}

module.exports = {
    registerUser,
    login,
    findUser,
    updateUser,
    deleteUser,
    findAllUsers
}

