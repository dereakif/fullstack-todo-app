import React, { SetStateAction } from "react";
import { TodoInput } from "../../interfaces/todo.interfaces";

interface Props {
  todos: TodoInput[];
  setTodos: React.Dispatch<SetStateAction<TodoInput[]>>;
}

const TodoList = (props: Props) => {
  const { todos, setTodos } = props;
  if (todos.length === 0) {
    return <div>There is no list to display...</div>;
  }
  return <div>TodoList</div>;
};

export default TodoList;
