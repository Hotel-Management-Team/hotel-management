import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema({
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        required: true
    },
    room: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Room',
        required: true
    },
    arrivalDate: {
        // date new Date("<YYYY-mm-dd>"
        type: Date,
        required: true,
        default: Date.now
    },
    departureDate: {
        type: Date,
        required: true,
        default: Date.now
    },
});

const Ticket = mongoose.model("Ticket", ticketSchema);

export default Ticket;
