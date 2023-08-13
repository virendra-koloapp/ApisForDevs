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

import axios from "axios";

const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const url =
  "https://www.flipkart.com/samsung-galaxy-s21-fe-5g-olive-green-128-gb/p/itm56c2ef5daa932?pid=MOBGCKMEMZE5UJXK&lid=LSTMOBGCKMEMZE5UJXK6LPNPI&marketplace=FLIPKART&store=tyy%2F4io&srno=b_1_1&otracker=hp_omu_Top%2BOffers_2_4.dealCard.OMU_6JL4CP46FWFG_3&otracker1=hp_omu_PINNED_neo%2Fmerchandising_Top%2BOffers_NA_dealCard_cc_2_NA_view-all_3&fm=neo%2Fmerchandising&iid=6ed42b0b-e249-4d7b-b120-179db4c5642d.MOBGCKMEMZE5UJXK.SEARCH&ppt=hp&ppn=homepage&ssid=gh3j1det9s0000001691946001272";

// axios.get(url).then((response) => {
//   const dom = new JSDOM(response.data);
//   const schema = dom.window.document.querySelectorAll(
//     "script[type='application/ld+json']"
//   )[1].innerHTML;

//   console.log(JSON.parse(schema));
// });

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
