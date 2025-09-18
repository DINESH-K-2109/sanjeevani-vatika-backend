const mongoose = require("mongoose");

const userBlog = new mongoose.Schema({

    id: {
        type: String,
    },

    title: {
        type: String,
    },
    author: {
        type: String,
    },
    date: {
        type: Date,
    },

    category: {
        type: String,
    },
    content: {
        type: String,

    },
    tags: {
        type: Array,
    },
    imageUrl: {
        type: String,
    },
    featured: {
        type: Boolean,
    }


});

const Blog = mongoose.model("Blog", userBlog);
module.exports = Blog;