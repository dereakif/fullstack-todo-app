import React, { SetStateAction, useCallback, useEffect, useState } from "react";
import axios from "axios";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  onChangeFunction,
  onSubmitFunction,
  Todo,
  TodoState,
} from "../../interfaces/todo.interfaces";
import InputForm from "../TodoForm/InputForm";
import { StyledTodoList, TitleContainer, TodoContainer } from "./styles";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import { timeAgo } from "../../modules/dates";
import Loading from "../Loading";

interface Props {
  todoState: TodoState;
  setTodoState: React.Dispatch<SetStateAction<TodoState>>;
}
const initialTodoInput = {
  title: "",
  description: "",
  _id: "",
  isCompleted: false,
  createdAt: new Date(),
  updatedAt: new Date(),
};
const TodoList = (props: Props) => {
  const { todoState, setTodoState } = props;
  const [selectedTodo, setSelectedTodo] = useState<Todo>(initialTodoInput);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);

  const fetchTodos = useCallback(() => {
    setTodoState((prev) => ({ ...prev, loading: true }));
    axios
      .get("http://localhost:3001/api/todo")
      .then((res) => {
        const { data } = res;
        if (data) {
          setTodoState((prev) => ({ ...prev, data }));
        }
      })
      .finally(() => {
        setTodoState((prev) => ({ ...prev, loading: false }));
      });
  }, [setTodoState]);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const selectTodo = (todoId: string) => {
    const index = todoState.data.findIndex((todo) => todo._id === todoId);
    if (index === -1) {
      return;
    }
    setSelectedIndex(index);
    setSelectedTodo(todoState.data[index]);
  };

  const deleteTodo = (todoId: string) => {
    const index = todoState.data.findIndex((todo) => todo._id === todoId);
    if (index === -1) {
      return setTodoState((prev) => ({ ...prev, error: "notFound" }));
    }
    setTodoState((prev) => ({ ...prev, loading: true }));
    axios
      .delete("http://localhost:3001/api/todo", { data: { _id: todoId } })
      .then((res) => {
        const { data } = res;
        if (data) {
          const newTodos = todoState.data.filter((todo) => todo._id !== todoId);
          setTodoState((prev) => ({ ...prev, data: newTodos }));
        }
      })
      .finally(() => {
        setTodoState((prev) => ({ ...prev, loading: false }));
      });
  };

  const handleOnChange: onChangeFunction = (event) => {
    const { value, name } = event.currentTarget;
    if (!name) return;
    setSelectedTodo((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckBox: onChangeFunction = (event) => {
    const { checked } = event.target;
    setSelectedTodo((prev) => ({ ...prev, isCompleted: checked }));
  };
  const handleTodoEdit: onSubmitFunction = (event) => {
    event.preventDefault();
    const trimmiedTitle: string = selectedTodo.title.trim();
    const trimmiedDescription: string = selectedTodo.description.trim();
    if (!trimmiedTitle || !trimmiedDescription) {
      return setTodoState((prev) => ({ ...prev, error: "invalidInput" }));
    }
    setTodoState((prev) => ({ ...prev, loading: true }));
    axios
      .put("http://localhost:3001/api/todo", {
        ...selectedTodo,
      })
      .then((res) => {
        const { data } = res;
        if (data) {
          const newTodos = [...todoState.data];
          newTodos[selectedIndex] = data;
          setTodoState((prev) => ({ ...prev, data: newTodos, error: "" }));
          setSelectedTodo(initialTodoInput);
        }
      })
      .catch((e) => {
        setTodoState((prev) => ({ ...prev, error: e.response.data.message }));
      })
      .finally(() => {
        setTodoState((prev) => ({ ...prev, loading: false }));
      });
  };

  const handleCloseEditor = () => {
    setSelectedTodo(initialTodoInput);
  };

  if (todoState.data?.length === 0) {
    return <div>There is no list to display...</div>;
  }

  if (todoState.loading) {
    return <Loading />;
  }

  return (
    <StyledTodoList>
      {todoState.data?.map((todo, index) =>
        todo._id === selectedTodo?._id ? (
          <InputForm
            index={index}
            key={"editing" + todo._id}
            input={selectedTodo}
            handleCheckBox={handleCheckBox}
            handleOnChange={handleOnChange}
            handleSubmitEdit={handleTodoEdit}
            handleCloseEditor={handleCloseEditor}
          />
        ) : (
          <TodoContainer key={todo._id}>
            <TitleContainer
              style={{
                textDecorationLine: todo.isCompleted ? "line-through" : "none",
              }}
            >
              <Row>
                <Col xs={11}>
                  <p className="title">{todo.title}</p>
                </Col>
                <Col xs={1}>
                  <FontAwesomeIcon
                    icon={faEdit}
                    onClick={() => selectTodo(todo._id)}
                  />
                </Col>
              </Row>
              <Row>
                <Col xs={11}>
                  <p className="description">{todo.description}</p>
                </Col>
                <Col xs={1}>
                  <FontAwesomeIcon
                    icon={faTrashAlt}
                    onClick={() => deleteTodo(todo._id)}
                  />
                </Col>
              </Row>
              <Row className="mt-3 fst-italic fs-6 fw-light">
                <Col xs={6}>
                  <p className="mt-4">Created: {timeAgo(todo.createdAt)}</p>
                </Col>
                <Col xs={6}>
                  <p className="text-end mt-4">
                    Updated: {timeAgo(todo.updatedAt)}
                  </p>
                </Col>
              </Row>
            </TitleContainer>
          </TodoContainer>
        )
      )}
    </StyledTodoList>
  );
};

export default TodoList;
