import mongoose from 'mongoose';

const chargeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    FirstBlock: {
        type: Number,
        required: true
    },
    FirstBlockCharge: {
        type: Number,
        required: true
    },
    OvertimeCharge: {
        type: Number,
        required: true
    },
    OverNightCharge: {
        type: Number,
        required: true
    },
    DateCharge: {
        type: Number,
        required: true
    },
    SurCharge: {
        type: Number,
        required: true
    }
});

const Charge = mongoose.model('Charge', chargeSchema);

export default Charge;