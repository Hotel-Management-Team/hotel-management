import Invoice from "../models/invoice.model";
import Ticket from "../models/ticket.model";
import Room from "../models/room.model";
import Customer from "../models/customer.model";

export const getInvoicePaid = async (req, res) => {
  const invoices = await Invoice.find({ status: "Paid" })
    .populate("ticket")
    .populate("ticket.room");
  res.json({
    success: true,
    data: invoices,
    msg: "getInvoicePaid",
  });
};

export const getInvoiceUnPaid = async (req, res) => {
  const invoices = await Invoice.find({ status: "Unpaid" }).populate("ticket");
  const rooms = await Room.find().populate("charge");
  const customers = await Customer.find();
  const data = invoices.map((invoice) => {
    const ticket = invoice.ticket;
    const room = rooms.find(
      (room) => room._id.toString() === ticket.room._id.toString()
    );
    const customer = customers.find(
      (customer) => customer._id.toString() === ticket.customer._id.toString()
    );
    return {
      ...invoice._doc,
      ticket,
      room,
      customer,
    };
  });

  res.json({
    success: true,
    data: data,
    msg: "getInvoiceUnPaid",
  });
};

export const postInvoice = async (req, res) => {
  try {
    const { total, ticket } = req.body;
    const newInvoice = new Invoice({
      total,
      ticket: ticket,
    });
    await newInvoice.save();

    const resTicket = await Ticket.findById(ticket._id)
      .populate("customer")
      .populate("room");

    const resRoom = await Room.findById(resTicket.room).populate("charge");

    const data = {
      _id: newInvoice._id,
      total,
      ticket: resTicket,
      charge: resRoom.charge,
    };

    res.json({
      success: true,
      msg: "Thêm hóa đơn thành công",
      data: data,
    });
  } catch (err) {
    res.json({
      success: false,
      msg: "Thêm hóa đơn thất bại",
      err,
    });
  }
};

export const putInvoice = async (req, res) => {
  console.log(req.body);
  const { _id, total, ticket, prepaid } = req.body;
  try {
    const invoice = await Invoice.findByIdAndUpdate(_id, {
      total,
      ticket,
      prepaid,
    });
    if (!invoice) {
      return res.json({
        success: false,
        msg: "Invoice not found",
      });
    }
    res.json({
      success: true,
      msg: "Cập nhật hóa đơn thành công",
      data: invoice,
    });
  } catch (err) {
    console.log(err);
    res.json({
      success: false,
      msg: "Cập nhật hóa đơn thất bại",
      err,
    });
  }
};
