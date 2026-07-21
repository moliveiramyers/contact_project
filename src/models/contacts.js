import { ObjectId } from "mongodb";
import { getDB } from "../db/connect.js";


const getAllContacts = async () => {
    const db = getDB();

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

const addContact = async (firstName, lastName, email, favoriteColor, birthday) => {
    const db = getDB()

    try {
        const result = await db.collection('contacts').insertOne({
            firstName: firstName,
            lastName: lastName,
            email: email,
            favoriteColor: favoriteColor,
            birthday: birthday
        }
        );

        return result;
    } catch (error) {
        console.log("Error adding contact:", error);
    }
};

const deleteContact = async (id) => {
    if (!ObjectId.isValid(id)) {
        throw new Error(`Invalid ID format. ID ${id}`);
    }
    const db = getDB();
    const contacId = new ObjectId(id);
    try {
        const deleteContact = await db.collection('contacts').deleteOne({ _id: contacId });
        return deleteContact;

    } catch (error) {
        console.log("Error deleting contact:", error);
        throw error;
    };

}

const updateContact = async (id, updateData) => {
    if (!ObjectId.isValid(id)) {
        throw new Error(`Invalid ID format. ID: ${id}`);
    }

    const db = getDB();
    const contactId = new ObjectId(id);
    try {
        const result = await db.collection('contacts').updateOne({ _id: contactId },
            { $set: updateData }
        );
        return result;


    } catch (error) {
        console.log('Error updating contact: ', error);
        throw error;
    }

}

export { getAllContacts, getContactById, addContact, deleteContact, updateContact };