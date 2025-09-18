const mongoose = require("mongoose");

const followUsers = new mongoose.Schema({

    from: {
        type: String,
    },
    fromName: {
        type: String,
    },
    to: {
        type: String,
    },
    toName: {
        type: String,
    },
    following: {
        type: Boolean,
    }

});

const Follower = mongoose.model("Follower", followUsers);
module.exports = Follower;