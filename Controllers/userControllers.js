
const User = require("../Models/userModel");

const bcrypt = require("bcrypt");
const saltRound = 10;

// user registeration on database // user registrations controllers

module.exports.register = async (req, res) => {

    try {
        const { username, email, password } = req.body;

        console.log(username, email, password);


        const usernameCheck = await User.findOne({
            username: username,
        });

        const emailCheck = await User.findOne({
            email: email,
        });

        if (usernameCheck) {
            res.json({
                message: "username is already taken try another",
                status: false,
            });
        }

        else if (emailCheck) {
            res.json({
                message: "email is already exists click below to login !",
                status: false,
            });
        }
        else {


            res.json({
                status: true,
                user: username,
                dataIsReachedToBackend: true,
            })



            bcrypt.hash(password, saltRound, function (err, hash) {


                const new_user = new User({
                    username: username,
                    email: email,
                    password: hash,

                });

                new_user.save().then((res) => {
                    console.log("hello from the database your data is save", res);
                }).catch((err) => {
                    console.log(err);
                });


            });

        }

    } catch (err) {
        console.log(err)
    }
};



// login controlleres starts 



module.exports.login = async (req, res) => {

    try {
        const { username, password } = req.body;

        console.log(username, password);


        const usernameCheck = await User.findOne({
            username: username,
        });
        // checking the username exists in database or not

        if (!usernameCheck) {
            res.json({
                message: "username is not registered with us ! kindly Register first",
                status: false,
            });
        }

        else {



            // loading the hash password from the database;
            const userDetails = await User.findOne({
                username: username,
            });






            // Load hash from your password DB.
            bcrypt.compare(password, userDetails.password, function (err, result) {
                if (err) {
                    // Handle error, such as logging or returning an error response
                    console.error(err);
                    return;
                }

                // Check the result to determine if the passwords match
                if (result === true) {
                    res.json({
                        userDetails: userDetails,
                        status: true,
                        message: "Login successfully"
                    })

                } else {
                    res.json({
                        status: false,
                        message: "password does not natched try again"
                    })
                    // Handle incorrect password scenario, such as returning an error response
                }
            });


            // sending the datafrom the backend brother



        }

    } catch (err) {
        console.log(err)
    }
};




// login controllers end point


// start of getting all the users from the databse


module.exports.getAllusers = async (req, res) => {

    try {

        const response = await User.find({});
        if (response) {
            res.json({
                response: response
            })
        }

    } catch (err) {
        console.log(err)
    }

}


// end of the getting all the user s form the datanbse





