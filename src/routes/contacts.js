import { Router } from 'express';
import { getContacts, getContact, addNewContact, removeContact, editContact } from "../controllers/contact.js";
import { saveContact } from '../middleware/validate.js';

// Creating Router
const router = Router();

router.get('/',getContacts);
router.get('/:id', getContact);
router.post('/', saveContact, addNewContact);
router.put('/:id', saveContact, editContact);
router.delete('/:id', removeContact);

export default router;