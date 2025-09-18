const mongoose = require('mongoose');

const Message = require('../.././Models/directMessage');
// edit messages start
module.exports.editMessage = async (req, res) => {
    const { msgId, newMessage } = req.body;
    // console.log(msgId, newMessage);

    try {
        const response = await Message.findByIdAndUpdate(msgId, {
            message: newMessage,
        },
            {
                new: true
            },
        );
        // console.log(response)
        if (response) {
            res.json({
                response: response
            });
        }

    } catch (err) {
        console.log(err);
    }
}
// edit messages ends



// delete messages starts
module.exports.deleteMessage = async (req, res) => {
    const { msgId } = req.body;
    console.log(msgId)

    try {
        const response = await Message.findByIdAndDelete({ _id: msgId })
        console.log(response);
        if (response) {
            res.json({
                response: response,
                status: true,
            });
        }
    } catch (err) {
        console.log(err);
    }
}
// delete messages ends