const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/auth.middleware');
const Invoice = require('../models/invoice.model');

router.get('/', async (req, res) => {
    try {
        const invoices = await Invoice.find();
        res.json(invoices);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

router.post('/', async (req, res) => {
    console.log(req.body);
    try {
        const { total, status, prepaid, arriveDate, departureDate } = req.body;

        // simple validation
        // if (!total || !status || !prepaid || !arriveDate || !departureDate) {
        //     return res.status(400).json({ msg: 'Please enter all fields' });
        // }

        try {
            const newInvoice = new Invoice({
                total,
                status,
                prepaid,
                arriveDate,
                departureDate,
            });
            await newInvoice.save();
            res.json({
                success: true,
                msg: 'Invoice created successfully',
                data: newInvoice
            });
        } catch (error) {
            console.error(error.message);
            res.status(500).send('Server Error');
        }
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;