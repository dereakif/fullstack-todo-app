import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import styled from "styled-components";

export const StyledTodoList = styled.div`
  @media screen and (max-width: 768px) {
    margin-top: 2rem;
  }
  div.row:first-of-type {
    margin-top: 0;
  }
`;

export const TitleContainer = styled(Col)`
  padding: 0 1rem;
  border: 1px solid #7093db;
  border-radius: 0.25rem;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  width: 100%;
  p {
    overflow: hidden;
    text-overflow: ellipsis;
    margin-bottom: 0;
  }
`;

export const TodoContainer = styled(Row)`
  display: flex;
  justify-content: space-between;
  margin: 1.2rem 0;
  > div.col {
    padding: 0.5rem 1rem;
  }
`;
