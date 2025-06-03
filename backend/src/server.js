import express from 'express';
import noteRoutes from "./routes/noteRoutes.js";
import {connectDB} from "./config/db.js";
import dotenv from 'dotenv';
import rateLimiter from './middleware/rateLimiter.js';
import cors from 'cors';
dotenv.config();

const app = express();

app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173",
})
);
app.use(rateLimiter); 
const PORT= process.env.PORT || 5001;
connectDB().then(() => {
    app.use("/api/notes", noteRoutes);
    app.listen(PORT, () =>{
        console.log("Server is running on port 5001!, working fine! ^-^");
    });
});
    
