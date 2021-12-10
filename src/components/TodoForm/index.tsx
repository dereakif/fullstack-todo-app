import React, {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { TodoInput } from "../../interfaces/todo.interfaces";

interface Props {
  todos: TodoInput[];
  setTodos: React.Dispatch<SetStateAction<TodoInput[]>>;
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

  return (
    <div>
      <form>
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
