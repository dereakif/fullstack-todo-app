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
};

export type isError = {
  isError: string;
};
