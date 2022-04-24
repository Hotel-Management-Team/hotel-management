import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  permissons: {
    hasRoom: {
      type: Boolean,
      default: false,
    },
    hasPrice: {
      type: Boolean,
      default: false,
    },
    hasType: {
      type: Boolean,
      default: false,
    },
    hasRental: {
      type: Boolean,
      default: false,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "Manager",
    enum: ["Manager", "Admin"],
  },
  fullName: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("User", userSchema);

export default User;
