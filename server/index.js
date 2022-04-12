const express = require('express');
const app = express();
const authRouter = require('./routes/auth');
const roomsRouter = require('./routes/rooms');
const cors = require('cors');

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

app.use(cors());

app.use(express.json());
app.use('/api/auth', authRouter);
app.use('/api/rooms', roomsRouter);


app.get('/', (req, res) => {
  res.send('Hello World!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
    }
);