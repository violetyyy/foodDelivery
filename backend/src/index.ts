import express from "express";
import foodsRouter from "./routes/food.route.js";
import userRoutes from "./routes/user.route.js";
import foodOrderRoutes from "./routes/foodOrder.route.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import categoryRoutes from "./routes/category.route.js";

dotenv.config();
mongoose.connect(process.env.MONGO_URI as string);
mongoose.connect(process.env.MONGO_URI as string);

const server = express();
server.use(express.json());
console.log("first");

server.use("/food", foodsRouter);
server.use("/users", userRoutes);
server.use("/food-order", foodOrderRoutes);
server.use("/categories", categoryRoutes);

server.get("/", (_req, res) => {
  res.send("Hello Dashka");
});

const port = process.env.PORT || 3000;
server.listen(port, () => console.log("server aslaa port:", port));
