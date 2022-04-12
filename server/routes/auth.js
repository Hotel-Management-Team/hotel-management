const express = require('express');
const router = express.Router();
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const verifyToken = require('../middlewares/auth.middleware');

// @route   GET api/auth
// @desc    check if user is logged in
// @access  Public
router.get('/', verifyToken,  async (req, res) => {
    try {
        const user = await User.findById(req.userId).select('-password');
        if (!user) return res.status(404).json({ success: false, message: 'User not found' });
        res.json({ success: true, user });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
    });

// @route   POST api/auth/register
// @desc    Register user
// @access  Public
router.post('/register', (req, res) => {
    try
    {
        const { username, email, password } = req.body;
        // Simple validation
         if(!username || !email || !password) {
             return res.status(400).json({ success: false, msg: 'Please enter all fields' });
         }
         if(password.length < 6) {
             return res.status(400).json({ success: false, msg: 'Password must be at least 6 characters' });
         }
         // Check for existing user
         User.findOne({ email: email }).then(user => {
             if(user) {
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
    catch(err){
        console.log(err);
        res.status(500).json({
            success: false,
            msg: 'Server Error'
        });
    }
});

// @route   POST api/auth/login
// @desc    Login user
// @access  Public
router.post('/login', async (req, res) => {
    try
    {
        const { email, password } = req.body;
        // Simple validation
         if(!email || !password) {
             return res.status(400).json({ success: false, msg: 'Please enter all fields' });
         }
         // Check for existing user
         try{
             const user = await User.findOne({ email: email });
             if(!user) {
                 return res.status(400).json({ success: false, msg: 'Email not exist' });
             }
             // user found
             // verify password
                const validPass = await argon2.verify(user.password, password);
                if(!validPass) {
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
         catch(err){
             console.log(err);
             res.status(500).json({
                 success: false,
                 msg: 'Server Error'
             });
         }
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            success: false,
            msg: 'Server Error'
        });
    }
});


module.exports = router;