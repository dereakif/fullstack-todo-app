import { Form } from "react-bootstrap";
import styled, { css } from "styled-components";

interface SCProps {
  primary?: boolean;
  isCompleted?: boolean;
  index?: number;
}

export const StyledButton = styled.button<SCProps>`
  background: transparent;
  border-radius: 3px;
  border: 2px solid #7093db;
  color: #7093db;
  margin: 0 1em;
  padding: 0.25em 1em;
  width: fit-content;

  :hover {
    cursor: pointer;
  }
  ${(props) =>
    props.primary &&
    css`
      background: palevioletred;
      color: white;
    `};
`;

export const StyledInput = styled.input`
  border: 1px solid black;
  border-radius: 1px;
  line-height: 2;
  padding-left: 8px;
  margin-bottom: 10px;
  :focus {
    outline: 0;
  }
`;

export const StyledTextArea = styled.textarea`
  border: 1px solid black;
  border-radius: 1px;
  line-height: 2;
  padding-left: 8px;
  margin-bottom: 10px;
  :focus {
    outline: 0;
  }
`;

export const StyledForm = styled(Form)<SCProps>`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  ${(props) =>
    props.index === 0 &&
    css`
      margin-bottom: 1rem;
    `};
  border: 1px solid #7093db;
  border-radius: 0.25rem;
  #description {
    max-height: 200px;
  }
  #isCompleted {
    display: flex;
  }
  > div {
    > input,
    textarea {
      border-color: #7093db;
    }
    > label.form-label {
      color: #7093db;
      font-weight: 699;
    }
  }
`;

export const StyledSubmitContainer = styled.div<SCProps>`
  display: flex;
  justify-content: space-around;
  input[type="checkbox"] {
    border-color: #7093db;
  }
  ${(props) =>
    props.isCompleted &&
    css`
      input:checked {
        background-color: palevioletred;
        border-color: palevioletred;
      }
    `};
`;
