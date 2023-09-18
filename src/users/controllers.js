const jwt = require("jsonwebtoken")
const User = require("./model")

const registerUser = async (req, res) => {
    try {
        const user = await User.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            agreedToTerms: req.body.agreedToTerms
        })
        res.status(201).json({
            message: "Successfully registered",
            user: {username: req.body.username, firstName: req.body.firstName, lastName: req.body.lastName, email: req.body.email},
            token: jwt.sign({id: user.id}, process.env.SECRET)
        })
    } catch (error) {
        res.status(501).json ({errorMessage: error.message})
    }
}

const login = async (req, res) => {
    try {
	    const loggedInUser = await User.findOne({
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

const findUser = async(req, res) => {
    try {
        const UserFound = await User.findOne({
		where: {
			id: req.authUser.id
		}
	})
        console.log("Now in find user fuction. I have been passed req.authuser", req.authUser.id)
        if (!UserFound) {throw new Error("User not found")}
        console.log(UserFound)
        res.status(200).json({
            message: "Success, user found!",
            user: UserFound,
        })
    } catch (err) {
        res.status(501).json({ errorMessage: err.message });
    }
}
const findAll = async (req, res) => {
    try {
        const users = await User.findAll({});
    res.status(200).json({
        message: "Success, user found!",
        users: users,
    })
    } catch (error) {
        console.log(error);
	res.status(501).json({ errorMessage: error.message });
    }
};

const updateUsername = async(req, res) => {
    try {
        console.log("AuthUser from updateUser function = ", req.authUser)
        const userUpdated = await User.update(
            {username: req.body.updateValue},{
                where: {
                    id:req.authUser.id
                }
            })
        res.status(201).json({message: `${req.authUser.username}'s username successfully updated to ${req.body.updateValue}.`, user: {username: userUpdated.username, firstName: userUpdated.firstName, lastName: userUpdated.lastName, email: userUpdated.email}});
    } catch (err) {
        res.status(501).json({ errorMessage: err.message });
    }
}
const updatePassword = async(req, res) => {
    try {
        console.log("AuthUser from updateUser function = ", req.authUser)
        const userUpdated = await User.update(
            {password: req.body.updateValue},{
                where: {
                    id:req.authUser.id
                }
            })
        res.status(201).json({message: `${req.authUser.username}'s password successfully updated to ${req.body.updateValue}.`, user: {username: userUpdated.username, firstName: userUpdated.firstName, lastName: userUpdated.lastName, email: userUpdated.email}});
    } catch (err) {
        res.status(501).json({ errorMessage: err.message });
    }
}
const updateEmail = async(req, res) => {
    try {
        console.log("AuthUser from updateUser function = ", req.authUser)
        const userUpdated = await User.update(
            {email: req.body.updateValue},{
                where: {
                    id:req.authUser.id
                }
            })
        res.status(201).json({message: `${req.authUser.username}'s email successfully updated to ${req.body.updateValue}.`, user: {username: userUpdated.username, firstName: userUpdated.firstName, lastName: userUpdated.lastName, email: userUpdated.email}});
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
        res.status(201).json({message: `${req.authUser.firstName} ${req.authUser.lastName} (Username: ${req.authUser.username}) has been deleted.`});
    } catch (err) {
        res.status(501).json({ errorMessage: err.message });
    }
}

module.exports = {
    registerUser,
    login,
    findUser,
    findAll,
    updateUsername,
    updatePassword,
    updateEmail,
    deleteUser
}

