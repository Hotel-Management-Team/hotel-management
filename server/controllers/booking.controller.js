import Ticket from '../models/ticket.model';
import Room from '../models/room.model';
import Customer from '../models/customer.model';
import Charge from '../models/charge.model';

export const getBooking = async (req, res) => {
    const results = new Array();
    try {
        // ID ticket, Customer Name, Room Name, Start Date, Hours, Status, Price
        const ticket = await Ticket.find().populate('room').populate('customer');//.populate('charge');
        for (let i = 0; i < ticket.length; i++) {
            const room = await Room.findById(ticket[i].room);
            const charge = await Charge.findById(room.charge);

            results.push({
                ID: ticket[i]._id,
                customerName: ticket[i].customer.name,
                roomName: room.name,
                startDate: ticket[i].startDate,
                price: JSON.parse(JSON.stringify(charge)).FirstBlockCharge,
            });
        }
        res.json({
            success: true,
            data: results
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};
