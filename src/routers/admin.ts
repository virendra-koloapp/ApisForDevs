import express from "express";
import {
  getAllCategoriesHandler,
  getAllProductsHandler,
  getAllUsersHandler,
} from "../handlers/admin";

const adminRouter = express.Router();

adminRouter.get("/users", getAllUsersHandler);
adminRouter.get("/categories", getAllCategoriesHandler);
adminRouter.get("/products", getAllProductsHandler);

export { adminRouter };
