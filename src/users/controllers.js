const User = require("./model")

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({});
    const successResponse = {
        message: "Found all users.",
        users: users
    };
    res.status(200).json(successResponse);
    } catch (error) {
        console.log(error);
    }
};

const addUser = async (req, res) => {
    try {
        const newUser = await User.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
            agreeToTerms: req.body.agreeToTerms
        })
        const successResponse = {
            message: `${req.body.firstName} ${req.body.lastName} successfully added.`,
            newUser: newUser
        }
        res.status(200).json(successResponse);
    } catch (error) {
        console.log(error);
    }
};
const updateUser = async (req, res) => {
    try {
        const updateKey = req.body.updateKey
        const updatedUser = await User.updateOne(
            { username: req.body.username },
            { $set :{ [updateKey]: req.body.updateValue }
        });
        const successResponse = {
            message: `${req.body.firstName} ${req.body.lastName}'s ${req.body.updateKey} field successfully updated to ${req.body.updateValue}.`,
            updatedUser: updatedUser
        }
        res.send(successResponse);
    } catch (error) {
        console.log(error);
    } 
};
const deleteUser = async (req, res) => {
    try {
        const deletedUser = await User.deleteOne({
            username: req.body.username,
        })
        const successResponse = {
            message: `${req.body.username} successfully deleted.`,
            deletedUser: deletedUser
        }
        res.send(successResponse);
    } catch (error) {
        console.log(error);
    }
};
const deleteAll = async (req, res) => {
    try {
        const deleted = await User.deleteMany({})
        const successResponse = {
            message: `All records successfully deleted.`,
            deleted: deleted
        }
        res.send(successResponse);
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    getAllUsers,
    addUser,
    updateUser,
    deleteUser,
    deleteAll
};