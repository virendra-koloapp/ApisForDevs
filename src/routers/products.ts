import express from "express";
import { getProductsHandler } from "../handlers/products";

const productsRouter = express.Router();

productsRouter.get("/", getProductsHandler);

export { productsRouter };
