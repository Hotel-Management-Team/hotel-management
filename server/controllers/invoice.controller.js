import Invoice from "../models/invoice.model";
import Ticket from "../models/ticket.model";
import Room from "../models/room.model";

export const getInvoice = async (req, res) => {
  const invoices = await Invoice.find();
  res.json(invoices);
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
