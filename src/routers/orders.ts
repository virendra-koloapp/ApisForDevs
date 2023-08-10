import express from "express";
import { getOrdersHandler } from "../handlers/orders";

const orderRouter = express.Router();

orderRouter.get("/", getOrdersHandler);

export { orderRouter };
