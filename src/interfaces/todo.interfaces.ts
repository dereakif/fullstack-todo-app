import { ChangeEvent, FormEvent } from "react";

export type TodoInput = {
  title: string;
  description: string;
  isCompleted: boolean;
};

export type Todo = {
  _id: string;
  title: string;
  description: string;
  isCompleted: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type TodoState = {
  loading: boolean;
  data: Todo[];
  error: string;
};

export type isError = {
  isError: string;
};

export type onChangeFunction = (event: ChangeEvent<HTMLInputElement>) => void;

export type onSubmitFunction = (event: FormEvent<HTMLFormElement>) => void;
