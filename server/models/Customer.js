const mongoose = require('mongoose');
const { Schema } = mongoose;

const CustomerSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: String,
    phone: {
        type: String,
        required: true,
    },
    address: String,
    type: {
        type: String,
        required: true,
        enum: ['Local', 'Foreign'],
    }
});

module.exports = mongoose.model('Customer', CustomerSchema);

