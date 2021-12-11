import axios from "axios";
import React, {
  ChangeEvent,
  FormEvent,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { isError, Todo } from "../../interfaces/todo.interfaces";
import InputForm from "../TodoForm/InputForm";

interface Props {
  todos: Todo[];
  setTodos: React.Dispatch<SetStateAction<Todo[]>>;
}
const initialTodoInput = {
  title: "",
  description: "",
  _id: "",
  isCompleted: false,
};
const TodoList = (props: Props) => {
  const { todos, setTodos } = props;
  const [selectedTodo, setSelectedTodo] = useState<Todo>(initialTodoInput);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);

  useEffect(() => {
    axios.get("http://localhost:3001/api/todo").then((res) => {
      const { data } = res;
      if (data) {
        setTodos(data);
      }
    });
  }, []);

  const selectTodo = (todoId: string) => {
    const index = todos.findIndex((todo) => todo._id === todoId);
    if (index === -1) {
      return;
    }
    setSelectedIndex(index);
    setSelectedTodo(todos[index]);
  };

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { value, name } = event.target;
    setSelectedTodo((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckBox = (event: ChangeEvent<HTMLInputElement>): void => {
    const { checked } = event.target;
    setSelectedTodo((prev) => ({ ...prev, isCompleted: checked }));
  };
  const handleTodoEdit = (event: FormEvent<HTMLFormElement>): isError => {
    event.preventDefault();
    const trimmiedTitle: string = selectedTodo.title.trim();
    const trimmiedDescription: string = selectedTodo.description.trim();
    if (!trimmiedTitle || !trimmiedDescription) {
      return { isError: "invalidInput" };
    }
    axios
      .put<Todo>("http://localhost:3001/api/todo", selectedTodo)
      .then((res) => {
        console.log({ res });
        const { data } = res;
        if (data) {
          const newTodos = [...todos];
          newTodos[selectedIndex] = data;
          setTodos(newTodos);
          setSelectedTodo(initialTodoInput);
          console.log({ newTodos });
          return { isError: "" };
        }
      });
    return { isError: "noData" };
  };

  if (todos?.length === 0) {
    return <div>There is no list to display...</div>;
  }
  return (
    <div>
      {todos?.map((todo) =>
        todo._id === selectedTodo?._id ? (
          <InputForm
            key={"editing" + todo._id}
            input={selectedTodo}
            handleCheckBox={handleCheckBox}
            handleOnChange={handleOnChange}
            handleSubmitEdit={handleTodoEdit}
          />
        ) : (
          <div key={todo._id}>
            <p style={{ fontWeight: "bold" }}>{todo.title}</p>
            <p>{todo.description}</p>
            <button onClick={() => selectTodo(todo._id)}>edit</button>
          </div>
        )
      )}
    </div>
  );
};

export default TodoList;
