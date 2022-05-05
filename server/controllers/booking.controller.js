import Ticket from "../models/ticket.model";
import Room from "../models/room.model";
import Charge from "../models/charge.model";
import Invoice from "../models/invoice.model";

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

export const checkinBooking = async (req, res) => {
  const { id } = req.params;
  try {
    const ticket = await Ticket.findById(id)
      .populate("customer")
      .populate("room");
    const room = await Room.findById(ticket.room);
    room.status = "Using";
    await room.save();
    // ticket.isSolved = true;
    await ticket.save();
    res.json({
      success: true,
      msg: `${ticket.customer.name} đã nhận phòng ${room.name} thành công`,
      data: ticket,
    });
  } catch (error) {
    console.error(error.message);
    res.json({
      success: false,
      msg: "Error",
    });
  }
};

export const checkoutBooking = async (req, res) => {
  const { id, total } = req.params;
  try {
    const invoice = await Invoice.findByIdAndUpdate(id, {
      total: total,
      status: "Paid",
    });
    const ticket = await Ticket.findById(invoice.ticket)
      .populate("room")
      .populate("customer");
    const room = await Room.findByIdAndUpdate(ticket.room, {
      status: "NeedClean",
    });
    res.json({
      success: true,
      msg: `${ticket.customer.name} đã thanh toán phòng ${room.name} thành công`,
      data: ticket,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error1");
  }
};

export const cleanRoom = async (req, res) => {
  const { id } = req.params;

  try {
    const ticket = await Ticket.findByIdAndUpdate(id, {
      isSolved: true,
    })
      .populate("room")
      .populate("customer");

    const room = await Room.findByIdAndUpdate(ticket.room, {
      status: "Available",
    });

    res.json({
      success: true,
      msg: `${room.name} đã được dọn thành công`,
      data: ticket,
    });
  } catch (error) {
    console.error("errorr", error.message);
    res.json({
      success: false,
      msg: "Error",
    });
  }
};

export const cancelBooking = async (req, res) => {
  const { id } = req.params;
  try {
    const ticket = await Ticket.findById(id)
      .populate("room")
      .populate("customer");
    const invoice = await Invoice.find({ ticket: id });
    // delete invoice
    await Invoice.findByIdAndDelete(invoice[0]._id);
    // delete  ticket
    await Ticket.findByIdAndDelete(id);
    res.json({
      success: true,
      msg: `${ticket.customer.name} đã hủy lịch đặt phòng ${ticket.room.name} thành công`,
      data: ticket,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error1");
  }
};
