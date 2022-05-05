import mongoose from "mongoose";

const invoiceSchema = new mongoose.Schema({
  createAt: {
    type: Date,
    default: Date.now,
  },
  total: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: ["Paid", "Unpaid"],
    default: "Unpaid",
  },
  prepaid: {
    type: Number,
    required: true,
    default: 0,
  },
  ticket: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Ticket",
    required: true,
  },
});

const Invoice = mongoose.model("invoice", invoiceSchema);

export default Invoice;
