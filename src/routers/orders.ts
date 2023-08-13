import express from "express";
import { createOrderHandler, getOrdersHandler } from "../handlers/orders";

const orderRouter = express.Router();

orderRouter.get("/", getOrdersHandler);
orderRouter.post("/", createOrderHandler);

export { orderRouter };
