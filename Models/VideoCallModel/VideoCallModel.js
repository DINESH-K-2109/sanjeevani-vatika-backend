const mongoose = require("mongoose");


const videoCall = new mongoose.Schema({

    from: {
        type: String
    },

    to: {
        type: String
    },
    callId: {
        type: Number
    }
});




const VideoChat = mongoose.model("VideoChat", videoCall);
module.exports = VideoChat;