const mongoose = require("mongoose");

const replyForReply = new mongoose.Schema({

    replyIdTo: {
        type: String,
    }
    ,
    replyIdFrom: {
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

const ReplyForReply = mongoose.model("ReplyForReply", replyForReply);
module.exports = ReplyForReply;