import React, { useCallback, useEffect, useState } from "react";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import { ThemeProvider } from "styled-components";
import "./App.scss";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import { TodoState } from "./interfaces/todo.interfaces";
import { DefaultTheme } from "styled-components";
import Nav from "./components/Navbar";

const LightTheme: DefaultTheme = {
  colors: {
    surface: "#26223c",
    primary: "#6b76dc",
    primaryVariant: "#26223c",
    secondaryVariant: "#7166a9",
    buttonHover: "#463e6f",
    fontColor: "black",
  },
};

const DarkTheme: DefaultTheme = {
  colors: {
    surface: "#191919",
    primary: "rgb(55,59,98)",
    primaryVariant: "#26223c",
    secondaryVariant: "#7166a9",
    buttonHover: "#463e6f",
    fontColor: "whiteSmoke",
  },
};

const themes = [LightTheme, DarkTheme];

function App() {
  const [todoState, setTodoState] = useState<TodoState>({
    loading: false,
    data: [],
    error: "",
  });
  const [theme, setTheme] = useState(0);
  const setCurrentTheme = useCallback((theme) => {
    localStorage.setItem("theme_setting", theme);
    setTheme(theme);
  }, []);

  useEffect(() => {
    let storagedTheme = localStorage.getItem("theme_setting");
    if (storagedTheme) {
      setTheme(parseInt(storagedTheme));
    }
  }, []);
  return (
    <ThemeProvider theme={themes[theme]}>
      <div className="App">
        <Nav setCurrentTheme={setCurrentTheme} />
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
    </ThemeProvider>
  );
}

export default App;
