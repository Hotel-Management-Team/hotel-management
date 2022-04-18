import Charge from "../models/charge.model";

// get all charge
export const getCharge = async (req, res) => {
  try {
    const charge = await Charge.find();
    res.json({
      success: true,
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
