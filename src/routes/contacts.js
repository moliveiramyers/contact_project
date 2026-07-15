import { Router } from 'express';
import { getContacts, getContact, addNewContact, removeContact, editContact } from "../controllers/contact.js";

// Creating Router
const router = Router();

router.get('/', getContacts);
router.get('/:id', getContact);
router.post('/', addNewContact);
router.put('/:id', editContact)
router.delete('/:id', removeContact)

export default router;