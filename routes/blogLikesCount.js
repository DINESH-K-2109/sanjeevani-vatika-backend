
const { addLikes, getLikes, editLikes } = require("../Controllers/likesControllers");


// ab ek express ka router banawo bhai


const router = require("express").Router();

// api for getting all the likes count of the page;

router.post("/", addLikes);

//a pi fo getting all the likes from the database 
router.post("/", getLikes);

// api for editing the like button and likes details

router.post("/", editLikes);






module.exports = router;
