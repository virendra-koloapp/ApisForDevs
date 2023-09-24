import express from "express";
import dotenv from "dotenv";
import { setupDBFolder } from "./db/index.js";
import { accountRouter } from "./routers/accounts.js";
import { userRouter } from "./routers/users.js";
import { orderRouter } from "./routers/orders.js";
import { adminRouter } from "./routers/admin.js";
setupDBFolder();
dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.get("/", (req, res) => {
    res.send("Express + TypeScript Server");
});
app.use("/api/accounts", accountRouter);
app.use("/api/orders", orderRouter);
app.use("/api/users", userRouter);
app.use("/api/admin", adminRouter);
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
