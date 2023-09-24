import { Router } from "express";
import { getAllUserHandler } from "../controllers/admin.js";

const adminRouter = Router();

adminRouter.get("/users", getAllUserHandler);

export { adminRouter };
