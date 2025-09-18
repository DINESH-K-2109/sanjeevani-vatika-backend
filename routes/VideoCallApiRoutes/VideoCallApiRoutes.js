// now controllers se wo wala function mangawo bhai jo controll karta hai call requests ko registers karne ka and .....

const { registerCallRequest, allCallLogs, allCallLogsFromOthers, deleteRecentCallLogs } = require("../../Controllers/VideoCallControllers/VideoCallControllers");

// now ab a general router banawo 


// ab ek express ka router banawo bhai


const router = require("express").Router();


// backend end points for getting the request and processing here 


router.post("/registercallrequest", registerCallRequest);


// backend end ponts for the getting all the call logs which the main user have started 


router.post("/allcalllogs", allCallLogs);

// backend end points api for the getting all the call logs from all the users to the main locall storage user

router.post("/allcalllogsfromothers", allCallLogsFromOthers);

// backend api end point for deleting the recent call logs from the recent call logs

router.post("/deleterecentcalllogs", deleteRecentCallLogs);



// now jo bhi express ka router uper banaye ho just export to the other files so that it can be used for other purposes

module.exports = router;




