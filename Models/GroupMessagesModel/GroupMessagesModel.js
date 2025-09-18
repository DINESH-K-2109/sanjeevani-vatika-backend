const mongoose = require("mongoose");




const groupMessagesSchema = new mongoose.Schema({
    groupId: {
        type: String,
    },
    currentUserId: {
        type: String,
    },
    currentUserName: {
        type: String,
    },
    messageData: {
        type: String,
    },
    date: {
        type: String,
        default: Date.now
    },
});

// Create the model using the schema
const GroupMessage = mongoose.model("GroupMessage", groupMessagesSchema);

// Export the model
module.exports = GroupMessage;
