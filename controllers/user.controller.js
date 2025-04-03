const User = require("../models/user.model");


// get all users
const getAllUserController = async (req, res) => {
    try {
        const result = await User.find({});
        return res.status(200).json({
            status: "ok",
            message: "Users fetched successfully",
            data: result
        })
    } catch (error) {
        console.log(`[ERROR] in fetching all users: ${error || error.message}`);
        return res.status(500).json({
            status: "error",
            message: "Internal Server Error"
        })
    }
}

// get user by id
const getUserByIdController = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({
                status: "error",
                message: "User not found"
            })
        }
        return res.status(200).json({
            status: "ok",
            message: "User fetched successfully",
            data: user
        })

    } catch (error) {
        console.log(`[ERROR] in fetching user by id: ${error || error.message}`);
        return res.status(500).json({
            status: "error",
            message: "Internal Server Error"
        })
    }
}

// create new user
const createUserController = async (req, res) => {
    try {
        const {name, email, phone, password} = req.body ;
        if (!name || !email || !phone || !password){
            return res.status(400).json({
                status: "error",
                message: "Please fill all fields"
            })
        }

        const result = await User.create({ name, email, phone, password });

        return res.status(201).json({
            status: "ok",
            message: "User created successfully",
            data: result
        })

    } catch (error) {
        console.log(`[ERROR] in creating new user: ${error || error.message}`);
        return res.status(500).json({
            status: "error",
            message: "Internal Server Error"
        })
    }
}
// update a user by id
const updateUserController = async (req, res) => {
    try {
        const userId = req.params.id;

        let query = {};
        if (req.body.name) query.name = req.body.name;
        if (req.body.email) query.email = req.body.email;
        if (req.body.phone) query.phone = req.body.phone;
        if (req.body.password) query.password = req.body.password;

        if (Object.keys(query).length === 0) {
            return res.status(400).json({
                status: "error",
                message: "Please provide at least one field to update"
            })
        }

        const result = await User.findByIdAndUpdate(userId, query, { new: true });

        return res.status(200).json({
            status: "ok",
            message: "User updated successfully",
            data: result
        })

    } catch (error) {
        console.log(`[ERROR] in updating user: ${error || error.message}`);
        return res.status(500).json({
            status: "error",
            message: "Internal Server Error"
        })
    }
}

// delete a user by id
const deleteUserController = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json({
                status: "error",
                message: "User to delete not found"
            });
        }

        return res.status(200).json({
            status: "ok",
            message: "User deleted successfully"
        });

    } catch (error) {
        console.log(`[ERROR] in deleteing user: ${error || error.message}`);
        return res.status(500).json({
            status: "error",
            message: "Internal Server Error"
        })
    }
}


module.exports = {
    getAllUserController,
    getUserByIdController,
    createUserController,
    updateUserController,
    deleteUserController
}