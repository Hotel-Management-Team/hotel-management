import RoomType from "../models/roomType.model";
import Room from "../models/room.model";

export const getRoomType = async (req, res) => {
  try {
    const roomTypes = await RoomType.find();
    const rooms = await Room.find();
    const data = roomTypes.map((roomType) => {
      const roomTypeRooms = rooms.filter(
        (room) => room.roomtype._id.toString() === roomType._id.toString()
      );
      return {
        ...roomType._doc,
        numberOfRoom: roomTypeRooms.length,
      };
    });

    res.json({
      success: true,
      data,
      rooms,
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
      msg: "Thêm loại phòng thành công",
    });
  } catch (error) {
    console.error(error.message);
    res.json({
      success: false,
      msg: "Server Error",
    });
  }
};

export const putRoomType = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;
    const roomType = await RoomType.findByIdAndUpdate(
      id,
      {
        name,
        description,
      },
      { new: true }
    );
    res.json({
      success: true,
      data: roomType,
      msg: "Cập nhật loại phòng thành công",
    });
  } catch (error) {
    console.error(error.message);
    res.json({
      success: false,
      msg: "Server Error",
    });
  }
};

export const deleteRoomType = async (req, res) => {
  const { id } = req.params;
  try {
    const roomType = await RoomType.findByIdAndDelete(id);
    if (!roomType) {
      return res.json({
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
    res.json({
      success: false,
      msg: "Server Error",
    });
  }
};
