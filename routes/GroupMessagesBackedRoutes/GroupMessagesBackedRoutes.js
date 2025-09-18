const { addGroupMessageToDataBase, getGroupMessageToDataBase } = require("../../Controllers/GroupMessageControllers/GroupMessageControllers");

const router = require("express").Router();

// this is backend end point for the recieving the message from the  frontend and sending it to the database.

router.post("/addgroupmessagetodatabase", addGroupMessageToDataBase);


// this is the backend end api routes for the getting all the messages from the database


router.get("/getgroupmessagetodatabase", getGroupMessageToDataBase);




module.exports = router;