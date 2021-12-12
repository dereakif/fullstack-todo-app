import React, { ChangeEvent, FormEvent } from "react";
import {
  onChangeFunction,
  onSubmitFunction,
  Todo,
  TodoInput,
} from "../../interfaces/todo.interfaces";
import { StyledButton, StyledForm, StyledSubmitContainer } from "./styles";

interface Props {
  handleOnChange: onChangeFunction;
  handleCheckBox: onChangeFunction;
  input: TodoInput | Todo;
  handleSubmitCreate?: onSubmitFunction;
  handleSubmitEdit?: onSubmitFunction;
}

const InputForm = (props: Props) => {
  const {
    handleOnChange,
    handleCheckBox,
    input,
    handleSubmitCreate,
    handleSubmitEdit,
  } = props;

  return (
    <StyledForm onSubmit={handleSubmitEdit || handleSubmitCreate}>
      <StyledForm.Group className="mb-3" controlId="title">
        <StyledForm.Label>Todo Title</StyledForm.Label>
        <StyledForm.Control
          type="text"
          placeholder="Enter title"
          name="title"
          value={input.title}
          onChange={handleOnChange}
        />
      </StyledForm.Group>

      <StyledForm.Group className="mb-3" controlId="description">
        <StyledForm.Label>Description</StyledForm.Label>
        <StyledForm.Control
          type="text"
          as="textarea"
          name="description"
          placeholder="Enter description"
          value={input.description}
          onChange={handleOnChange}
        />
      </StyledForm.Group>

      <StyledForm.Group className="mb-3" controlId="isCompleted">
        <StyledSubmitContainer>
          <StyledForm.Check
            checked={input.isCompleted}
            onChange={handleCheckBox}
            type="checkbox"
            name="isCompleted"
            label="Completed"
          />

          <StyledButton type="submit">
            {handleSubmitEdit ? "done" : "submit"}
          </StyledButton>
        </StyledSubmitContainer>
      </StyledForm.Group>
    </StyledForm>
  );
};

export default InputForm;
