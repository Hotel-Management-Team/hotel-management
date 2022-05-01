import mongoose from 'mongoose';

const CustomerSchema = new mongoose.Schema({
    ID: {
        type: String,
        required: true,
        unique: true,
    },
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
        enum: ['local', 'foreign'],
    }
});

const Customer = mongoose.model('Customer', CustomerSchema);

export default Customer;

