import Room from "../models/room.model";
import Charge from "../models/charge.model";
import RoomType from "../models/roomType.model";
export const getRoom = async (req, res) => {
  try {
    const room = await Room.find().populate("charge").populate("roomtype");

    if (!room) {
      return res.status(404).json({
        success: false,
        msg: "Room not found",
      });
    }
    const result = room.map((item) => {
      return {
        _id: item._id,
        name: item.name,
        roomtype: item.roomtype,
        charge: item.charge,
        status: item.status,
        description: item.description,
      };
    });

    res.json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      success: false,
      msg: "Server Error",
    });
  }
};

export const postRoom = async (req, res) => {
  try {
    const { name, roomtype, charge, description, status } = req.body;

    // simple validation
    if (!name || !roomtype || !charge || !description) {
      return res.json({
        success: false,
        msg: "Please enter all fields",
      });
    }
    try {
      // Check if room already exists
      const room = await Room.findOne({ name });
      if (room) {
        return res.json({
          success: false,
          msg: "Room already exists",
        });
      }
      const newRoom = new Room({
        name,
        roomtype,
        charge,
        description,
        status,
      });
      await newRoom.save();
      // populate roomtype and charge
      const roomType = await RoomType.findById(roomtype);
      const chargeData = await Charge.findById(charge);
      if (!roomType || !chargeData) {
        return res.json({
          success: false,
          msg: "Roomtype or charge not found",
        });
      }
      const result = {
        _id: newRoom._id,
        name: newRoom.name,
        roomtype: roomType,
        charge: chargeData,
        status: newRoom.status,
        description: newRoom.description,
      };
      res.json({
        success: true,
        msg: "Room created successfully",
        data: result,
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      msg: "Server Error",
    });
  }
};

export const putRoom = async (req, res) => {
  const { name, roomtype, charge, description, status } = req.body;
  if (!name || !roomtype || !charge || !status) {
    return res.json({
      success: false,
      msg: "Please enter all fields",
    });
  }
  try {
    let UpdatedRoom = {
      name,
      roomtype,
      charge,
      description,
      status,
    };
    const room = await Room.findOneAndUpdate(
      { _id: req.params.id, user: req.userId },
      { $set: UpdatedRoom },
      { new: true }
    );
    const roomType = await RoomType.findById(roomtype);
    const chargeData = await Charge.findById(charge);
    if (!roomType || !chargeData || !room) {
      return res.json({
        success: false,
        msg: "Not found",
      });
    }
    const result = {
      _id: room._id,
      name: room.name,
      roomtype: roomType,
      charge: chargeData,
      status: room.status,
      description: room.description,
    };

    res.json({
      success: true,
      msg: "Room updated successfully",
      data: result,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

export const deleteRoom = async (req, res) => {
  try {
    const room = await Room.findOneAndDelete({
      _id: req.params.id,
      user: req.userId,
    });
    if (!room) {
      return res.json({
        success: false,
        msg: "Room not found or you are not authorized to delete this room",
      });
    }
    res.json({
      success: true,
      msg: "Room deleted successfully",
      data: room,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};
