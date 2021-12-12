import React, { useState } from "react";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import "./App.css";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import { Todo } from "./interfaces/todo.interfaces";

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  return (
    <div className="App">
      <Container>
        <Row>
          <Col xs={12} md={6}>
            <TodoForm todos={todos} setTodos={setTodos} />
          </Col>
          <Col xs={12} md={6}>
            <TodoList todos={todos} setTodos={setTodos} />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
