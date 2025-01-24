import express from 'express';
const app = express();
import connectDB from './config/db.config';
import authRoutes from './routes/auth';
import taskRoutes from './routes/task';
const cors = require('cors');
import cookieParser from "cookie-parser";

require("dotenv").config();
const PORT = process.env.PORT || 3000;

app.use(express.json())
app.use(
  cors({
    origin: ["http://localhost:5173", "https://task-mate-s.vercel.app"],
    credentials: true,
  })
);
app.use(cookieParser());

app.use('/auth',authRoutes);
app.use('/task',taskRoutes);

app.listen(PORT, ()=>{
    connectDB();
    console.log(`Server started on port:${PORT}`);
});