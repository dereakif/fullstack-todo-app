import React, { ChangeEvent, FormEvent } from "react";
import { isError, Todo, TodoInput } from "../../interfaces/todo.interfaces";
import { StyledButton, StyledInput, StyledTextArea } from "./styles";

interface Props {
  handleOnChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleCheckBox: (event: ChangeEvent<HTMLInputElement>) => void;
  input: TodoInput | Todo;
  handleSubmitCreate?: (e: FormEvent<HTMLFormElement>) => isError;
  handleSubmitEdit?: (e: FormEvent<HTMLFormElement>) => isError;
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
    <form onSubmit={handleSubmitEdit || handleSubmitCreate}>
      <StyledInput
        placeholder="todo title"
        name="title"
        type="text"
        value={input.title}
        onChange={handleOnChange}
      />
      <StyledTextArea
        placeholder="todo description"
        name="description"
        type="text"
        value={input.description}
        onChange={handleOnChange}
      />
      <input
        name="isCompleted"
        type="checkbox"
        checked={input.isCompleted}
        onChange={handleCheckBox}
      />
      <StyledButton type="submit">
        {handleSubmitEdit ? "done" : "submit"}
      </StyledButton>
    </form>
  );
};

export default InputForm;
