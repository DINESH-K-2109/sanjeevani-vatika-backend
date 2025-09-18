const { register, login, getAllusers } = require("../Controllers/userControllers");
// this is not a default export so i have to take it like that bro 


// ab ek express ka router banawo bhai


const express = require("express");
const app = express();

// const router = require("express").Router();

const router = require("express").Router();

// Adjust the registration route

app.post("/register", register);

// adjust the login route
app.post("/login", login);

app.get("/getallusers", getAllusers);






module.exports = app;




// const: Keyword in JavaScript for declaring constants.
// router: Variable name referring to an instance of the Express router.
// require("express").Router(): Imports the Express module and accesses its Router function to create a new router object.
// So, in summary:

// Creates a constant named router.
// Sets it to an instance of the Express router created using the Router() function from the Express module.
