import { getAllContacts, getContactById } from "../modules/contacts.js";

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

export {getContacts, getContact}