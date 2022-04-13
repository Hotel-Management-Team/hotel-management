const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/auth.middleware');
const Room = require('../models/room.model');

// @route  GET api/room
// @desc   Get  room
// @access Private
router.get('/', verifyToken, async (req, res) => {
    try {
        const room = await Room.find({ user: req.userId }).populate();
        res.json({
            success: true,
            data: room
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            success: false,
            msg: 'Server Error'
        });
    }
});


// @route   POST api/room
// @desc    Create a room
// @access  Private
router.post('/', verifyToken, async (req, res) => {
    try {
        const { name, type, charge, description } = req.body;

        // simple validation
        if (!name || !type || !charge || !description) {
            return res.status(400).json({ msg: 'Please enter all fields' });
        }
        try {
            // Check if room already exists
            const room = await Room.findOne({ name });
            if (room) {
                return res.status(400).json({ msg: 'Room already exists' });
            }
            const newRoom = new Room({
                name,
                type,
                charge,
                description: description || '',
            });
            await newRoom.save();
            res.json({
                success: true,
                msg: 'Room created successfully',
                data: newRoom
            });
        } catch (error) {
            console.error(error.message);
            res.status(500).send('Server Error');
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            msg: 'Server Error'
        });
    }
});

// @route   PUT api/room/:id
// @desc    Update a room
// @access  Private
router.put('/:id', verifyToken, async (req, res) => {
    const { name, type, charge, description } = req.body;
    if (!name || !type || !charge) {
        return res.status(400).json({
            success: false,
            msg: 'Please enter all fields'
        });
    }
    try {
        let UpdatedRoom = {
            name,
            type,
            charge,
            description: description || 'None',
        }
        const room = await Room.findOneAndUpdate({ _id: req.params.id, user: req.userId }, { $set: UpdatedRoom }, { new: true });
        if (!room) {
            return res.status(404).json({
                success: false,
                msg: 'Room not found'
            });
        }
        res.json({
            success: true,
            msg: 'Room updated successfully',
            data: room
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

// @route   DELETE api/rooms/:id
// @desc    Delete a room
// @access  Private
router.delete('/:id', verifyToken, async (req, res) => {
    try {
        const room = await Room.findOneAndDelete({ _id: req.params.id, user: req.userId });
        if (!room) {
            return res.status(404).json({
                success: false,
                msg: 'Room not found or you are not authorized to delete this room'
            });
        }
        res.json({
            success: true,
            msg: 'Room deleted successfully',
            data: room
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});


module.exports = router;