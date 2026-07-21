import mongoose from 'mongoose';
import { Contact } from '../models/schema.js';


export const saveContact = async (req, res, next) => {
    try {
        const contactValidated = new Contact(req.body);
        
        if (req.method === 'PUT') {
            await contactValidated.validate({ validateModifiedOnly: true });
        } else {
            await contactValidated.validate();
        }
        
        next(); 
    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({ 
                message: "Validation failed", 
                details: error.message 
            });
        }
        return res.status(500).json({ message: "Internal server error during validation." });
    }
};
