import Ticket from "../models/ticket.model";
import Room from "../models/room.model";
import Charge from "../models/charge.model";

export const getBooking = async (req, res) => {
  const results = new Array();
  try {
    // ID ticket, Customer Name, Room Name, Start Date, Hours, Status, Price
    const ticket = await Ticket.find().populate("room").populate("customer");
    //console.log(ticket);
    for (let i = 0; i < ticket.length; i++) {
      const room = await Room.findById(ticket[i].room);
      const charge = await Charge.findById(room.charge);
      let startDate = new Date(ticket[i].startDate);
      // format date to dd/mm/yyyy
      let date = startDate.getDate();
      let month = startDate.getMonth() + 1;
      let year = startDate.getFullYear();
      let hours = startDate.getHours();
      let minutes = startDate.getMinutes();
      let seconds = startDate.getSeconds();
      let formattedDate = date + "/" + month + "/" + year;
      let formattedTime = hours + ":" + minutes + ":" + seconds;

      results.push({
        id: ticket[i]._id,
        customerName: ticket[i].customer.name,
        roomName: room.name,
        startDate: formattedDate + " " + formattedTime,
        price: JSON.parse(JSON.stringify(charge)).FirstBlockCharge,
      });
    }
    res.json({
      success: true,
      data: results,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

export const getBookingByBlock = async (req, res) => {
  try {
    //   available room
    const result = await Room.find({ status: "Available" })
      .populate("roomtype")
      .populate("charge");

    res.json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

export const getWaitingBookings = async (req, res) => {
  try {
    const tickets = await Ticket.find().populate("room").populate("customer");
    const results = tickets.filter((ticket) => {
      return ticket.room.status === "Waiting" && ticket.isSolved === false;
    });
    res.json({
      success: true,
      msg: "getWaitingBookings",
      data: results,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error1");
  }
};

export const getUsingBookings = async (req, res) => {
  try {
    const tickets = await Ticket.find().populate("room").populate("customer");
    const results = tickets.filter((ticket) => {
      return ticket.room.status === "Using" && ticket.isSolved === false;
    });
    res.json({
      success: true,
      msg: "getUsingBookings",
      data: results,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error1");
  }
};

export const getAvailableBookings = async (req, res) => {
  try {
    const tickets = await Ticket.find().populate("room").populate("customer");
    const results = tickets.filter((ticket) => {
      return ticket.room.status === "Available" && ticket.isSolved === false;
    });
    res.json({
      success: true,
      msg: "getAvailableBookings",
      data: results,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error1");
  }
};

export const getNeedCleanBookings = async (req, res) => {
  try {
    const tickets = await Ticket.find().populate("room").populate("customer");
    const results = tickets.filter((ticket) => {
      return ticket.room.status === "NeedClean" && ticket.isSolved === false;
    });
    res.json({
      success: true,
      msg: "getNeedCleanBookings",
      data: results,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error1");
  }
};
