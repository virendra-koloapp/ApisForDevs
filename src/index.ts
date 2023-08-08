import express from "express";
import dotenv from "dotenv";
import { logger } from "./utils/logger";
import morgan from "morgan";
import { authRouter } from "./routers/auth";

dotenv.config();

const app = express();
app.use(express.json());
app.use(morgan("tiny"));

app.use("/accounts", authRouter);

app.listen(process.env.PORT, () => {
  logger.info(`Express server listening on port ${process.env.PORT}`);
});
