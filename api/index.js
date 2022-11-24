import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
const app = express();

dotenv.config();

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected');
        app.emit('DB_CONNECTED');
    }
    catch (err) {
        throw err;
    }
};
connect();

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.on('DB_CONNECTED', () => {
    app.listen(3000, () => {
        console.log('Server is running on port 3000');
    });
});