import React, { useState } from "react";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import "./App.scss";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import { TodoState } from "./interfaces/todo.interfaces";

function App() {
  const [todoState, setTodoState] = useState<TodoState>({
    loading: false,
    data: [],
    error: "",
  });
  return (
    <div className="App">
      <Container>
        <Row>
          <Col sm={12} md={6} lg={4}>
            <TodoForm todoState={todoState} setTodoState={setTodoState} />
          </Col>
          <Col sm={12} md={6} lg={8}>
            <TodoList todoState={todoState} setTodoState={setTodoState} />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
