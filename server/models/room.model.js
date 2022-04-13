const mongoose = require('mongoose');
const Charge = require('./charge.model');
const { Schema } = mongoose;

const roomSchema = new Schema({
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

module.exports = mongoose.model('Room', roomSchema);



