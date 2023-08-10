import express from "express";
import { getCategoriesHandler, getProductsHandler } from "../handlers/products";

const productsRouter = express.Router();

productsRouter.get("/", getProductsHandler);
productsRouter.get("/categories", getCategoriesHandler);

export { productsRouter };
