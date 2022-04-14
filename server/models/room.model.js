import mongoose from 'mongoose';

const roomSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    type: {
        type: String,
        required: true,
        enum: ['Single', 'Double', 'Triple', 'Quad']
    },
    charge: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Charge'
    },
    description: {
        type: String,
        default: 'None'
    },
    status: {
        type: String,
        default: 'Waiting',
        required: true,
        enum: ['Booked', 'Waiting', 'NeedClean']

    }
});

const Room = mongoose.model('Room', roomSchema);

export default Room;



