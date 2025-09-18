const mongoose = require("mongoose");

const userProfileSchema = new mongoose.Schema({

    profileImage: {
        tyep: String,
    },
    userId: {
        type: String,
    },
    village: {
        type: String,
    },

    districk: {
        type: String,
    },
    pincode: {
        type: String,
    },
    state: {
        type: String,
    },
    country: {
        type: String,
    },
    phoneNumber: {
        type: String,
    },
    proffession: {
        type: String,
    },
    about: {
        type: String,
    },
    accountType: {
        type: String,
    },

});



const UserProfile = mongoose.model("UserProfile", userProfileSchema);
module.exports = UserProfile;