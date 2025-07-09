import express from "express";
import foodsRouter from "./routes/food.route";
import userRoutes from "./routes/user.route";
import foodOrderRoutes from "./routes/foodOrder.route";
import mongoose from "mongoose";
import dotenv from "dotenv";
import categoryRoutes from "./routes/category.route";
import cors from "cors";

dotenv.config();
mongoose.connect(process.env.MONGO_URI as string);

const server = express();

server.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
server.use(express.json());
server.use("/food", foodsRouter);
server.use("/users", userRoutes);
server.use("/food-order", foodOrderRoutes);
server.use("/categories", categoryRoutes);

server.get("/", (_req, res) => {
  res.send("Hello Dashka");
});

const port = process.env.PORT || 8000;
server.listen(port, () => console.log("server aslaa port:", port));
