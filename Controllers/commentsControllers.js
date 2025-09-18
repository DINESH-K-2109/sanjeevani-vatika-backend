const mongoose = require('mongoose');
const Comment = require("../Models/commentsModel");
// const { findById } = require('../Models/userModel');



// controllers function for adding a comments in the database;
// bhai 
module.exports.addComments = async (req, res) => {

    try {
        const { id, comment, author, date } = req.body;

 





        const data = {
            id: id,
            comment: comment,
            author: author,
            date: date,


        };

        console.log(data);

        if (!data.comment) {
            res.json({
                status: false,
                message: "you have to write a comment!"
            })
        } else {
            // All required fields are present, proceed to create the blog entry
            try {
                const createComment = await Comment.create(data);
                res.json({
                    status: true,
                    message: "Blog entry created successfully:",
                })
            } catch (error) {
                console.error("Error creating blog entry:", error);
                // Handle the error as needed (e.g., send an error response, log the error)
            }
        }



    } catch (err) {
        console.log(err);
    }
};

// end of the adding comments in the database



// controllers function for getting all comments form the database

// bhai




module.exports.getComments = async (req, res) => {

    try {
        const id = req.params.id;

        // console.log(id);

        const comments = await Comment.find({
            id: id
        });
        // console.log(comments);

        if (comments) {
            res.json({
                status: true,
                comments: comments,
                message: "Comment found successfully"
            });
        } else {
            res.json({
                status: false,
                message: "Comment not found"
            });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            status: false,
            message: "Internal server error"
        });
    }
};







// end of the adding blogs in the database 





// controllers function for getting all comments form the database

// bhai




module.exports.editComments = async (req, res) => {

    try {
        // const id = req.params.id;

        const { id, newComment } = req.body;


        const response = await Comment.findByIdAndUpdate(id, {

            comment: newComment,
            date: new Date(),

        }, { new: true });

        if (response) {
            res.json({
                response: response,
                status: true
            })
        }




    } catch (err) {
        console.log(err);

    }
};







// end of the adding blogs in the database 





// controllers function for getting all comments form the database

// bhai




module.exports.deleteComment = async (req, res) => {

    try {
        // const id = req.params.id;

        const { id } = req.body;


        const response = await Comment.findByIdAndDelete(id, {




        }, { new: true });

        if (response) {
            res.json({
                response: response,
                status: true
            })
        }




    } catch (err) {
        console.log(err);

    }
};







// end of the adding blogs in the database 