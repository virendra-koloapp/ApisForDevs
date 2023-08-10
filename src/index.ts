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
