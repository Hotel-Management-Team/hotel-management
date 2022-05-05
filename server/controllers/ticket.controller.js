import Ticket from "../models/ticket.model";
import Room from "../models/room.model";
import Charge from "../models/charge.model";
import Customer from "../models/customer.model";

export const getTicket = async (req, res) => {
  const tickets = await Ticket.find({ isSolved: false });
  const results = new Array();

  for (let i = 0; i < tickets.length; i++) {
    const room = await Room.findById(tickets[i].room);
    const charge = await Charge.findById(room.charge);
    const customer = await Customer.findById(tickets[i].customer);

    results.push({
      roomName: room.name,
      customerName: customer.name,
      customerPhone: customer.phone,
      customerType: customer.type,
      customerID: customer.ID,
      customerAddress: customer.address,
      startDate: tickets[i].startDate,
    });
  }
  res.json(results);
};

export const getTicketList = async (req, res) => {
  const { room, startDate } = req.body;
  // switch startDate from 2016-05-18T16:00:00Z  to 18/05/2016

  const tickets = await Ticket.find({ room, startDate, isSolved: false });
  const results = new Array();

  for (let i = 0; i < tickets.length; i++) {
    const customer = await Customer.findById(tickets[i].customer);
    results.push(customer);
  }
  res.json(results);
};

export const postTicket = async (req, res) => {
  const { customerId, roomId, arrivalDate, departureDate } = req.body;

  const roomAvailable = await Room.findById(roomId);
  if (!roomAvailable) {
    return res.json({
      success: false,
      message: "Phòng không tồn tại",
    });
  }

  const newTicket = new Ticket({
    customer: customerId,
    room: roomId,
    arrivalDate,
    departureDate,
  });
  await newTicket.save();
  const startDate = new Date(arrivalDate);
  const endDate = new Date(departureDate);
  //   console.log(typeof startDate);
  const today = new Date();
  const updateStatus =
    startDate.getDate() === endDate.getDate() &&
    startDate.getMonth() === endDate.getMonth() &&
    startDate.getFullYear() === endDate.getFullYear()
      ? "Using"
      : today.getDate() === startDate.getDate() &&
        today.getMonth() === startDate.getMonth() &&
        today.getFullYear() === startDate.getFullYear()
      ? "Waiting"
      : "Available";

  const updatedRoom = await Room.findByIdAndUpdate(roomId, {
    status: updateStatus,
  });

  await updatedRoom.save();
  res.json({
    success: true,
    msg: "Đặt phòng thành công",
    data: newTicket,
  });
};

export const putTicket = async (req, res) => {};

export const deleteTicket = async (req, res) => {
  console.log(req.params.id);
  try {
    const ticket = await Ticket.findOneAndDelete({ _id: req.params.id });
    if (!ticket) {
      return res.status(404).json({
        success: false,
        msg: "Ticket not found",
      });
    }
    res.json({
      success: true,
      msg: "Ticket deleted successfully",
      data: ticket,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};
