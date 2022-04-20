import User from '../models/user.model';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';

export const getAuth = async (req, res) => {
    try {
        const user = await User.findById(req.userId).select('-password');
        if (!user) return res.status(404).json({ success: false, message: 'User not found' });
        // user.createdAt
        // parse date to dd/mm/yyyy hh:mm:ss
        const date = new Date(user.createdAt);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        const hour = date.getHours();
        const minute = date.getMinutes();
        const second = date.getSeconds();
        const dateString = `${day}/${month}/${year} ${hour}:${minute}:${second}`;

        const result = {
            success: true,
            user: {
                id: user.id,
                role: user.role,
                username: user.username,
                email: user.email,
                createdAt: dateString,
                permissons: user.permissons,
                phoneNumber: user.phoneNumber,
                fullName: user.fullName
            }
        };

        return res.status(200).json(result);
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
                id: user._id,
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