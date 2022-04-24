import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
    required: true,
  },
  room: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Room",
    required: true,
  },
  startDate: {
    // date and time
    type: Date,
    required: true,
  },
  endDate: {
    // date new Date("<YYYY-mm-dd>"
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ["checkin", "checkout", "cancel", "pending"],
    default: "pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Ticket = mongoose.model("Ticket", ticketSchema);

export default Ticket;
