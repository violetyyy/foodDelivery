import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDb } from "./config/db.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import {
  foodRouter,
  foodCategoryRouter,
  foodOrderRouter,
  userRouter,
} from "./routes/index.js";

dotenv.config();
connectDb();

const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' }));

app.use("/food", foodRouter);
app.use("/food-category", foodCategoryRouter);
app.use("/food-order", foodOrderRouter);
app.use("/auth", userRouter);

app.use(errorHandler);
export default app;
