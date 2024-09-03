import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import userModel from "../Models/user.js"


// add the user
export const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        console.log(name, email)
        const user = await userModel.findOne({ email });

        if (user) {
            return res.status(409)
                .json({ message: 'User is already exist, you can login', success: false });
        }
        const userData = new userModel({ name, email, password });
        userData.password = await bcrypt.hash(password, 10);
        await userData.save();
        res.status(201)
            .json({
                message: "Signup successfully",
                success: true
            })
    } catch (err) {
        res.status(500)
            .json({
                message: "Internal server errror",
                success: false
            })
    }
}

// login the user
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email });
        console.log(user.password)
        const errorMsg = 'Auth failed email or password is wrong';
        if (!user) {
            return res.status(403)
                .json({ message: errorMsg, success: false });
        }
        const isPassEqual = await bcrypt.compare(password, user.password);
        console.log()
        if (!isPassEqual) {
            return res.status(403)
                .json({ message: errorMsg, success: false });
        }
        const jwtToken = jwt.sign(
            { email: user.email, _id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        )

        res.status(200)
            .json({
                message: "Login Success",
                success: true,
                jwtToken,
                email,
                name: user.name
            })
    } catch (err) {
        res.status(500)
            .json({
                message: "Internal server errror",
                success: false
            })
    }
}

// get all users

export const getAllUser = async (req, res) => {
    try {
        const users = await userModel.find()
        if (users) {
            return res.status(200).json({ status: true, data: users })
        }

        else {
            return res.status(400).json({ status: false, data: users })
        }
    }

    catch (err) {
        console.log(err)
        res.status(500).json({ status: false, message: err.message })
    }
}

export const updateUser = async (req, res) => {
    const id = req.params.id
    const age = req.body.age;
    try {

        const isUserExist = await userModel.findById({ _id: id })
        if (!isUserExist) {
            return res.status(404).json({ status: false, message: "User Not Found." })
        }
        await userModel.updateOne({ _id: id }, { $set: { age: age } })
        res.status(200).json({ status: true, message: "Data updated successfully." })
    }

    catch (err) {
        console.log(err)
        res.status(500).json({ status: false, message: err.message })
    }
}

// delete the user

export const deleteUser = async (req, res) => {
    try {

        const id = req.params.id

        const isUserExist = await userModel.findById({ _id: id })
        if (!isUserExist) {
            return res.status(404).json({ status: false, message: "User Not Found." })
        }
        const delteUser = await userModel.deleteOne({ _id: id })
        res.status(200).json({ status: true, message: "User delete successfully." })
    }

    catch (err) {
        console.log(err)
        res.status(500).json({ status: false, message: err.message })
    }
}

