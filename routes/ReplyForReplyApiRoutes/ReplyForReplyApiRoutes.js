const { addReplyToReply, getAllReplyForReply } = require("../../Controllers/ReplyForReplyControllers/ReplyForReplyControllers");

// now import the express for the making the router


const router = require("express").Router();

// making a backend end point api for the getting the frontend

router.post("/addreplytoreply", addReplyToReply);

// backend api for the getting all the Comments reply for a particular comments

router.post('/getallreplyforreply', getAllReplyForReply);


module.exports = router;