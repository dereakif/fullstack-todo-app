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
    background-color: #463e6f;
  }
  :active {
    transform: scale(0.98);
    box-shadow: 3px 2px 22px 1px rgba(0, 0, 0, 0.24);
  }
  ${(props) =>
    props.primary &&
    css`
      background: palevioletred;
      color: white;
    `};
`;

export const StyledCloseButton = styled(StyledButton)`
  background-color: #673767;
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
    props.$index === 0 &&
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
  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
  ${(props) =>
    props.$errorForInput &&
    css`
      background-color: #673767;
      transition: all 0.5s ease-in-out;
      @keyframes leaves {
        0% {
          transform: scale(1);
        }
        50% {
          transform: scale(1.03);
        }
        100% {
          transform: scale(1);
        }
      }
      :not(:hover) {
        animation: leaves 2s ease-in-out infinite alternate;
        -webkit-animation: leaves 2s ease-in-out infinite alternate;
      }
    `};
  #error {
    width: 400px;
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
  .form-check {
    margin: auto 0;
  }
`;

export const StyledError = styled.p`
  font-size: large;
  font-weight: 800;
  color: white;
  margin-top: 1rem;
  margin-bottom: 0;
  text-align: center;
  :hover {
    cursor: pointer;
  }
`;

export const ListStats = styled.div`
  padding: 1rem;
  font-style: italic;
  color: whitesmoke;
  background-color: #7166a9;
  text-align: center;
  div.row:last-of-type {
    margin-top: 0.5rem;
  }
  div.row:first-of-type {
    > div.col {
      font-weight: 600;
      text-decoration: underline;
    }
  }
  border-radius: 0.25rem;
  margin-top: 1rem;
`;

export const ControlButtons = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 1rem;
  color: whitesmoke;
  background-color: #26223c;
  /* text-align: center; */
  border-radius: 0.25rem;
  margin-top: 1rem;
  button {
    :hover {
      background-color: #363055;
    }
  }
`;

export const DatePickerContainer = styled(ControlButtons)`
  align-items: center;
  .react-datepicker-wrapper {
    > div > input {
      width: 150px;
    }
  }
`;
