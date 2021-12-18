import axios from "axios";
import React, { FormEvent, SetStateAction, useEffect, useState } from "react";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import {
  onChangeFunction,
  Todo,
  TodoInput,
} from "../../interfaces/todo.interfaces";
import InputForm from "./InputForm";
import { ListStats } from "./styles";

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
  const [errorForInput, setErrorForInput] = useState("");
  const [completeCount, setCompleteCount] = useState(0);

  useEffect(() => {
    if (todos.length > 0) {
      let completedTodos = todos.filter((todo) => todo.isCompleted === true);
      setCompleteCount(completedTodos.length);
    }
  }, [todos]);

  const handleOnChange: onChangeFunction = (event) => {
    const { value, name } = event.target;
    if (!name) return;
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckBox: onChangeFunction = (event) => {
    const { checked } = event.target;
    setInput((prev) => ({ ...prev, isCompleted: checked }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmiedTitle: string = input.title.trim();
    const trimmiedDescription: string = input.description.trim();
    if (!trimmiedTitle || !trimmiedDescription) {
      setErrorForInput("invalidInput");
    }
    axios
      .post<Todo>("http://localhost:3001/api/todo", { input: "asd" })
      .then((res) => {
        const { data } = res;
        if (data) {
          setTodos((prev) => [...prev, data]);
          setInput(initialTodoInput);
          setErrorForInput("");
        }
      })
      .catch((e) => {
        setErrorForInput(`${e.response.data.message}`);
      });
  };
  return (
    <>
      <InputForm
        errorForInput={errorForInput}
        input={input}
        handleSubmitCreate={handleSubmit}
        handleOnChange={handleOnChange}
        handleCheckBox={handleCheckBox}
      />
      {todos.length > 0 && (
        <ListStats>
          <Row>
            <Col>Total</Col>
            <Col>Complete</Col>
            <Col>Pending</Col>
          </Row>
          <Row>
            <Col>{todos.length}</Col>
            <Col>{completeCount}</Col>
            <Col>{todos.length - completeCount}</Col>
          </Row>
        </ListStats>
      )}
    </>
  );
};

export default TodoForm;
