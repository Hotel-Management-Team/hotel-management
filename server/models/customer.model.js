import mongoose from 'mongoose';

const CustomerSchema = new mongoose.Schema({
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

const Customer = mongoose.model('Customer', CustomerSchema);

export default Customer;

