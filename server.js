import express from 'express';
import cors from 'cors';
// create App
const app = express();

app.use(cors());
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running at http://127.0.0.1:${PORT}`)
})
