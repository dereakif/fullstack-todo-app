import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { json } from "body-parser";
import { todoRouter } from "./routes/todo";
import middlewares from "./middlewares";

const app = express();

app.use(json());
app.use(cors());
app.use(todoRouter);

app.use(middlewares.errorHandler);

mongoose.connect("mongodb://localhost:27017/todo", () => {
  console.log("connected to database");
});

app.listen(3001, () => {
  console.log("server is running on port 3001");
});
