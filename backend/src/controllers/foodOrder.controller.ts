import { Request, Response } from "express";
import { FoodOrder } from "../models/foodOrder.model";
import { Food } from "../models/food.model";

export const getAllOrders = async (_req: Request, res: Response) => {
  try {
    const orders = await FoodOrder.find()
      .populate("user")
      .populate("foodOrderItems.food");
    res.json({ success: true, data: orders });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
};

export const createOrder = async (req: Request, res: Response) => {
  const { user, foodOrderItems } = req.body;
  try {
    let totalPrice = 0;
    for (const item of foodOrderItems) {
      const food = await Food.findById(item.food);
      if (food) {
        totalPrice += food.price * item.quantity;
      }
    }
    const order = await FoodOrder.create({
      user,
      foodOrderItems,
      totalPrice,
    });
    res.status(201).json({ success: true, data: order });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
};

export const getOrdersByUser = async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    const orders = await FoodOrder.find({ user: userId }).populate(
      "foodOrderItems.food"
    );
    res.json({ success: true, data: orders });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
};

export const updateOrderStatus = async (req: Request, res: Response) => {
  const { orderId } = req.params;
  const { status } = req.body;
  try {
    const order = await FoodOrder.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );
    res.json({ success: true, data: order });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
};
