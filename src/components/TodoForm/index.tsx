import React, { useState } from "react";
import { TodoInput } from "../../interfaces/todo.interfaces";

interface Props {}

const initialTodoInput = {
  title: "",
  description: "",
  isCompleted: false,
};
const TodoForm = (props: Props) => {
  const [todos, setTodos] = useState<TodoInput[]>([]);
  const [input, setInput] = useState<TodoInput>(initialTodoInput);
  return (
    <div>
      <form>
        <input placeholder="todo title" name="title" type="text" />
        <input placeholder="todo description" name="description" type="text" />
        <button type="submit">submit</button>
      </form>
    </div>
  );
};

export default TodoForm;
