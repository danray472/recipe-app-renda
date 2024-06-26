import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { userRouter } from "./routes/user.js";
import { recipesRouter } from "./routes/recipes.js";
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

const app = express();

app.use(express.json());

app.use(cors({
  origin: process.env.FRONTEND_URL, // Your frontend URL
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true, // Allow credentials
  optionsSuccessStatus: 200 // Some legacy browsers choke on 204
}));


app.use("/auth", userRouter);
app.use("/recipes", recipesRouter);

const PORT = process.env.PORT || 3001;

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
