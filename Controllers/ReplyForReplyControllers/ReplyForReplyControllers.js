const mongoose = require("mongoose");

const ReplyForReply = require("../../Models/ReplyForReplyModel/ReplyForReplyModel");

// start of the controller for the adding a reply for a reply

module.exports.addReplyToReply = async (req, res) => {
    try {

        const { replyIdTo, replyIdFrom, reply, author } = req.body;
        console.log(replyIdTo, replyIdFrom, reply, author);

        const response = await ReplyForReply.create({
            replyIdTo: replyIdTo,
            replyIdFrom: replyIdFrom,
            reply: reply,
            author: author,
            date: new Date().now,
        });
        console.log(response);

    } catch (err) {
        console.log(err)
    }
}


// end of the controller for the adding a reply for a reply


// start of the getting all reply for the reply

module.exports.getAllReplyForReply = async (req, res) => {

    try {

        const { replyIdTo } = req.body;

        console.log(replyIdTo);

        const response = await ReplyForReply.find({
            replyIdTo: replyIdTo,
        });


        console.log(response);
        if (response) {
            res.json({
                response: response,
            })
        }

    } catch (err) {
        console.log(err);
    }
}

// end of the getting all reply fo rthe reply