import express from 'express';
import router from './router/route.js'; 
import morgan from 'morgan';
import cors from 'cors';
import { config } from 'dotenv';
import connect from './database/conn.js';
// Load environment variables
config();

const app = express();

// Middleware
app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());

// App port
const port = process.env.PORT || 8080;


// Route
app.use('/api', router);

app.get('/', (req, res) => {
    try {
        res.json("GET request");
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/** start server */
connect().then(() => {
    try {
        app.listen(port, () => {
            console.log(`Server is connected to http://localhost:${port}`);
        });
    } catch(error) {
        console.log(" Cant connect to the server");
        process.exit(1);
    }
}).catch(error => {console.log("Invalid db connection")});

