const { AddPostsToProfile, getPostsOfProfile, deleteUserSavedPostsFromUserProfile } = require("../../Controllers/savingPostsControllers/savingPostsControllers");

//now making a express router instance to acces and hits / handle the api endpoints

const router = require("express").Router();

// router.post("/register",register);

// add a post to the database
router.post("/addpoststoprofile", AddPostsToProfile);
// get the post in the user profilese ction
router.get("/getpostsofprofile/:userId", getPostsOfProfile);
// delete the post from the user profile
router.delete("/deleteusersavedpostfromUserprofile/:postId", deleteUserSavedPostsFromUserProfile);


module.exports = router;