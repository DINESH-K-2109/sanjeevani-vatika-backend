const mongoose = require("mongoose");

const GroupChatRoomMessage = require("../../Models/GroupChatRoomMessageModel/GroupChatRoomMessageModel");

// start of the  now creating a ChatRoomMessageControllers here

module.exports.addGroupChatRoomMessage = async (req, res) => {

    try {
        const { groupName, groupDescription, profileLink, admins, isAdminOnlyMessage, allMembersDetails, GroupCreatorId } = req.body;
        console.log(groupName, groupDescription, profileLink, admins, isAdminOnlyMessage, allMembersDetails, GroupCreatorId);

        const response = await GroupChatRoomMessage.create({
            groupName: groupName,
            groupDescription: groupDescription,
            profileLink: profileLink,
            admins: admins,
            isAdminOnlyMessage: isAdminOnlyMessage,
            allMembersDetails: allMembersDetails,
            GroupCreatorId: GroupCreatorId,
        });
        res.json({
            response: response,
            message: "your Group is created successfully Dude!"
        })
    } catch (err) {
        console.log(err);
    }

}


// End of the  now creating a ChatRoomMessageControllers here


// start of the controllers for the getting all the details of the groups 

module.exports.getAllGroupsDetails = async (req, res) => {


    try {

        const { GroupCreatorId } = req.body;
        console.log("this is group id: ", GroupCreatorId);

        const response = await GroupChatRoomMessage.find({
            $or: [
                { GroupCreatorId: GroupCreatorId },
                { [`allMembersDetails.${GroupCreatorId}`]: { $exists: true } }
            ]
        });
        console.log(response);
        if (response) {
            res.json({
                response: response,
            })
        }

    } catch (err) {
        console.log(err);
    }

}

// end of the controllers for the getting all the details fo teh groups


// this sis the start of the controller for adding a user to teh group



module.exports.addANewMemberToGroup = async (req, res) => {
    try {
        const { usersArray, groupId } = req.body;

        for (let i = 0; i < usersArray.length; i++) {
            const user = usersArray[i];
            // Assuming you want to add the user as a key-value pair in allMembersDetails
            const response = await GroupChatRoomMessage.findOneAndUpdate(
                {
                    _id: groupId,
                },
                {
                    $set: {
                        [`allMembersDetails.${user._id}`]: user // Add user as a key-value pair
                    }
                },
                { new: true } // To return the updated document
            );
            console.log(response); // Log the updated document
        }

        // Send a response indicating success
        res.status(200).json({ message: "Users added to the group successfully" });

    } catch (err) {
        console.log(err);
        // Send an error response if something goes wrong
        res.status(500).json({ error: "Internal server error" });
    }
};



// this is teh end of teh controller for the adding a user to the group


// start of the controllers for the removing the users from the group

module.exports.removeUserFromGroup = async (req, res) => {

    const { groupId, memberId } = req.body;


    try {
        // Update the group document to pull the specified member
        const updatedGroup = await GroupChatRoomMessage.findByIdAndUpdate(
            groupId,
            { $pull: { allMembersDetails: { _id: memberId } } },
            { new: true } // Return the updated document after the update operation
        );

        // Check if the group exists and the member was removed
        if (!updatedGroup) {
            return res.status(404).json({ message: 'Group not found' });
        }

        // Check if the member was removed successfully
        const removedMember = updatedGroup.allMembersDetails.find(member => member._id === memberId);
        if (!removedMember) {
            return res.status(404).json({ message: 'Member not found in the group' });
        }

        return res.status(200).json({ message: 'Member removed successfully' });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

// end of the controllers for the  removing the users from the gropu