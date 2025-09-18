
const { addUserProfile, getUserProfile, editUserProfile, alluserProfile } = require("../Controllers/userProfileControllers");
// this is not a default export so i have to take it like that bro 


// ab ek express ka router banawo bhai


const router = require("express").Router();

// Adjust the registration route
router.post("/userprofile", addUserProfile);

// api for the getting the user details;
router.get("/getuserprofile/:id", getUserProfile);


// api for the editing the  user details;
router.post("/edituserprofile", editUserProfile);


// api fo the getting the alluserProfile details
router.get("/allusersprofiles/:id", alluserProfile);





// // adjust the login route
// router.post("/login", login);



module.exports = router;
