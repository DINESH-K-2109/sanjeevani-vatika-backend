const mongoose = require("mongoose");

const userLikes = new mongoose.Schema({

    currentUserId: {
        type: String,
    },

    blogId: {
        type: String,
    },

    likesCount: {
        type: Number,
    },
    likeToggler: {
        type: Boolean,
    },

});

const Likes = mongoose.model("Likes", userLikes);
module.exports = Likes;