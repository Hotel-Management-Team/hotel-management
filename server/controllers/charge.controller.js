import Charge from "../models/charge.model";

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
    res.status(500).json({
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
      msg: "Charge created successfully",
      data: charge,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      success: false,
      msg: "Server Error",
    });
  }
};

// delete charge
export const deleteCharge = async (req, res) => {
  try {
    const { _id } = req.params;
    await Charge.findByIdAndDelete(_id);
    res.json({
      success: true,
      msg: "Charge deleted successfully",
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      success: false,
      msg: "Server Error",
    });
  }
};