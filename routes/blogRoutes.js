
const { addBlog, getblogs, getAllBlogs, blogDetails, allBlogsByTagName, editBlog, deleteBlog } = require("../Controllers/blogControllers");


// ab ek express ka router banawo bhai


const router = require("express").Router();   

// Adjust the addBlog route
router.post("/addblog/:id", addBlog);

// get all the blogs from the database by a particular id;

router.get("/getblogs/:id", getblogs);

// get all the users blogs from the database
router.get("/getallblogs", getAllBlogs);


// get  the full  details of a  blogs from the database
router.get("/blogdetails/:id", blogDetails);



// get  the all related blogs to a particular tags from the database  
router.get("/tag/:tag", allBlogsByTagName);



// edit the blog by its particular id
router.post("/editblog/:id", editBlog);

// delete a blogs by its id 

router.post("/deleteblog/:id", deleteBlog);





module.exports = router;
