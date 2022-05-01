import User from "../models/user.model";

export const putBannedUser = async (req, res) => {
  console.log("putBannedUser");
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
    res.json({
      success: false,
      msg: "Server Error",
    });
  }
};

export const putPermissionUser = async (req, res) => {
  console.log("putPermissionUser");
  const { id } = req.params;
  const { hasPrice, hasRental, hasRoom, hasType, isAdmin } = req.body;
  const permissions = {
    hasPrice,
    hasRental,
    hasRoom,
    hasType,
    isAdmin,
  };
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

    user.permissons = permissions;
    await user.save();
    res.json({
      success: true,
      data: user,
      msg: "User updated",
    });
  } catch (error) {
    console.error(error.message);
    res.json({
      success: false,
      msg: "Server Error",
    });
  }
};
