import Ticket from "../models/ticket.model";
import Room from "../models/room.model";
import Charge from "../models/charge.model";
import Customer from "../models/customer.model";

export const getTicket = async (req, res) => {
    const tickets = await Ticket.find();
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
    };
    res.json(results);
};

export const getTicketList = async (req, res) => {
    const { room, startDate } = req.body;
    // switch startDate from 2016-05-18T16:00:00Z  to 18/05/2016

    const tickets = await Ticket.find({ room, startDate });
    const results = new Array();

    for (let i = 0; i < tickets.length; i++) {
        const customer = await Customer.findById(tickets[i].customer);
        results.push(customer);
    };
    res.json(results);
};

export const postTicket = async (req, res) => {
    const { customer, room } = req.body;
    // check if room is available and charge is valid
    const roomAvailable = await Room.findById(room);
    if (!roomAvailable) {
        return res.status(400).json({
            message: "Room is not available"
        });
    }
    // save rentTicket and change status of room
    const ticket = new Ticket({
        customer,
        room
    });
    await ticket.save();
    const updatedRoom = await Room.findByIdAndUpdate(room, { status: "Booked" });
    await updatedRoom.save();
    res.json({
        success: true,
        status: "Rent ticket saved",
    });

};

export const putTicket = async (req, res) => {

};

export const deleteTicket = async (req, res) => {
    console.log(req.params.id);
    try {
        const ticket = await Ticket.findOneAndDelete({ _id: req.params.id });
        if (!ticket) {
            return res.status(404).json({
                success: false,
                msg: 'Ticket not found'
            });
        }
        res.json({
            success: true,
            msg: 'Ticket deleted successfully',
            data: ticket
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};
