const savedPost = require("../../Models/savedPostsModel/savedPostsModel");

// controller function to add the post sin the database



module.exports.AddPostsToProfile = async (req, res) => {

    try {

        console.log("thi sis the controller of the addpost");

        const { userId, postDetails, savedStatus } = req.body;

        console.log(userId, postDetails, savedStatus);

        const response = await savedPost.create({
            userId: userId,
            postDetails: postDetails,
            savedStatus: savedStatus,
        });

        console.log(response);

        if (response) {
            res.json({
                response: response,
                message: "hey ! your post is saved successfully in to your profile",
            });
        }

    } catch (err) {
        console.log(err);
    }

}




// end of the function to add the posts in the database

// start of the controllers for the getting a post from the database

module.exports.getPostsOfProfile = async (req, res) => {

    try {

        const { userId } = req.params;
        // console.log(userId);

        const response = await savedPost.find({
            userId: userId,
        });
        console.log(response);

        if (response) {
            res.json({
                response: response,
            })
        }

    }
    catch (err) {
        console.log(err);
    }
}


// ends of the controllers for the getting a post from the database


// this is the start of the deleteing the post from the userprofile section

module.exports.deleteUserSavedPostsFromUserProfile = async (req, res) => {

    try {
        const { postId } = req.params;
        const response = await savedPost.findByIdAndDelete(postId);
        res.json({
            response: response,
        });
    }
    catch (err) {
        console.log(err);
    }
}

// this is the end of the deleteing the post from the user profile sections