import User from "../models/user.model";
import argon2 from "argon2";
import jwt from 'jsonwebtoken';

export const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json({
            success: true,
            data: users
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            success: false,
            msg: 'Server Error'
        });
    }
};


export const putUser = async (req, res) => {
};

export const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        if (!id) {
            return res.status(400).json({
                success: false,
                msg: 'No id provided'
            });
        }
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({
                success: false,
                msg: 'User not found'
            });
        }
        await User.findByIdAndDelete(id);
        res.json({
            success: true,
            msg: 'User deleted'
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            success: false,
            msg: 'Server Error'
        });
    }
};

export const postUser = (req, res) => {
    try {
        const { username, email, password } = req.body;
        // Simple validation
        if (!username || !email || !password) {
            return res.status(400).json({ success: false, msg: 'Please enter all fields' });
        }
        if (password.length < 6) {
            return res.status(400).json({ success: false, msg: 'Password must be at least 6 characters' });
        }
        // Check for existing user
        User.findOne({ email: email }).then(user => {
            if (user) {
                return res.status(400).json({ success: false, msg: 'User already exists' });
            } else {
                const newUser = new User({
                    username,
                    email,
                    password
                });

                // argon2 password hashing
                argon2.hash(password).then(hash => {
                    newUser.password = hash;
                    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '3d' });
                    newUser.save().then(user => {
                        res.json({
                            success: true,
                            token: token,
                            msg: 'User registered'
                        });
                    }).catch(err => {
                        console.log(err);
                        res.status(500).json({
                            success: false,
                            msg: 'Server Error'
                        });
                    });
                });
            }
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            msg: 'Server Error'
        });
    }
};