const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors")
const app = express();


// start of my web socket implimentations
const socket = require("socket.io");


//end of my web socket implimentations
const userRoutes = require("./routes/userRoutes")
const blogRoutes = require("./routes/blogRoutes");
const commentRoutes = require("./routes/comments");
const userProfileRoutes =
    require("./routes/userProfileRoutes");
const likesRoutes = require("./routes/blogLikesCount");
const messageRoutes = require("./routes/directMessage");
const followRoutes = require("./routes/follow Routes/followRoutes")

const messageEditAndDeleteRoute = require("./routes/message_edit_and_delete_routes/message_edit_and_delete_route");

const searchResultsRoutes = require("./routes/searchResultsRoutes/searchResultsRoutes");

const recentMessageRoutes = require("./routes/recentMessagesRoutes/recentMessagesRoutes");

const videoCallRoutes = require("./routes/VideoCallApiRoutes/VideoCallApiRoutes")
// this is the api routes for the adding the reply to a comments
const CommentsReplyRoutes = require("./routes/CommentsReplyRoutes/CommentsReplyRoutes");
// this is the api route for the adding the rply for a reply
const replyForReplyRoutes = require("./routes/ReplyForReplyApiRoutes/ReplyForReplyApiRoutes");
// this is the GroupChatRoomMessage routes for handling all types of edit add update and delete the data

const groupChatRoomMessagesRoutes = require("./routes/GroupChatRoomBackendRoutes/GroupChatRoomBackendRoutes");

// this is the api routes for the handling the chats and messages in the groups and all in my social media brother

const groupMessagesRoutes = require("./routes/GroupMessagesBackedRoutes/GroupMessagesBackedRoutes");

// this is the api routes for handling the saving post in the user profile

const AddPostsToUserProfileRoutes = require("./routes/SavingPostsBackendApiRoutes/SavingPostsBackendApiRoutes");





app.use(cors());
app.use(express.json());
// Use express.urlencoded middleware
app.use(express.urlencoded({ extended: true }));



require("dotenv").config();




// Adjust the registration route
app.use("/", userRoutes); // Change the route path to /api

// api for blogs routes;

app.use("/", blogRoutes);

// api for the comments in my blogs

app.use("/", commentRoutes);



// api for the useProfile in the system in my blogs

app.use("/", userProfileRoutes);


// api for the handling the likes of the and dislikes of the blog

app.use('/', likesRoutes);



// api for the handling the message between users
app.use('/', messageRoutes);

// api for handling the messages between two users

app.use('/', messageEditAndDeleteRoute);

// this is my followers routes

app.use('/', followRoutes);

// this is the my search results routes

app.use('/', searchResultsRoutes);


// this is the my search results routes

app.use('/', recentMessageRoutes);

// this is the my video call feature routes

app.use('/', videoCallRoutes);

// this is the my COmments reply routes for the receiving my end points on the backend 
app.use('/', CommentsReplyRoutes);

// this is for the handlng the reply fo reply routes

app.use('/', replyForReplyRoutes);

// this is for handling the groupChatRommMessages routes
app.use('/', groupChatRoomMessagesRoutes);

// this is the for handling the group chat and messages functionality in the group

app.use('/', groupMessagesRoutes);


// this is the for handling the saved posts
// in the profile sections of the user

app.use('/', AddPostsToUserProfileRoutes);





// // database connections 
// mongoose.connect(`mongodb://127.0.0.1:27017/${process.env.LINK}`).then(() => {
//     console.log("Database connected succesfully")
// }).catch((err) => {
//     console.log(err)
// });

// // database connection ended

// start of the atlas database connections


// mongoose.connect("mongodb+srv://raykushwaha0031:C1k4maJXzH2vAmh4@blog.zlf5agh.mongodb.net/Blog").then(() => {
//     console.log("Database connected succesfully")
// }).catch((err) => {
//     console.log(err)
// });

// end of the atlas database connections


// start of the new way from the chatgpt

mongoose.connect("mongodb+srv://raykushwaha0031:C1k4maJXzH2vAmh4@blog.zlf5agh.mongodb.net/Blog", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 10000,  // Example: Increased timeout to 10 seconds
    socketTimeoutMS: 45000,           // Example: Increased socket timeout to 45 seconds
}).then(() => {
    console.log("Database connected successfully");
}).catch((err) => {
    console.error("Error connecting to database:", err);
});


//end of the new way from the chat gpt


app.get("/", (req, res) => {
    res.send("this is home page and i am uploading the backend part of the render!");
});


const PORT = process.env.PORT || 8080;  // specify the port number
const server = app.listen(process.env.PORT, (err) => {
    if (err) {
        console.log(err);
    }
    console.log(`Server is running at http://localhost:${PORT}`);
});


// start of the implimentations of the socket io

/*

// here we are implenting the socket.io 
const io = socket(server, {
    cors: {
        origin: "http://localhost:5173",
        credential: true,
    }
});



// the above is our io it is ready 

global.onlineUsers = new Map();

io.on("connection", (socket) => {
    global.chatSocket = socket;   // this will be used to emit messages from anywhere in the code

    socket.on("add-user", (userId) => {

        onlineUsers.set(userId, socket.id);
    });

    socket.on('send-msg', (data) => {
        const sendUserSocket = onlineUsers.get(data.to);

        if (sendUserSocket) {
            socket.to(sendUserSocket).emit("msg-recieve", data.message);
        };

    })

});




// end of the implimentations of the socket io

*/


// Initialize socket.io
const io = socket(server, {
    cors: {
        origin: "http://localhost:5173",
        credentials: true, // Fixing typo in "credential" to "credentials"
    }
});

// Map to store online users
const onlineUsers = new Map();

// Event listener for new socket connections
io.on("connection", (socket) => {
    console.log("New socket connection:", socket.id);

    // Event listener for adding a new user
    socket.on("add-user", (userId) => {
        console.log("User added:", userId);
        onlineUsers.set(userId, socket.id);
    });

    // Event listener for sending messages
    socket.on('send-msg', (data) => {
        console.log("Message received:", data);
        const sendUserSocket = onlineUsers.get(data.to);

        if (sendUserSocket) {
            socket.to(sendUserSocket).emit("msg-recieve", data.message); // Fixing typo in "msg-recieve" to "msg-receive"
        } else {
            console.error("Recipient socket not found");
        }
    });
});


// comments 01
