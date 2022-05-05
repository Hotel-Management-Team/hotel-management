import Charge from "../models/charge.model";
import Room from "../models/room.model";
// get all charge
export const getCharge = async (req, res) => {
  try {
    const charge = await Charge.find();
    res.json({
      success: true,
      msg: "Get charge successfully",
      data: charge,
    });
  } catch (error) {
    console.error(error.message);
    res.json({
      success: false,
      msg: "Server Error",
    });
  }
};

// add new charge
export const addCharge = async (req, res) => {
  try {
    const charge = new Charge(req.body);
    await charge.save();
    res.json({
      success: true,
      msg: "Thêm cách tính tiền thành công",
      data: charge,
    });
  } catch (error) {
    console.error(error.message);
    res.json({
      success: false,
      msg: "Thêm cách tính tiền thất bại",
    });
  }
};

// delete charge
export const deleteCharge = async (req, res) => {
  try {
    const { _id } = req.params;
    const rooms = await Room.find({ charge: _id });
    if (rooms.length == 0) {
      await Charge.findByIdAndDelete(_id);
      res.json({
        success: true,
        msg: "Xóa cách tính tiền thành công",
      });
    } else {
      res.json({
        success: false,
        msg: "Xoá cách tính tiền thất bại",
      });
    }

  } catch (error) {
    console.error(error.message);
    res.json({
      success: false,
      msg: "Server Error",
    });
  }
};

// update charge  
export const updateCharge = async (req, res) => {
  try {
    const { _id } = req.params;
    const charge = await Charge.findByIdAndUpdate(_id, req.body, {
      new: true,
    });
    res.json({
      success: true,
      msg: "Cập nhật cách tính tiền thành công",
      data: charge,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      success: false,
      msg: "Cập nhật cách tính tiền thất bại",
    });
  }
};