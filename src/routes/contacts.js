import express from 'express';
import { getContacts, getContact } from "../controllers/contact.js";

// Creating Router
const router = express.Router();

router.get('/', getContacts);
router.get('/:id', getContact);

export default router;