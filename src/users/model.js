const mongoose = require("mongoose");

// const favouritesSchema = new mongoose.Schema({ 
//         favouriteCookie: {
//             type: String,
//             required: false
//         },
//         second: String,
//         third: String
// });

const userSchema = new mongoose.Schema ({
    firstName: {
        type: String,
        required: true,
        unique: true
    },
    lastName: {
        type: String,
        required: true,
        unique: false
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    agreeToTerms: {
        type: Boolean,
        required: true
    }
    // favourites: [favouritesSchema]
});

const User = mongoose.model("users", userSchema);
module.exports = User;