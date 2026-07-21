import { ObjectId } from "mongodb";
import { getDB } from "../db/connect.js";
import mongoose from 'mongoose';

const ContactSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'First name is required'],
        trim: true
    },
    lastName: {
        type: String,
        required: [true, 'Last name is required'],
        trim: true
    },
    email: {
        type: String,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Enter a valid email address!']
    },
    favoriteColor: {
        type: String,
        required: false
    },
    birthday: {
        type: Date,
        required: false,
        validate: {
            validator: function (bday) {
                if (!bday) return true; // if the field is empty
                return bday < new Date();
            },
            message: 'The birthday must be in the past!'
        }
    }


})

const Contact = mongoose.models.contacts || mongoose.model('contacts', ContactSchema);

const getAllContacts = async () => {
    const db = getDB();

    try {
        const contacts = await db.collection('contacts').find({}).toArray();
        return contacts;
    } catch (error) {
        console.log('Error retrieving contacts', error);
        throw error;
    }
}

const getContactById = async (id) => {


    try {
        if (!ObjectId.isValid(id)) {
            throw new Error(`Invalid ID format. ID ${id}`);
        }

        const db = getDB();
        const contactId = new ObjectId(id);
        const contact = await db.collection('contacts').findOne({ _id: contactId });
        if (!contact) {
            throw new Error(`Contact not found with ID: ${id}`);
        }
        return contact;

    } catch (error) {
        console.error("Error in getContactById:", error.message);
        throw error;
    }
};

const addContact = async (firstName, lastName, email, favoriteColor, birthday) => {

    const contactValidated = new Contact({
        firstName,
        lastName,
        email,
        favoriteColor,
        birthday: birthday ? new Date(birthday) : undefined
    })

    await contactValidated.validate();
    const db = getDB()

    try {
        const result = await db.collection('contacts').insertOne({
            firstName,
            lastName,
            email,
            favoriteColor,
            birthday: birthday ? new Date(birthday) : undefined
        }
        );

        return result;
    } catch (error) {
        console.error('Database error in addContact:', error);
        throw error;
    };
}

    const deleteContact = async (id) => {

        try {
            if (!ObjectId.isValid(id)) {
                throw new Error(`Invalid ID format. ID ${id}`);
            }
            const db = getDB();
            const contacId = new ObjectId(id);

            // delete contact
            const result = await db.collection('contacts').deleteOne({ _id: contacId });
            // If contact is not found 
            if (result.deletedCount === 0) {
                throw new Error(`No contact found to delete with ID: ${id}`);
            }


            return result;

        } catch (error) {
            console.error("Error in deleteContact:", error.message);
            throw error;
        };

    }



    const updateContact = async (id, updateData) => {
        if (!ObjectId.isValid(id)) {
            throw new Error(`Invalid ID format. ID: ${id}`);
        }

        const fieldsToUpdate = {}

        if (updateData.firstName !== undefined) fieldsToUpdate.firstName = updateData.firstName;
        if (updateData.lastName !== undefined) fieldsToUpdate.lastName = updateData.lastName;
        if (updateData.email !== undefined) fieldsToUpdate.email = updateData.email;
        if (updateData.birthday !== undefined) {
            fieldsToUpdate.birthday = updateData.birthday ? new Date(updateData.birthday) : undefined;
        }
        // check that the new inputs are valid
        const temporaryValidator = new Contact(fieldsToUpdate);
        await temporaryValidator.validate({ pathsToValidate: Object.keys(fieldsToUpdate) });


        const db = getDB();
        const contactId = new ObjectId(id);
        try {
            const result = await db.collection('contacts').updateOne(
                { _id: contactId },
                { $set: updateData }
            );
            return result;

        } catch (error) {
            console.error('Database error in updateContact:', error);
            throw error;
        }


        }

        export { getAllContacts, getContactById, addContact, deleteContact, updateContact };