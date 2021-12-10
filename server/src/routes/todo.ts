import express, { Request, Response } from "express";
import { Todo } from "../models/todo";

const router = express.Router();

router.get("/api/todo", async (req: Request, res: Response) => {
  const todos = await Todo.find({});
  return res.status(201).send(todos);
});

router.post("/api/todo", async (req: Request, res: Response) => {
  const { title, description, isCompleted } = req.body;
  const todo = Todo.build({ title, description, isCompleted });
  await todo.save();
  return res.status(201).send(todo);
});

export { router as todoRouter };
