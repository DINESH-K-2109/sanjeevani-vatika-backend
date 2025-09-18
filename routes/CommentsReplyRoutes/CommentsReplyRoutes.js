const { addCommentsReply, getAllReplyForComment } = require("../../Controllers/CommentsReplyControllers/CommentsReplyControllers");

// now import the express for the making the router


const router = require("express").Router();

// making a backend end point api for the getting the frontend

router.post("/addreplytocomment", addCommentsReply);

// backend api for the getting all the Comments reply for a particular comments

router.post('/getallreplyforcomment', getAllReplyForComment);


module.exports = router;