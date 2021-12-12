import axios from "axios";
import React, { ChangeEvent, FormEvent, SetStateAction, useState } from "react";
import { isError, Todo, TodoInput } from "../../interfaces/todo.interfaces";
import InputForm from "./InputForm";

interface Props {
  todos: Todo[];
  setTodos: React.Dispatch<SetStateAction<Todo[]>>;
}

const initialTodoInput = {
  title: "",
  description: "",
  isCompleted: false,
};
const TodoForm = (props: Props) => {
  const { todos, setTodos } = props;
  const [input, setInput] = useState<TodoInput>(initialTodoInput);

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { value, name } = event.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckBox = (event: ChangeEvent<HTMLInputElement>): void => {
    const { checked } = event.target;
    setInput((prev) => ({ ...prev, isCompleted: checked }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): isError => {
    e.preventDefault();
    const trimmiedTitle: string = input.title.trim();
    const trimmiedDescription: string = input.description.trim();
    if (!trimmiedTitle || !trimmiedDescription) {
      return { isError: "invalidInput" };
    }
    axios.post<Todo>("http://localhost:3001/api/todo", input).then((res) => {
      const { data } = res;
      if (data) {
        setTodos((prev) => [...prev, data]);
        setInput(initialTodoInput);
        return { isError: "" };
      }
    });
    return { isError: "noData" };
  };
  return (
    <InputForm
      input={input}
      handleSubmitCreate={handleSubmit}
      handleOnChange={handleOnChange}
      handleCheckBox={handleCheckBox}
    />
  );
};

export default TodoForm;
