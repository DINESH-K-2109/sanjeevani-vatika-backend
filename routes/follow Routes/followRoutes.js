const { addFollower, getFollowers, followerDetails, getFollowings, Unfollowings, deleteFollower } = require("../../Controllers/follow Controllers/followControllers");
// this is not a default export so i have to take it like that bro 


// ab ek express ka router banawo bhai


const router = require("express").Router();

// Adjust the addfollowers route
router.post("/allusersprofiles", addFollower);

// adjust the get followers routes

router.post("/followers", getFollowers);


// adjust the get followersDetails routes

router.post("/followdetails", followerDetails);



// adjust the get followersDetails routes

router.post("/followings", getFollowings);



// adjust the unfollow routes

router.post("/unfollowings", Unfollowings);

// adjust the route for the delete a follower 

router.post("/deletefollower", deleteFollower);





module.exports = router;
