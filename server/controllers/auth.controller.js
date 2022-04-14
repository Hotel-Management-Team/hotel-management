import User from '../models/user.model';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';

export const getAuth = async (req, res) => {
    try {
        const user = await User.findById(req.userId).select('-password');
        if (!user) return res.status(404).json({ success: false, message: 'User not found' });
        res.json({ success: true, user });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};

export const postLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        // Simple validation
        if (!email || !password) {
            return res.status(400).json({ success: false, msg: 'Please enter all fields' });
        }
        // Check for existing user
        try {
            const user = await User.findOne({ email: email });
            if (!user) {
                return res.status(400).json({ success: false, msg: 'Email not exist' });
            }
            // user found
            // verify password
            const validPass = await argon2.verify(user.password, password);
            if (!validPass) {
                return res.status(400).json({ success: false, msg: 'Invalid password' });
            }
            // password is valid
            // return jwt token days
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '3d' });
            res.json({
                success: true,
                token: token,
                msg: 'User logged in'
            });
        }
        catch (err) {
            console.log(err);
            res.status(500).json({
                success: false,
                msg: 'Server Error'
            });
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            msg: 'Server Error'
        });
    }
};