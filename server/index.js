const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

const authRouter = require('./routes/auth.route');
const roomRouter = require('./routes/room.route');
const invoiceRouter = require('./routes/invoice.route');

// config dotenv
const env = require('dotenv').config();

const mongoose = require('mongoose');
const ConnectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('MongoDB connected...');
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

ConnectDB();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/auth', authRouter);
app.use('/api/room', roomRouter);
app.use('/api/invoice', invoiceRouter);


app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});