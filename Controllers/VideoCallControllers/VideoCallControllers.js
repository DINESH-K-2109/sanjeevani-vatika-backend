const mongoose = require("mongoose");
const VideoChat = require("../../Models/VideoCallModel/VideoCallModel");
// this is a mongodb object id to convert a string to a mongodb object

const { ObjectId } = require('mongodb');



// start of adding a requests to the database for the video call

module.exports.registerCallRequest = async (req, res) => {

    try {

        const { from, to, callId } = req.body;

        console.log(from, to, callId);

        // check if the callId exist in the database means there is  an ongoing call so we can't make for the same to persons

        const checkCallLog = await VideoChat.find({
            from: from,
            to: to,
        });

        if (checkCallLog.length > 0) {
            res.json({
                status: false,
                message: "this call is already in process ",
            });
        }
        else {


            const response = await VideoChat.create({
                from: from,
                to: to,
                callId: callId
            });
            // console.log(response);

            if (response) {
                res.json({
                    status: true,
                    response: response,
                    message: "your request for the call is created successfully Wait for the reply form the other side"
                });
            }
        }


    } catch (err) {
        console.log(err);
    }
};


// start of adding a requests to the database for the video call


// start of getting all the call logs from the datanbse for the particular user

module.exports.allCallLogs = async (req, res) => {



    try {
        const { userId } = req.body;
        // console.log(userId);

        const response = await VideoChat.find({
            from: userId,
        });
        // console.log(response)

        if (response) {
            res.json({
                response: response
            })
        }
    } catch (err) {
        console.log(err);
    }


}


// end of the getting all the call logs for the particular user form the database


// this is all call from the other user calling you 


module.exports.allCallLogsFromOthers = async (req, res) => {

    try {

        const { userId } = req.body;

        console.log(userId);


        const response = await VideoChat.find({
            to: userId,
        })

        console.log(response);

        res.json({
            response: response
        })

    } catch (err) {
        console.log(err)
    }

}

// end : this is the call logs for the user calling you bro


// start of the delete call logs 

module.exports.deleteRecentCallLogs = async (req, res) => {
    try {

        const { meetId, callLog } = req.body;

        // const to = callLog.to;
        // console.log(to); 

        if (meetId === callLog.from) {
            const response = await VideoChat.findOneAndDelete({
                from: callLog.from
            });

            if (response) {
                res.json({
                    response: response
                })
            }
        }
        else if (meetId === callLog.to) {
            const response = await VideoChat.findOneAndDelete({
                to: callLog.to
            });
            if (response) {
                res.json({
                    response: response
                })
            }
        }



    } catch (err) {
        console.log(err)
    }
}


// end of the delete call logs 