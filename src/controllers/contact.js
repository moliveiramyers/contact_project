import { getAllContacts, getContactById, addContact, deleteContact, updateContact } from "../modules/contacts.js";

const getContacts = async (req, res) => {
    try {
        const contacts = await getAllContacts();
        res.status(200).json(contacts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getContact = async (req, res) => {
    const id = req.params.id;
    try {
        const contact = await getContactById(id)
        if (!contact) {
            return res.status(404).json({ message: "Contact not found" });
        }

        res.status(200).json(contact);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const addNewContact = async (req, res) => {
    const { firstName, lastName, email, favoriteColor, birthday } = req.body;
    try {
        const newContact = await addContact(firstName, lastName, email, favoriteColor, birthday);
        res.status(201).json(newContact);
    } catch (error) {
        console.log('Error :', error);
        res.status(500).json({ message: error.message || "Error adding contact" });
    }
}

const removeContact = async (req, res) => {
    const id = req.params.id;
    try {
        const deleteCont = await deleteContact(id);
        if (deleteCont.deletedCount > 0) {
            res.status(200).json({ message: "Contact deleted successfully." })
        }
        else {
            res.status(404).json({ message: "Contact not found." });
        }

    } catch (error) {
        console.log('Error :', error);
        res.status(500).json({ message: error.message || "Error deleting contact" });
    }

}

const editContact = async (req, res) => {
    const id = req.params.id;

    const { firstName, lastName, email, favoriteColor, birthday } = req.body;
    const updateData = { firstName, lastName, email, favoriteColor, birthday }
    try {
        const result = await updateContact(id, updateData);
        if (result.modifiedCount > 0) {
            res.status(204).send();
        }
        else {
            res.status(404).json({ message: "Contact not found or no changes made." });
        }
    } catch (error) {
        console.log('Error :', error);
        res.status(500).json({ message: error.message || "Error updating contact" });
    }
}

export { getContacts, getContact, addNewContact, removeContact, editContact }