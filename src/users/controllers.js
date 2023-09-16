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
            token: await jwt.sign({id: user.id}, process.env.SECRET)
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
	const successResponse = {
		message: `${req.body.username} successfully logged in.`,
		loggedInUser: loggedInUser
	}
        res.status(200).json({
            successResponse,
            token: await jwt.sign({id: req.user.id}, process.env.SECRET)
        })
    } catch (error) {
        res.status(501).json({ errorMessage: error.message });
    }
}

const findUser = async(req, res) => {
    try {
        let UserFound = await User.findOne({
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
    const successResponse = {
        message: "Found all users.",
        users: users
    };
    console.log(successResponse);
    res.status(200).json(successResponse);
    } catch (error) {
        console.log(error);
	res.status(501).json({ errorMessage: error.message });
    }
};

const updateUser = async(req, res) => {
    try {
        const userUpdated = await User.update(
            {[req.body.updateKey]: req.body.updateValue},{
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

module.exports = {
    registerUser,
    login,
    findUser,
    findAll,
    updateUser,
    deleteUser
}

