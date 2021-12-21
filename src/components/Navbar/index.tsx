import { Container, Form } from "react-bootstrap";
import { onChangeFunction } from "../../interfaces/todo.interfaces";
import { StyledNavBar } from "./styles";

interface Props {
  setCurrentTheme: (theme: number) => void;
}

const Nav = ({ setCurrentTheme }: Props) => {
  const handleOnChange: onChangeFunction = (event) => {
    let themeIndex = Number(event.target.checked);
    setCurrentTheme(themeIndex);
  };

  return (
    <StyledNavBar>
      <Container>
        <h3>Todo App</h3>
        <StyledNavBar.Toggle />
        <StyledNavBar.Collapse className="justify-content-end">
          <Form.Check
            type="switch"
            id="custom-switch"
            label="Change Theme"
            onChange={handleOnChange}
          />
        </StyledNavBar.Collapse>
      </Container>
    </StyledNavBar>
  );
};

export default Nav;
