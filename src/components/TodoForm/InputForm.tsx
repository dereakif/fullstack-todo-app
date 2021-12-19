import ReactTooltip from "react-tooltip";
import {
  onChangeFunction,
  onSubmitFunction,
  Todo,
  TodoInput,
} from "../../interfaces/todo.interfaces";
import {
  StyledButton,
  StyledCloseButton,
  StyledError,
  StyledForm,
  StyledSubmitContainer,
} from "./styles";

interface Props {
  handleOnChange: onChangeFunction;
  handleCheckBox: onChangeFunction;
  input: TodoInput | Todo;
  handleSubmitCreate?: onSubmitFunction;
  handleSubmitEdit?: onSubmitFunction;
  handleCloseEditor?: () => void;
  index?: number;
  errorForInput?: string;
}

const InputForm = (props: Props) => {
  const {
    handleOnChange,
    handleCheckBox,
    input,
    handleSubmitCreate,
    handleSubmitEdit,
    index,
    errorForInput,
    handleCloseEditor,
  } = props;
  return (
    <StyledForm
      $errorForInput={errorForInput}
      $index={index}
      onSubmit={handleSubmitEdit || handleSubmitCreate}
    >
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

      <StyledForm.Group className="mb-3 mt-3" controlId="isCompleted">
        <StyledSubmitContainer isCompleted={input.isCompleted}>
          <StyledForm.Check
            checked={input.isCompleted}
            onChange={handleCheckBox}
            type="checkbox"
            name="isCompleted"
            label="Completed"
          />
          <div className="d-flex align-items-center">
            <StyledButton type="submit">
              {handleSubmitEdit ? "Save" : "Submit"}
            </StyledButton>
            {handleSubmitEdit && handleCloseEditor && (
              <StyledCloseButton type="button" onClick={handleCloseEditor}>
                Don't save
              </StyledCloseButton>
            )}
          </div>
        </StyledSubmitContainer>
        {errorForInput && (
          <>
            <StyledError data-tip data-for="error">
              Some error accrued!
            </StyledError>
            <ReactTooltip place="bottom" type="dark" effect="solid" id="error">
              {errorForInput === "invalidInput"
                ? "Please enter valid title and description"
                : errorForInput}
            </ReactTooltip>
          </>
        )}
      </StyledForm.Group>
    </StyledForm>
  );
};

export default InputForm;
