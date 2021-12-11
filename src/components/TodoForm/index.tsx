import axios from "axios";
import React, {
  ChangeEvent,
  SetStateAction,
  SyntheticEvent,
  useState,
} from "react";
import { Todo, TodoInput } from "../../interfaces/todo.interfaces";

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

  const handleSubmit = (e: SyntheticEvent): void => {
    e.preventDefault();
    const trimmiedTitle: string = input.title.trim();
    const trimmiedDescription: string = input.description.trim();
    if (!trimmiedTitle || !trimmiedDescription) {
      return;
    }
    axios.post<Todo>("http://localhost:3001/api/todo", input).then((res) => {
      const { data } = res;
      if (data) {
        setTodos((prev) => [...prev, data]);
      }
    });
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="todo title"
          name="title"
          type="text"
          onChange={handleOnChange}
        />
        <input
          placeholder="todo description"
          name="description"
          type="text"
          onChange={handleOnChange}
        />
        <input name="isCompleted" type="checkbox" onChange={handleCheckBox} />
        <button type="submit">submit</button>
      </form>
    </div>
  );
};

export default TodoForm;
