import { MongoClient } from "mongodb";
import mongoose from 'mongoose'
import dotenv from 'dotenv';

import dns from 'dns';

dns.setServers(['8.8.8.8']);

dotenv.config();

const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri);

let db;
// connect to database 
const connectDB = async(req, res)=> {
    try{
        await client.connect();
        console.log('Connected to dabase successfully');

        db = client.db('contactsDB');

        // connect mongoose
        await mongoose.connect(uri, { dbName: 'contactsDB' });
        console.log('✅ Connected to Mongoose successfully');
    } catch (error) {
        console.log(error);
    }

}

const getDB = () => {
    if (!db) {
    throw Error('Db not initialized');
  }
    return db;
}

export { connectDB, getDB };
