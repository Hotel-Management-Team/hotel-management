import Ticket from '../models/ticket.model';
import Room from '../models/room.model';
import Charge from '../models/charge.model';

export const getBooking = async (req, res) => {
    const results = new Array();
    try {
        // ID ticket, Customer Name, Room Name, Start Date, Hours, Status, Price
        const ticket = await Ticket.find().populate('room').populate('customer');//.populate('charge');
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
            let formattedDate = date + '/' + month + '/' + year;
            let formattedTime = hours + ':' + minutes + ':' + seconds;

            results.push({
                id: ticket[i]._id,
                customerName: ticket[i].customer.name,
                roomName: room.name,
                startDate: formattedDate + ' ' + formattedTime,
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
