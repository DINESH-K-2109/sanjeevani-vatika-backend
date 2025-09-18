const Blog = require("../Models/blogModel");
const mongoose = require('mongoose');

// controllers function for adding a blogs in the database;
// bhai 
module.exports.addBlog = async (req, res) => {
    try {
        const { id, title, author, date, category, content, tags, imageUrl, featured } = req.body;

        const data = {
            id: id,
            title: title,
            author: author,
            date: date,
            category: category,
            content: content,
            tags: tags,
            imageUrl: imageUrl,
            featured: featured
        };

        // Check if required fields are present and not empty
        if (!data.title?.trim() || 
            !data.author?.trim() || 
            !data.date?.trim() || 
            !data.category?.trim() || 
            !data.content?.trim() || 
            !data.imageUrl?.trim() || 
            !Array.isArray(data.tags) || 
            data.tags.length === 0) {
            return res.json({
                status: false,
                message: "All fields are required! Please fill in all fields and select at least one tag."
            });
        }

        // All required fields are present, proceed to create the blog entry
        try {
            const createdBlog = await Blog.create(data);
            res.json({
                status: true,
                message: "Blog entry created successfully!",
                blog: createdBlog
            });
        } catch (error) {
            console.error("Error creating blog entry:", error);
            res.json({
                status: false,
                message: "Error creating blog entry. Please try again.",
                error: error.message
            });
        }
    } catch (err) {
        console.error("Server error:", err);
        res.status(500).json({
            status: false,
            message: "Server error occurred. Please try again.",
            error: err.message
        });
    }
};

// end of the adding blogs in the database 

// start of getting blogs from the database;


module.exports.getblogs = async (req, res) => {

    try {


        const id = req.params.id;


        const blogs = await Blog.find({
            id: id,
        });

        res.json({
            blogs: blogs,
            status: true,
            message: "here are all your blogs ",
        })



    } catch (err) {
        console.log(err);
    }
};

// end of the getting blogs from the database;

// start of the user controllers for getting all the blogs from the database


module.exports.getAllBlogs = async (req, res) => {

    try {





        const blogs = await Blog.find().sort({ date: -1 });

        res.json({
            blogs: blogs,
            status: true,
            message: "here are all your blogs ",
        })



    } catch (err) {
        console.log(err);
    }
};



// end of the user controllers for getting all the blogs from the database



// start of  getting all the details for a blog for a particular id




module.exports.blogDetails = async (req, res) => {

    try {
        let { id } = req.params;

        console.log(typeof id);

        // Use mongoose.Types.ObjectId to convert id to ObjectId
        const blog = await Blog.findById(new
            mongoose.Types.ObjectId({ id }));


        console.log(blog);

        if (!blog) {
            return res.status(404).json({
                status: false,
                message: "Blog not found",
            });
        }

        res.json({
            blog: blog,
            status: true,
            message: "Here is the blog details",
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({
            status: false,
            message: "Internal Server Error",
        });
    }
};



// ends of  getting all the details for a blog for a particular id




// start of  getting all the blogs which are related to a particular tags from the database



module.exports.allBlogsByTagName = async (req, res) => {

    try {

        const { tag } = req.params;

        console.log(tag);


        const blog = await Blog.find({
            tags: tag,
        });


        console.log(blog);

        if (!blog) {
            return res.status(404).json({
                status: false,
                message: "Blog not found",
            });
        }

        res.json({
            blog: blog,
            status: true,
            message: "Here is the blog details",
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({
            status: false,
            message: "Internal Server Error",
        });
    }
};



// ends of  getting all the details for a blog by a particular tags





// start of editing a blog by its id


module.exports.editBlog = async (req, res) => {

    try {
        const { postId } = req.body;
        console.log(postId);

        const { title, author, date, category, content, tags, imageUrl, featured } = req.body;


        const blog = await Blog.findByIdAndUpdate(postId, {

            title: title,
            author: author,
            date: date,
            category: category,
            content: content,
            tags: tags,
            imageUrl: imageUrl,
            featured: featured,

        }, { new: true });

        console.log(blog);

        if (!blog) {
            return res.status(404).json({
                status: false,
                message: "Blog not found",
            });
        }

        res.json({
            blog: blog,
            status: true,
            message: "Blog details updated successfully",
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({
            status: false,
            message: "Internal Server Error",
        });
    }
};



// ends of editing a particular blogs



// start of deleteing a blog


module.exports.deleteBlog = async (req, res) => {

    try {
        const { blogId } = req.body;
        // console.log(blogId);


        const blog = await Blog.findOneAndDelete({
            _id: blogId,
        }, {
            new: true
        })

        console.log("blog is deleted successfully ", blog)


        res.json({
            blog: blog,
            status: true,
            message: "Blog is deleted successfully",
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({
            status: false,
            message: "Internal Server Error",
        });
    }
};



// ends of deleteing ablog by its id