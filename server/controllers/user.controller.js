import User from "../models/user.model";
import argon2 from "argon2";
import jwt from "jsonwebtoken";

export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json({
      success: true,
      data: users,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      success: false,
      msg: "Server Error",
    });
  }
};

export const putUser = async (req, res) => {
  const { fullName, email, username, phoneNumber, password } = req.body;
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        msg: "User not found",
      });
    }
    if (fullName) user.fullName = fullName;
    if (email) user.email = email;
    if (username) user.username = username;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (password) user.password = await argon2.hash(password);
    await user.save();
    res.json({
      success: true,
      data: user,
      msg: "User updated",
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      success: false,
      msg: "Server Error",
    });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) {
      return res.status(400).json({
        success: false,
        msg: "No id provided",
      });
    }
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        msg: "User not found",
      });
    }
    await User.findByIdAndDelete(id);
    res.json({
      success: true,
      msg: "User deleted",
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      success: false,
      msg: "Server Error",
    });
  }
};

// email,
//         password,
//         username,
//         fullname,
//         phoneNumber,
//         role,
//         permissons: {
//           hasRoom,
//           hasPrice,
//           hasType,
//           hasRental,
//           isAdmin: role === "Admin" ? true : false,
//         },
//         createdAt: Date.now(),

export const postUser = async (req, res) => {
  try {
    console.log(req.body);

    const {
      username,
      email,
      password,
      fullName,
      phoneNumber,
      role,
      permissons: { hasRoom, hasPrice, hasType, hasRental, isAdmin },
      createdAt,
    } = req.body;

    // Simple validation

    if (!username || !email || !password || !fullName || !phoneNumber) {
      return res.json({
        success: false,
        msg: "Please enter all fields",
      });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.json({
        success: false,
        msg: "User already exists",
      });
    }
    const newUser = new User({
      username,
      email,
      password,
      fullName,
      phoneNumber,
      role,
      permissons: {
        hasRoom,
        hasPrice,
        hasType,
        hasRental,
        isAdmin: role === "Admin" ? true : false,
      },
      createdAt: Date.now(),
    });
    // Hash password
    newUser.password = await argon2.hash(password);
    await newUser.save();
    res.json({
      success: true,
      data: newUser,
      msg: "User created",
    });
  } catch (error) {
    console.error(error.message);
    res.json({
      success: false,
      msg: "Server Error",
    });
  }
};
