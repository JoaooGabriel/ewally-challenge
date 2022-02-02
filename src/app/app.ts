import "dotenv/config";
import express, { Request, Response } from "express";

export const app = express();

app.use(express.json());
app.get("/", (request: Request, response: Response) => {
  return response.status(200).json({ message: "Hello world" });
});
