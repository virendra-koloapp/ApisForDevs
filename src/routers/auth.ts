import express from "express";
import { loginHandler, registerHandler } from "../handlers/auth";

const authRouter = express.Router();

authRouter.post("/login", loginHandler);
authRouter.post("/register", registerHandler);

export { authRouter };
