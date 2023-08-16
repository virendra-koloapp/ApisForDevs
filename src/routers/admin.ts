import express from "express";
import {
  getAllCategoriesHandler,
  getAllOrdersHandler,
  getAllProductsHandler,
  getAllUsersHandler,
  importProductFromFlipkartHandler,
  listUrlsOfAPageHandler,
} from "../handlers/admin";

const adminRouter = express.Router();

adminRouter.get("/users", getAllUsersHandler);
adminRouter.get("/categories", getAllCategoriesHandler);
adminRouter.get("/products", getAllProductsHandler);
adminRouter.get("/products/import/flipkart", importProductFromFlipkartHandler);
adminRouter.get("/products/import/list-urls", listUrlsOfAPageHandler);
adminRouter.get("/orders", getAllOrdersHandler);

export { adminRouter };
