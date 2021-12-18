import axios from "axios";
import React, { FormEvent, SetStateAction, useEffect, useState } from "react";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import {
  onChangeFunction,
  Todo,
  TodoInput,
  TodoState,
} from "../../interfaces/todo.interfaces";
import InputForm from "./InputForm";
import { ListStats } from "./styles";

interface Props {
  todoState: TodoState;
  setTodoState: React.Dispatch<SetStateAction<TodoState>>;
}

const initialTodoInput = {
  title: "",
  description: "",
  isCompleted: false,
};
const TodoForm = (props: Props) => {
  const { todoState, setTodoState } = props;
  const [input, setInput] = useState<TodoInput>(initialTodoInput);
  const [errorForInput, setErrorForInput] = useState("");
  const [completeCount, setCompleteCount] = useState(0);

  useEffect(() => {
    if (todoState.data.length > 0) {
      let completedTodos = todoState.data.filter(
        (todo) => todo.isCompleted === true
      );
      setCompleteCount(completedTodos.length);
    }
  }, [todoState.data]);

  useEffect(() => {
    setErrorForInput("");
  }, [input]);

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
    const trimmedTitle: string = input.title.trim();
    const trimmedDescription: string = input.description.trim();
    if (!trimmedTitle || !trimmedDescription) {
      return setErrorForInput("invalidInput");
    }
    setTodoState((prev) => ({ ...prev, loading: true }));
    axios
      .post<Todo>("http://localhost:3001/api/todo", input)
      .then((res) => {
        const { data } = res;
        if (data) {
          setTodoState((prev) => ({ ...prev, data: [...prev.data, data] }));
          setInput(initialTodoInput);
          errorForInput && setErrorForInput("");
        }
      })
      .catch((e) => {
        setErrorForInput(`${e.response.data.message}`);
      })
      .finally(() => {
        setTodoState((prev) => ({ ...prev, loading: false }));
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
      {todoState.data.length > 0 && (
        <ListStats>
          <Row>
            <Col>Total</Col>
            <Col>Complete</Col>
            <Col>Pending</Col>
          </Row>
          <Row>
            <Col>{todoState.data.length}</Col>
            <Col>{completeCount}</Col>
            <Col>{todoState.data.length - completeCount}</Col>
          </Row>
        </ListStats>
      )}
    </>
  );
};

export default TodoForm;
