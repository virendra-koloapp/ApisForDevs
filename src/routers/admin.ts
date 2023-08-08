import express from "express";
import { getAllUsersHandler } from "../handlers/admin";

const adminRouter = express.Router();

adminRouter.get("/users", getAllUsersHandler);

export { adminRouter };
