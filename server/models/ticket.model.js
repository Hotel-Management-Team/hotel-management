import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    room: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Room',
        required: true
    },
    startDate: {
        type: Date,
        default: Date.now,
        required: true
    }
});

const Ticket = mongoose.model("Ticket", ticketSchema);

export default Ticket;
