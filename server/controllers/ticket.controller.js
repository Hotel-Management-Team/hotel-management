import Ticket from "../models/ticket.model";
import Room from "../models/room.model";

export const getTicket = async (req, res) => {
    const tickets = await Ticket.find();
    console.log(tickets);
    res.json(tickets);
};

export const postTicket = async (req, res) => {
    const { user, room, charge } = req.body;
    // save rentTicket and change status of room
    const ticket = new Ticket({
        user,
        room,
        charge
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
