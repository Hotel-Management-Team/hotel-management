const mongoose = require('mongoose');
const { Schema } = mongoose;

const chargeSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    firstBlock: {
        type: Number,
        required: true
    },
    firstBlockCharge: {
        type: Number,
        required: true
    },
    overTimeCharge: {
        type: Number,
        required: true
    },
    overNightCharge: {
        type: Number,
        required: true
    },
    OnDayCharge: {
        type: Number,
        required: true
    },
    Surcharge: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Charge', chargeSchema);