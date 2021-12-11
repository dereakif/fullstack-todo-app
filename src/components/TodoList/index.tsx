import axios from "axios";
import React, { SetStateAction, useEffect } from "react";
import { Todo } from "../../interfaces/todo.interfaces";

interface Props {
  todos: Todo[];
  setTodos: React.Dispatch<SetStateAction<Todo[]>>;
}

const TodoList = (props: Props) => {
  const { todos, setTodos } = props;

  useEffect(() => {
    axios.get("http://localhost:3001/api/todo").then((res) => {
      const { data } = res;
      if (data) {
        setTodos(data);
      }
    });
  }, []);

  if (todos?.length === 0) {
    return <div>There is no list to display...</div>;
  }
  return (
    <div>
      {todos?.map((todo) => (
        <div key={todo._id}>
          <p style={{ fontWeight: "bold" }}>{todo.title}</p>
          <p>{todo.description}</p>
        </div>
      ))}
    </div>
  );
};

export default TodoList;
