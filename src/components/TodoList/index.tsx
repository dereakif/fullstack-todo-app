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

  const deleteTodo = (todoId: string) => {
    const index = todos.findIndex((todo) => todo._id === todoId);
    if (index === -1) {
      return;
    }
    axios
      .delete("http://localhost:3001/api/todo", { data: { _id: todoId } })
      .then((res) => {
        const { data } = res;
        if (data.deletedCount) {
          const newTodos = todos.filter((todo) => todo._id !== todoId);
          setTodos(newTodos);
        }
      });
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
    axios.put("http://localhost:3001/api/todo", selectedTodo).then((res) => {
      const { data } = res;
      if (data) {
        const newTodos = [...todos];
        newTodos[selectedIndex] = data;
        setTodos(newTodos);
        setSelectedTodo(initialTodoInput);
        return { isError: "" };
      }
    });
    return { isError: "noData" };
  };

  if (todos?.length === 0) {
    return <div>There is no list to display...</div>;
  }
  return (
    <div style={{ marginTop: "2rem" }}>
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
          <div style={{ display: "flex" }} key={todo._id}>
            <div
              style={{
                display: "flex",
                textDecorationLine: todo.isCompleted ? "line-through" : "none",
              }}
            >
              <p
                style={{
                  marginBottom: "0px",
                  fontWeight: "bold",
                }}
              >
                {todo.title}
              </p>
              <p
                style={{
                  marginLeft: "1rem",
                  marginBottom: "0px",
                }}
              >
                {todo.description}
              </p>
            </div>
            <div style={{ display: "flex" }}>
              <button
                style={{ marginLeft: "1rem" }}
                onClick={() => selectTodo(todo._id)}
              >
                edit
              </button>
              <button
                style={{ marginLeft: "1rem" }}
                onClick={() => deleteTodo(todo._id)}
              >
                delete
              </button>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default TodoList;
