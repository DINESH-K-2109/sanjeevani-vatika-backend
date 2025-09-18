const mongoose = require("mongoose");
const { type } = require("os");

const GroupChatRoomMessageSchema = new mongoose.Schema({



    groupName: {
        type: String
    },
    groupDescription: {
        type: String
    },
    profileLink: {
        type: String
    },
    admins: {
        type: String
    },
    isAdminOnlyMessage: {
        type: Boolean,
        default: false
    },
    allMembersDetails: {
        type: Object,
    },
    GroupCreatorId: {
        type: String,
    }


});





const GroupChatRoomMessage = mongoose.model("GroupChatRoomMessage", GroupChatRoomMessageSchema);

module.exports = GroupChatRoomMessage;