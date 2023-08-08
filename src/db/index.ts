import mongoose from "mongoose";
import { logger } from "../utils/logger";

export const createDatabaseConnection = () => {
  mongoose
    .connect("mongodb://127.0.0.1:27017/store")
    .then(() => {
      logger.info("Database connection established");
    })
    .catch(logger.error);
};
