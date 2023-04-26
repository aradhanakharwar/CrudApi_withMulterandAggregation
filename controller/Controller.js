const userModel = require('../model/User');


//ADD USER
exports.addUser = async (req, res) => {
    const user = new userModel({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        phone: req.body.phone,
        image: req.file.path
    });
    await user.save()
        .then(data => {
            res.status(200).send({ success: true, msg: "User data created succesfully!!", result: data })
        })
        .catch(error => {
            res.status(400).send({ success: false, msg: error + 'User data not created' })
        });
};


//UPDATE USER
exports.updateUser = (req, res) => {

    userModel.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true })

        .then(data => {
            res.status(200).send({ success: true, msg: `${data.name}'s data upadated successfully.`, datas: data });
        });

};


//FETCH ALL USERS
exports.fetchAllUsers = (req, res) => {
    userModel.find()
    .then(data => {
        res.status(200).send({success: true, msg: "All user,s data fetched successfully", result: data})
    })
    .catch(error => {
        res.status(400).send({success: false, msg: error + "Data not fetched."})
    });
};



// It sort out the fields in given orders.
// exports.fetchAllUsers = (req, res) => {
//     userModel.aggregate([{ $sort: { name: 1 } }]).exec()
//         .then(data => {
//             res.status(200).send({ success: true, msg: "All user,s data fetched successfully", result: data })
//         })
//         .catch(error => {
//             res.status(400).send({ success: false, msg: error + "Data not fetched." })
//         });
// };



// fetch all students data using project: it's cutout unselected fields.
// exports.fetchAllUsers = (req, res) => {
//     userModel.aggregate([{ $project: { name: 1, email: 1 } }]).exec()
//         .then(data => {
//             res.status(200).send({ success: true, msg: "All user,s data fetched successfully", result: data })
//         })
//         .catch(error => {
//             res.status(400).send({ success: false, msg: error + "Data not fetched." })
//         });
// };

//It filter out selected elements.
// exports.fetchAllUsers = (req, res) => {
//     userModel.aggregate([{$match: {name: "Anju"}}]).exec()
//         .then(data => {
//             res.status(200).send({ success: true, msg: "Data fetched", result: data })           
//         })
//         .catch(error => {
//             res.status(400).send({ success: false, msg: error + " 'Data not fetched.'" })
//         });
// };

// exports.fetchAllUsers = (req, res) => {
//     userModel.aggregate([{$match: {name: {$gte: 2}}}]).exec()
//         .then(data => {
//             res.status(200).send({ success: true, msg: "Data fetched", result: data })           
//         })
//         .catch(error => {
//             res.status(400).send({ success: false, msg: error + " 'Data not fetched.'" })
//         });
// };


//FETCH SINGLE USER
exports.fetchSingleUser = (req, res) => {
    const uid = req.params.id

    userModel.findById(uid)
        .then(data => {
            res.status(200).send({ success: true, msg: `${data.name}'s data fetched successfully`, result: data })
        })
        .catch(error => {
            res.status(400).send({ success: false, msg: "Data not fetched." })
        });
};

//DELETE USER
exports.deleteUser = (req, res) => {
    const uid = req.params.id

    userModel.findByIdAndDelete(uid)
        .then(data => {
            res.status(200).send({ success: true, msg: `${data.name}'s data deleted successfully`, result: data });
        })
        .catch(error => {
            res.status(400).send({ msg: error + "User's data not deleted." })
        });
};
