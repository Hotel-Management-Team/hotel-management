import jwt from "jsonwebtoken";
import User from "../models/user.model";

const verifyBooking = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token)
    return res.json({
      success: false,
      msg: "Access denied. No token provided.",
    });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    const user = await User.findById(req.userId);
    if (!user) {
      return res.json({
        success: false,
        msg: "User not found",
      });
    }

    if (user.isBanned) {
      return res.json({
        success: false,
        msg: "Access denied. You are banned.",
      });
    }

    if (!user.permissons.hasRental) {
      return res.json({
        success: false,
        msg: "Access denied. You are not a booking manager.",
      });
    }
    next();
  } catch (error) {
    console.error(error.message);
    return res.json({ success: false, msg: "Forbidden" });
  }
};

export default verifyBooking;
