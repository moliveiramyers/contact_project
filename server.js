import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';

import { connectDB } from './src/db/connect.js';
import router from './src/routes/contacts.js';

import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const swaggerDocument = require('./swagger.json')

// create App
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


app.use('/contacts',router);

const PORT = process.env.PORT || 3000;


//connect the database
try {
    await connectDB();
} catch (error) {
    console.log(error);
}


app.get("/", (req, res) => {
    res.send("Contacts API is running!");
});

app.listen(PORT, () => {
    console.log(`Server running at http://127.0.0.1:${PORT}`)
})
