import mongoose from 'mongoose';
import Charge from './charge.model';

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
        // type: Schema.Types.ObjectId,
        // required: true,
        // ref: 'Charge'
        type: Number,
        required: true
    },
    description: {
        type: String,
        default: 'None'
    },
    status: {
        type: String,
        default: 'Available',
        required: true,
        enum: ['Available', 'Occupied', 'Reserved', 'cleaning']

    }
});

const Room = mongoose.model('Room', roomSchema);

export default Room;



