import express, { NextFunction, Request, Response } from "express";
import { Todo } from "../models/todo";
import dayjs from "dayjs";

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
      const todoToReturn = await Todo.findById(todo._id);
      return res.status(201).send(todoToReturn);
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
      const todo = await Todo.findOneAndUpdate(
        { _id },
        { $set: { title, description, isCompleted } },
        { new: true }
      );
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
      const result = await Todo.findOneAndDelete({ _id });
      return res.status(201).send(result);
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  "/api/allTodos",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await Todo.updateMany({}, { $set: { isCompleted: true } });
      return res.status(201).send(result);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  "/api/allTodos",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await Todo.deleteMany({});
      return res.status(201).send(result);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/api/todo/:isoDate",
  async (req: Request, res: Response, next: NextFunction) => {
    const isoDate = req.params.isoDate;
    const startDate = dayjs(isoDate).startOf("date").toISOString();
    const endDate = dayjs(isoDate).endOf("date").toISOString();
    try {
      const todos = await Todo.find({
        createdAt: { $gte: startDate, $lt: endDate },
      });
      return res.status(201).send(todos);
    } catch (error) {
      next(error);
    }
  }
);

export { router as todoRouter };
