import axios from "axios";
import React, {
  FormEvent,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import {
  onChangeFunction,
  Todo,
  TodoInput,
  TodoState,
} from "../../interfaces/todo.interfaces";
import Loading from "../Loading";
import InputForm from "./InputForm";
import {
  ControlButtons,
  DatePickerContainer,
  ListStats,
  StyledButton,
} from "./styles";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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
  const [startDate, setStartDate] = useState<Date>(new Date());

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

  const handleDeleteAll = () => {
    if (!window.confirm("Are you sure? This is permanent!")) {
      return;
    }
    setTodoState((prev) => ({ ...prev, loading: true }));
    axios
      .delete<any>("http://localhost:3001/api/allTodos")
      .then((res) => {
        const { data } = res;
        if (data.deletedCount === todoState.data.length) {
          setTodoState((prev) => ({ ...prev, data: [] }));
        }
      })
      .finally(() => {
        setTodoState((prev) => ({ ...prev, loading: false }));
      });
  };

  const handleCompleteAll = () => {
    if (!window.confirm("Are you sure to complete all?")) {
      return;
    }
    setTodoState((prev) => ({ ...prev, loading: true }));
    axios
      .put<any>("http://localhost:3001/api/allTodos")
      .then((res) => {
        const { data } = res;
        if (data.modifiedCount === todoState.data.length) {
          const newData = todoState.data.map((todo) => ({
            ...todo,
            isCompleted: true,
          }));

          setTodoState((prev) => ({ ...prev, data: newData }));
        }
      })
      .finally(() => {
        setTodoState((prev) => ({ ...prev, loading: false }));
      });
  };

  const handleFilterByDate = () => {
    const isoDate = startDate.toISOString();
    setTodoState((prev) => ({ ...prev, loading: true }));
    axios
      .get<Todo[]>(`http://localhost:3001/api/todo/${isoDate}`)
      .then((res) => {
        const { data } = res;
        setTodoState((prev) => ({ ...prev, data }));
      })
      .finally(() => {
        setTodoState((prev) => ({ ...prev, loading: false }));
      });
  };

  const fetchTodos = () => {
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
      <DatePickerContainer>
        <DatePicker
          selected={startDate}
          onChange={(date: Date) => setStartDate(date)}
        />
        <div className="filter-button-container">
          <StyledButton onClick={handleFilterByDate}>Filter</StyledButton>
          <StyledButton onClick={fetchTodos}>Reset</StyledButton>
        </div>
      </DatePickerContainer>
      {todoState.loading ? (
        <Loading />
      ) : (
        todoState.data.length > 0 && (
          <>
            <ControlButtons>
              <StyledButton onClick={handleCompleteAll}>
                Complete All
              </StyledButton>
              <StyledButton onClick={handleDeleteAll}>Delete All</StyledButton>
            </ControlButtons>
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
          </>
        )
      )}
    </>
  );
};

export default TodoForm;
