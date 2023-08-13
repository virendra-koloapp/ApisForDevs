import express from "express";
import {
  createOrderHandler,
  getOrderByIdHandler,
  getOrdersHandler,
} from "../handlers/orders";

// /api/orders;
const orderRouter = express.Router();

// /api/orders
orderRouter.get("/", getOrdersHandler);

// /api/orders/<order-id>
orderRouter.get("/:orderId", getOrderByIdHandler);

orderRouter.post("/", createOrderHandler);

export { orderRouter };
