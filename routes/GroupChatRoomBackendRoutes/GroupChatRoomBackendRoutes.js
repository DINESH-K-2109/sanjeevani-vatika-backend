
const { addGroupChatRoomMessage, getAllGroupsDetails, addANewMemberToGroup, removeUserFromGroup } = require("../../Controllers/GroupChatRoomControllers/GroupChatRoomControllers");

const router = require("express").Router();

// now creatint the backend end point of the handlint he addGroupMessag from the backend 

router.post("/addgroupchatroommessage", addGroupChatRoomMessage);

// now creating the backend api for the handling the getAllgroupsdetails

router.post("/getallgroupsdetails", getAllGroupsDetails);

// this is the backend end points for the handling 
// add a new member to the group
router.post("/addanewmembertogroup", addANewMemberToGroup);

// this is teh backend end point for the handling the remove user from the group


router.post("/removeuserfromgroup", removeUserFromGroup);


module.exports = router;