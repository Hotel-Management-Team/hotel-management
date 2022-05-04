import Room from "../models/room.model";
import Ticket from "../models/ticket.model";

const isWaitingRoom = async (req, res) => {
  try {
    const ticket = await Ticket.find().populate("room");
    const filterRoom = ticket.filter((item) => {
      const today = new Date();
      return (
        item.room.status === "Available" &&
        today.getDate() === item.arrivalDate.getDate() &&
        today.getMonth() === item.arrivalDate.getMonth() &&
        today.getFullYear() === item.arrivalDate.getFullYear()
      );
    });
    // update room status
    const updateRoom = await Room.updateMany(
      { _id: { $in: filterRoom.map((t) => t.room) } },
      { status: "Waiting" }
    )
      .then((result) => {
        console.log("rs", result);
      })
      .catch((err) => {
        console.log("error", err);
      });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

export default isWaitingRoom;
