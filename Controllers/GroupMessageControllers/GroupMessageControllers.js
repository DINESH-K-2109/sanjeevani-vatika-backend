const mongoose = require("mongoose");

const GroupMessage = require("../../Models/GroupMessagesModel/GroupMessagesModel");


// start of the controllers for the adding a message to the database which is comming from the group


module.exports.addGroupMessageToDataBase = async (req, res) => {

    try {


        const { groupId, currentUserId, currentUserName, messageData, date } = req.body;

        // console.log(groupId, currentUserId, currentUserName, messageData, date);

        const response = await GroupMessage.create({
            groupId: groupId,
            currentUserId: currentUserId,
            currentUserName: currentUserName,
            messageData: messageData,
            date: date,
        });
        // console.log(response);
        if (response) {
            res.json({
                response: response,
            })
        }

    } catch (err) {
        console.log(err);
    }


}


//end of the controllers for the adding a message to the database which is comming from the group


// start of the getting all the messages from the database


module.exports.getGroupMessageToDataBase = async (req, res) => {


    try {


        const { groupId } = req.query;

        // console.log(groupId);

        const response = await GroupMessage.find({
            groupId: groupId,
        });

        // console.log(response);
        if (response) {
            res.json({
                response: response,
            })
        }
    } catch (err) {
        console.log(err);
    }
}








// end of the getting all the message from teh adtabse

