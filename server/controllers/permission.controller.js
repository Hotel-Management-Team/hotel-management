import User from "../models/user.model";

export const putBannedUser = async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) {
      return res.json({
        success: false,
        msg: "No id provided",
      });
    }
    const user = await User.findById(id);
    if (!user) {
      return res.json({
        success: false,
        msg: "User not found",
      });
    }
    user.isBanned = !user.isBanned;
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
