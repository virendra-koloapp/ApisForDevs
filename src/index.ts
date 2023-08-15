import dotenv from "dotenv";
dotenv.config();
import express from "express";
import morgan from "morgan";
import { APP_CONFIG } from "./constants";
import { generateMockData } from "./data";
import { createDatabaseConnection } from "./db";
import { apiErrorHandler } from "./handlers/error-handler";
import { adminAuthMiddleware } from "./middlewares/admin-auth-middleware";
import { userAuthMiddleware } from "./middlewares/user-auth-middleware";
import { adminRouter } from "./routers/admin";
import { authRouter } from "./routers/auth";
import { orderRouter } from "./routers/orders";
import { productsRouter } from "./routers/products";
import { logger } from "./utils/logger";
import axios from "axios";
import { getProductDataFromHTML } from "./utils/flipkart";
import { Product } from "./models/product";
import { Category } from "./models/category";

const app = express();
app.use(express.json());
app.use(morgan("tiny"));

createDatabaseConnection();

const apiRouter = express.Router();

app.use("/api", apiRouter);

// /api/accounts
apiRouter.use("/accounts", authRouter);
// /api/products
apiRouter.use("/products", productsRouter);
// /api/orders
apiRouter.use("/orders", userAuthMiddleware, orderRouter);
// /api/admin
apiRouter.use("/admin", adminAuthMiddleware, adminRouter);

app.use(apiErrorHandler);

app.listen(APP_CONFIG.PORT, () => {
  logger.info(`Express server listening on port ${APP_CONFIG.PORT}`);
  // generateMockData();
});
