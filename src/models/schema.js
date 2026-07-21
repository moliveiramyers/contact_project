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
                if (!bday) return true; 
                return bday < new Date();
            },
            message: 'The birthday must be in the past!'
        }
    }
});

export const Contact = mongoose.models.contacts || mongoose.model('contacts', ContactSchema);
