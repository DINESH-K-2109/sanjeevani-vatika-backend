const mongoose = require('mongoose');

const Message = require("../Models/directMessage");


// start of the adding the message to the database

module.exports.addMessage = async (req, res) => {
    const { from, to, message, fromName, toName } = req.body;
    console.log(from, to, message, fromName, toName);

    try {
        const response = await Message.create({
            from: from,
            to: to,
            message: message,
            fromName: fromName,
            toName: toName,
        });
        console.log(response)
        if (response) {
            res.json({
                response: response,
                message: "your message is sent successfully",
                status: true
            })
        }
    } catch (err) {
        console.log(err);
    }
}

// end of the adding the message to the database




// start of the getting  the message from the database

module.exports.getAllMessage = async (req, res) => {
    const { from, to } = req.body;
    // console.log(from, to);

    try {
        const response = await Message.find({
            $or: [
                { from: from, to: to },
                { from: to, to: from }, // Consider messages from 'to' to 'from' as well
            ],
        });
        // console.log(response)
        if (response) {
            res.json({
                response: response,
                status: true
            })
        }
    } catch (err) {
        console.log(err);
    }
}

// end of the getting  the message from the database