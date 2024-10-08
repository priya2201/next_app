import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { userRoute } from "./userRoute";
import cors from "cors";
dotenv.config();

const app = express();
const PORT = 3002;

// Middleware to parse JSON
app.use(express.json());
app.use(cors());
// Sample route
app.get("/", (req: Request, res: Response) => {
  res.send("Hello, world!");
});
app.use("/api/user", userRoute);
// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});
async function start() {
  await mongoose.connect("mongodb://localhost:27017/training_next");
  console.log("mongodb connected");
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}
start();
