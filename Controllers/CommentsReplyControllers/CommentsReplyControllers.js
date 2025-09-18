const mongoose = require("mongoose");

const CommentsReply = require("../../Models/CommentsReplyModel/CommentsReplyModel");

// start of the Comments Reply Controllers

module.exports.addCommentsReply = async (req, res) => {

    try {
        const { replyId, reply, author, date } = req.body;

        // console.log(replyId, reply, author, date);

        const response = await CommentsReply.create({
            replyId: replyId,
            reply: reply,
            author: author,
            date: date,
        });
        console.log(response);

    } catch (err) {
        console.log(err);
    }

}

// end of the comments Reply Controllers


// this is the function for the get all reply for a particular comments



module.exports.getAllReplyForComment = async (req, res) => {

    try {
        const { commentId } = req.body;
        // console.log(commentId);
        const response = await CommentsReply.find({
            replyId: commentId
        });
        // console.log(response);
        if (response) {
            res.json({
                response: response,
            })
        }
    } catch (err) {
        console.log(err);
    }
}


// end of the getting the function for the getting all the reply for the comments