const userProfile = require("../Models/userProfileModel");



module.exports.addUserProfile = async (req, res) => {

    try {

        const { userId, profileImage, village, districk, pincode, state, country, phoneNumber, proffession, about, accountType } = req.body;

        // console.log(typeof userId, profileImage, village, districk, pincode, state, country, phoneNumber, proffession, about, accountType);


        const response = await userProfile.create(req.body);


        if (response) {
            res.json({
                response: response,
                status: true,
                message: `hello your profile is updated successfully `
            })
        }



    } catch (err) {
        console.log(err)
    }
};





module.exports.getUserProfile = async (req, res) => {

    try {

        const { id } = req.params;
        // console.log(id);



        const response = await userProfile.find({
            userId: id,
        });

        // console.log(response);


        if (response) {
            res.json({
                response: response,
                status: true,
                message: `hello your profile is updated successfully `
            })
        }



    } catch (err) {
        console.log(err)
    }
};



// start of the edit use profile 




module.exports.editUserProfile = async (req, res) => {

    try {

        const { userId, profileImage, village, districk, pincode, state, country, phoneNumber, proffession, about, accountType } = req.body;

        // console.log(typeof userId, profileImage, village, districk, pincode, state, country, phoneNumber, proffession, about, accountType);


        const response = await userProfile.findOneAndUpdate({ userId: userId }, {
            profileImage: profileImage,

            village: village,
            districk: districk,
            pincode: pincode,
            state: state,
            country: country,
            phoneNumber: phoneNumber,
            proffession: proffession,
            about: about,
            accountType: accountType,


        }, { new: true });

        // console.log(response)

        if (response) {
            res.json({
                response: response,
                status: true,
                message: `hello your profile is updated successfully `
            });
        };



    } catch (err) {
        console.log(err);
    }
};




// end of the dit of the user profile 



// start of the getting the alluserProfile

// alluserProfile


module.exports.alluserProfile = async (req, res) => {

    try {

        const { id } = req.params;
        // console.log(id);



        const response = await userProfile.find({
            userId: id,
        });

        // console.log(response);


        if (response) {
            res.json({
                response: response,
                status: true,
                message: `hello your profile is updated successfully `
            })
        }



    } catch (err) {
        console.log(err)
    }
};

// end of the getting all the userprofile
