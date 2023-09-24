import { Router } from "express";
import { loginHandler, registerHandler } from "../controllers/accounts.js";

const accountRouter = Router();

accountRouter.post("/login", loginHandler);
accountRouter.post("/register", registerHandler);

export { accountRouter };
