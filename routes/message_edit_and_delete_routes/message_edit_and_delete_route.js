const { editMessage, deleteMessage } = require("../../Controllers/messages_edit_and_delete_controllers/messages_edit_and_delete_controllers");
// this is not a default export so i have to take it like that bro 


// ab ek express ka router banawo bhai


const router = require("express").Router();

// Adjust the addfollowers route
router.post("/editmessage", editMessage);

// adjust the get followers routes

router.post("/deletemessage", deleteMessage);


// adjust the get followersDetails routes

module.exports = router;





