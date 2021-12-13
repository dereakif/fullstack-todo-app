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
  background-color: rgb(55, 59, 98);
  border-radius: 0.25rem;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  width: 100%;
  color: whitesmoke;
  p {
    overflow: hidden;
    text-overflow: ellipsis;
    margin-bottom: 0;
  }
  > div.row {
    > div.col-11 > p.title {
      font-weight: 600;
    }
    > div.col-1 {
      display: flex;
      justify-content: center;
      align-items: center;
      svg {
        font-size: 1.3rem;
        :hover {
          cursor: pointer;
        }
      }
    }
  }
  > div.row:first-of-type {
    margin-bottom: 2rem;
  }

  transition: all 0.2s ease-in-out;
  &:hover {
    transform: scale(1.03);
  }
`;

export const TodoContainer = styled(Row)`
  display: flex;
  justify-content: space-between;
  margin: 1.2rem 0;
  > div.col {
    padding: 1rem 1.5rem;
  }
`;
