import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";

const app = express();
app.use(express.json());
const port = 3000;

dotenv.config();
app.use(cors());

mongoose
  .connect(process.env.mongodb_url)
  .then(console.log("connected"))
  .catch((error) => console.error(error));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

app.use("/api/auth", authRoutes);


//middleware to catch internal server errors 
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "internal server error";
  return res.status(statusCode).json({
    succes: false,
    message,
    statusCode,
  });
});