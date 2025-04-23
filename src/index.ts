import express, { Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();
const PORT = process.env.PORT || 4000;

const app = express();

app.use(express.json());

app.get("/", (_req: Request, res: Response) => {
  res.send(`Hello from TS on port ${PORT}`);
});

app.listen(PORT, () => {
  console.log(`Server listening on PORT ${PORT}`);
});
