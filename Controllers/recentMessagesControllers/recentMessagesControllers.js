const mongoose = require("mongoose");

// now i will search in the message database

const Message = require("../../Models/directMessage");
module.exports.recentMessage = async (req, res) => {
    try {
        const { userId } = req.body;

        const response = await Message.aggregate([

            // this is working w hen i have done message to the any person
            { $match: { from: userId } },
            // this case can be arised when i dont did the message but ay random user have have done me a message
            // { $match: { $or: [{ from: userId }, { to: userId }] } },

            { $sort: { date: 1 } }, // Sort documents by date in descending order
            { $group: { _id: "$to", latestMessage: { $last: "$$ROOT" } } }, // Group by "to" field and select the first message encountered for each group
            { $replaceRoot: { newRoot: "$latestMessage" } } // Replace the root with the latestMessage document
        ]);

        // console.log(response); // Log the response to see if any data is returned

        if (response.length > 0) {
            res.json({
                response: response,
            });
        } else {
            res.json({ message: "No messages found for the given userId." });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: false, message: "Internal Server Error" });
    }
};