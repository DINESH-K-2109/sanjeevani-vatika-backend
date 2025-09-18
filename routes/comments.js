
const { addComments, getComments, editComments, deleteComment } = require("../Controllers/commentsControllers");


// ab ek express ka router banawo bhai 


const router = require("express").Router();

// Adjust the addComments route
router.post("/addcomments/:id", addComments);

// making the getComments routes
router.get("/getcomments/:id", getComments);


// edit routes for the comments 
router.post("/editcommets/:id", editComments);




// delete routes for the comments 
router.post("/deletecomment/:id", deleteComment);




module.exports = router;
