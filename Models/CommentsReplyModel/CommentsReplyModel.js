const mongoose = require("mongoose");

const commentsReply = new mongoose.Schema({

    replyId: {
        type: String,
    }
    ,
    reply: {
        type: String
    }
    ,
    author: {
        type: String,
    }
    ,
    date: {
        type: Date,
        default: Date.now
    }

});

const CommentsReply = mongoose.model("CommentsReply", commentsReply);
module.exports = CommentsReply;