const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({

    userId: {
        type: String,
    },

    postDetails: {
        type: Object,
    },
    savedStatus: {
        type: Boolean,
    },




});

const savedPost = mongoose.model("savedPost", postSchema);
module.exports = savedPost;