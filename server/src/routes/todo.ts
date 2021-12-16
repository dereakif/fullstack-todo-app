import express, { NextFunction, Request, Response } from "express";
import { Todo } from "../models/todo";

const router = express.Router();

router.get(
  "/api/todo",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const todos = await Todo.find({});
      return res.status(201).send(todos);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/api/todo",
  async (req: Request, res: Response, next: NextFunction) => {
    const { title, description, isCompleted } = req.body;
    try {
      const todo = Todo.build({ title, description, isCompleted });
      await todo.save();
      return res.status(201).send(todo);
    } catch (error: unknown) {
      next(error);
    }
  }
);

router.put(
  "/api/todo",
  async (req: Request, res: Response, next: NextFunction) => {
    const { title, description, isCompleted, _id } = req.body;
    try {
      await Todo.updateOne(
        { _id },
        { $set: { title, description, isCompleted } }
      );
      const todo = await Todo.findOne({ _id });
      return res.status(201).send(todo);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  "/api/todo",
  async (req: Request, res: Response, next: NextFunction) => {
    const { _id } = req.body;
    try {
      const result = await Todo.deleteOne({ _id });
      return res.status(201).send(result);
    } catch (error) {
      next(error);
    }
  }
);

export { router as todoRouter };
