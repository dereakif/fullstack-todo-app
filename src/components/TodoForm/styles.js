import styled, { css } from "styled-components";

export const StyledButton = styled.button`
  background: transparent;
  border-radius: 3px;
  border: 2px solid palevioletred;
  color: palevioletred;
  margin: 0 1em;
  padding: 0.25em 1em;
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
