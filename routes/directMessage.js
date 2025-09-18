const { addMessage, getAllMessage } = require("../Controllers/directMessage");
// this is not a default export so i have to take it like that bro 


// ab ek express ka router banawo bhai


const router = require("express").Router();

// Adjust the registration route
router.post("/addmessage", addMessage);

// // adjust the login route
router.post("/getallmessage", getAllMessage);



module.exports = router;
