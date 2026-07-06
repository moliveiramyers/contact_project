import express from 'express';
import cors from 'cors';

import { connectDB } from './src/db/connect.js';
import router from './src/routes/contacts.js';

// create App
const app = express();

app.use(cors());
app.use(express.json());

app.use('/contacts',router);

const PORT = process.env.PORT || 3000;


//connect the database
try {
    await connectDB();

} catch (error) {
    console.log(error);
}




app.listen(PORT, () => {
    console.log(`Server running at http://127.0.0.1:${PORT}`)
})
