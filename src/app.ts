import express from "express";
import dotenv from "dotenv";
dotenv.config();
import authRouter from "./features/auth/auth.routes";

const app = express();

app.use(express.json());
app.use("/auth", authRouter);

export default app;
