const { recentMessage } = require("../../Controllers/recentMessagesControllers/recentMessagesControllers")


// ab ek express ka router banawo bhai


const router = require("express").Router();

// api for getting all the likes count of the page;

router.post("/recentmessage", recentMessage);

module.exports = router;








