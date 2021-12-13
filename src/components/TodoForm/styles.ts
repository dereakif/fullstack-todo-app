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
  border: 2px solid whitesmoke;
  color: whitesmoke;
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
  background-color: rgb(55, 59, 98);
  ${(props) =>
    props.index === 0 &&
    css`
      margin-bottom: 1rem;
    `};
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
      background-color: #f8f9fa;
    }
    > label.form-label {
      color: whitesmoke;
      font-weight: 600;
    }
  }
`;

export const StyledSubmitContainer = styled.div<SCProps>`
  display: flex;
  justify-content: space-around;
  input[type="checkbox"] {
    border-color: whitesmoke;
  }
  > div.form-check > label {
    color: whitesmoke;
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

export const ListStats = styled.p`
  padding: 1rem;
  font-style: italic;
  color: whitesmoke;
  text-align: center;
  div.row:last-of-type {
    margin-top: 0.5rem;
  }
`;
