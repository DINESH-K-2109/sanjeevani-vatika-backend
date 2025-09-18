
const Follower = require("../../Models/Follow Model/followModel");


module.exports.addFollower = async (req, res) => {
    try {
        const { from, fromName, to, toName, following } = req.body;

        // console.log(toName)

        const response = await Follower.findOne({
            from: from,
            to: to,
        });






        if (!response) {


            const response = await Follower.create(
                {
                    from: from,
                    fromName: fromName,
                    to: to,
                    toName: toName,
                    following: following,
                }
            );
            res.json({
                response: response,
                message: "Follower updated successfully",
                status: true,
            });

        }

        else {
            const response = await Follower.findOneAndUpdate(
                { from, to },
                { following: true },
                { new: true } // To return the modified document
            );
            res.json({
                response: response,
                message: "Follower updated successfully",
                status: true,
            });
        }



    } catch (err) {
        console.log(err);
        res.status(500).json({
            response: null,
            message: "Internal server error",
            status: false,
        });
    }
};




// start remove followers


module.exports.Unfollowings = async (req, res) => {
    try {

        const { from, to, following } = req.body;
        // console.log(from, to, following);

        const response = await Follower.findOneAndUpdate(
            { from, to },
            { following: following },
            { new: true } // To return the modified document
        );

       

        if (response) {
            res.json({
                response: response,
            })
        }

    } catch (err) {
        console.log(err);
        res.status(500).json({
            response: null,
            message: "Internal server error",
            status: false,
        });
    }
};



// end remove followers



// start of the getting all followers controllers
//getFollowers

module.exports.getFollowers = async (req, res) => {

    try {
        const { to } = req.body;
        // console.log(to);

        const response = await Follower.find({
            to: to,
            following: true,
        });
        // console.log(response);
        if (response) {
            res.json({
                response: response,
                status: true,
            });
        };

    } catch (err) {
        console.log(err);
    }
};


// start of the getting all followers controllers



// start of the getting all followers controllers
//getFollowers

module.exports.followerDetails = async (req, res) => {

    try {
        const { from, to } = req.body;
        // console.log("the user details box ", from, to);

        const response = await Follower.find({
            from: from,
            to: to,
        });

       
        if (response) {
            res.json({
                response: response,
                status: true,
            });
        };

    } catch (err) {
        console.log(err);
    }
};


// start of the getting all followers controllers



// start  of the getting all the followers of aparticular user



module.exports.getFollowings = async (req, res) => {

    try {
        const { from } = req.body;
        // console.log(from);

        const response = await Follower.find({
            from: from,
            following: true,
        });
       
        if (response) {
            res.json({
                response: response,
                status: true,
            });
        };

    } catch (err) {
        console.log(err);
    }
};


// End  of the getting all the followers of aparticular user 


// start of the removing the followers from the database


module.exports.deleteFollower = async (req, res) => {

    try {
        const { from, to } = req.body;

        // console.log("the delete box", from, to);

        const response = await Follower.findOneAndDelete({
            from: from,
            to: to,
        });
        // console.log(response);
        if (response) {
            res.json({
                response: response
            })
        }
    } catch (err) {
        console.log(err);
    }
};


// end of the removing the follower from the database

