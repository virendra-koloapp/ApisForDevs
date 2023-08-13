import dotenv from "dotenv";
dotenv.config();

import express from "express";
import { logger } from "./utils/logger";
import morgan from "morgan";
import { authRouter } from "./routers/auth";
import { apiErrorHandler } from "./handlers/error-handler";
import { createDatabaseConnection } from "./db";
import { adminRouter } from "./routers/admin";
import { APP_CONFIG } from "./constants";
import { generateMockData } from "./data";
import { productsRouter } from "./routers/products";
import { adminAuthMiddleware } from "./middlewares/admin-auth-middleware";
import { orderRouter } from "./routers/orders";
import { userAuthMiddleware } from "./middlewares/user-auth-middleware";
import { Product } from "./models/product";

const app = express();
app.use(express.json());
app.use(morgan("tiny"));

createDatabaseConnection();

const apiRouter = express.Router();

app.use("/api", apiRouter);

apiRouter.use("/accounts", authRouter);
apiRouter.use("/products", productsRouter);
apiRouter.use("/orders", userAuthMiddleware, orderRouter);

apiRouter.use("/admin", adminAuthMiddleware, adminRouter);

app.use(apiErrorHandler);

app.listen(APP_CONFIG.PORT, () => {
  logger.info(`Express server listening on port ${APP_CONFIG.PORT}`);
  generateMockData();
});

/**
 * 
 * Products Ids
 *  
  'eab3d6aad4c66da43cdfc763',
  'f18addfbe9f95f9a8ef0e07a',
  '5a4ca94f5a7dcefebaefdac7',
  '98e1a4ca3b5fb5bcee899de3',
  '49dbbdc068eeefd6f349b204',
  'd62e64a2d21afb7eb2feccfd',
  '3bcf3c9fab77e2b0ac6c3ecc',
  '8c5dafa0d4faf152cfa2c58a',
  '8b02f4664c44aeb0b5f02bc8',
  'ebeb31aeadc01cd73dddeac0'
 * 
*/
