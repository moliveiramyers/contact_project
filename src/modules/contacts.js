import { ObjectId } from "mongodb";
import { getDB } from "../db/connect.js";


const getAllContacts = async () => {
    const db =  getDB();

    const contacts = await db.collection('contacts').find({}).toArray();
    return contacts;
}

const getContactById = async (id) => {
    if (!ObjectId.isValid(id)) {
        throw new Error(`Invalid ID format. ID ${id}`);
    }

    const db = getDB();
    const contactId = new ObjectId(id);
    const contacts = await db.collection('contacts').findOne({ _id: contactId });
    return contacts;
};

export { getAllContacts, getContactById };