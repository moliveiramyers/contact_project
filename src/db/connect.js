import { MongoClient } from "mongodb";

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
        
    } catch (error) {
        console.log(error);
    }

}

const getDB =  () => {
    return db;
}

export { connectDB, getDB };
