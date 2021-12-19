import React from "react";
import { Spinner } from "react-bootstrap";
import { StyledLoading } from "./styles";

const Loading = () => {
  return (
    <StyledLoading>
      <Spinner animation="border" variant="light" />
    </StyledLoading>
  );
};

export default Loading;
