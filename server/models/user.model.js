import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    role: {
        hasRoom: {
            type: Boolean,
            default: false
        },
        hasPrice: {
            type: Boolean,
            default: false
        },
        hasType: {
            type: Boolean,
            default: false
        },
        hasRental: {
            type: Boolean,
            default: false
        },
        isAdmin: {
            type: Boolean,
            default: false
        }
    },
    createAt: {
        type: Date,
        default: Date.now
    },
});

const User = mongoose.model('User', userSchema);

export default User;