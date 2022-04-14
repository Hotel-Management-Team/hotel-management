import Room from "../models/room.model";

export const getRoom = async (req, res) => {
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
};

export const postRoom = async (req, res) => {
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
};

export const putRoom = async (req, res) => {
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
};

export const deleteRoom = async (req, res) => {
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
};
