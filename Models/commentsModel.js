const mongoose = require("mongoose");

const userComments = new mongoose.Schema({

    id: {
        type: String,
    },

    comment: {
        type: String,
    },
    author: {
        type: String,
    },
    date: {
        type: Date,
       
    },




});

const Comment = mongoose.model("Comment", userComments);
module.exports = Comment;