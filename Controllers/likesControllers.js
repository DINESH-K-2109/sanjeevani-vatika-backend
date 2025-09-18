const mongoose = require('mongoose');
const Likes = require("../Models/likesModel");


module.exports.addLikes = async (req, res) => {


    try {

        const { currentUserId, blogId, likesCount, likeToggler } = req.body;
        // console.log(currentUserId, blogId, likesCount, likeToggler);

        const existingLikes = await Likes.findOne({ blogId: blogId, currentUserId: currentUserId });

        if (existingLikes) {
            // If document with the same blogId already exists, update it
            const response = await Likes.findOneAndUpdate(

                {
                    blogId: blogId,
                    currentUserId: currentUserId,
                },


                { $set: { likesCount: likesCount, likeToggler: likeToggler } },
                { new: true, upsert: false }
            );

            console.log(response);
            res.json({
                response: response,
                message: "likes Data is reterived"
            });

        }
        else {
            // If document doesn't exist, create a new one
            const response = await Likes.create({
                currentUserId: currentUserId,
                blogId: blogId,
                likesCount: likesCount,
                likeToggler: likeToggler
            });

            // console.log(response);
            res.json({
                response: response,
                message: "Likes data is created",
            });
        }

    } catch (err) {
        console.log(err)
    }





}


// api controllers for the getting all the likes button from the database start


module.exports.getLikes = async (req, res) => {

    const { blogId, currentUserId } = req.body;
    console.log(blogId, currentUserId);

    const response = await Likes.find({});

    console.log("the likes response from the backend is :", response);

    res.json({
        status: true,
        response: response,
        message: "Likes Data is reterived",
    });

}


// api controllers for the getting all the likes button from the database end points



// like ko edit karne ka controllers start points





module.exports.editLikes = async (req, res) => {

    const { blogId, likesCount, likeToggler } = req.body;
    console.log(blogId, likesCount, likeToggler);



    try {

        const response = await Likes.findOneAndUpdate(
            { blogId: blogId },
            { $set: { likesCount: likesCount, likeToggler: likeToggler } },
            { new: true, upsert: false }
        );
        console.log(response);
        res.json({ 
            response: response,
            status: true,
            message: "you unliked the post",
        });
    } catch (err) {
        console.log(err);
    }
}



// likes ko edit karne ka controllerse end points



