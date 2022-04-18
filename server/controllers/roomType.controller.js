import RoomType from "../models/roomType.model";

export const getRoomType = async (req, res) => {
  try {
    const roomType = await RoomType.find();
    res.json({
      success: true,
      data: roomType,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      success: false,
      msg: "Server Error",
    });
  }
};

export const postRoomType = async (req, res) => {
  try {
    const { name, description } = req.body;
    const roomType = await RoomType.create({
      name,
      description,
    });
    res.json({
      success: true,
      data: roomType,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      success: false,
      msg: "Server Error",
    });
  }
};

export const putRoomType = async (req, res) => {};

export const deleteRoomType = async (req, res) => {
  const { id } = req.params;
  try {
    const roomType = await RoomType.findByIdAndDelete(id);
    if (!roomType) {
      return res.status(404).json({
        success: false,
        msg: "Room Type not found",
      });
    }
    res.json({
      success: true,
      msg: "Room Type deleted",
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      success: false,
      msg: "Server Error",
    });
  }
};
