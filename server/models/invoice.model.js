import mongoose from 'mongoose';

const invoiceSchema = new mongoose.Schema({
    createAt: {
        type: Date,
        default: Date.now
    },
    total: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ['Paid', 'Unpaid'],
        default: 'Unpaid'
    },
    prepaid: {
        type: Number,
        required: true
    },
    arriveDate: {
        type: Date,
        required: true
    },
    departureDate: {
        type: Date,
        required: true
    }
    // user: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'user',
    //     required: true
    // },
    // room: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'room',
    //     required: true
    // },
    // charge: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'charge',
    //     required: true
    // }
});

const Invoice = mongoose.model('invoice', invoiceSchema);

export default Invoice;