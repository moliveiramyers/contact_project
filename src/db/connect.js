import mongoose from 'mongoose';
import dotenv from 'dotenv';

import dns from 'dns';

dns.setServers(['8.8.8.8']);

dotenv.config();

let isConnected = false;
// secret that connects to db
const uri = process.env.MONGODB_URI;

// connect to database
export const connectDB = async () => {
    if (isConnected) {
        return
    }
    try {
        const db = await mongoose.client.connect(uri);
        console.log('Connected to dabase successfully');
        isConnected = db.connection[0].readyState;

    } catch (error) {
        console.log(error);
    }

};


const getDB = () => {
    if (!isConnected) {
        throw new Error("Database not initialized. Call connectDB first.");   
    }
    return mongoose.connection.db;
}

export { connectDB, getDB };
