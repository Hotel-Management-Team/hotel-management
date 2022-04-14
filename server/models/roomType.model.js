import mongoose from "mongoose";

const roomTypeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        default: 'None'
    },
});

const RoomType = mongoose.model('RoomType', roomTypeSchema);

export default RoomType;
