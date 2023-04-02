import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

function ButtonReturnToHome() {
  const navigate = useNavigate();
  return (
    <>
      <p>Identification avec succes !</p>
      <STYLEDSubmit onClick={() => navigate("/")}>
        Retour à la page principale.
      </STYLEDSubmit>
    </>
  );
}

export default ButtonReturnToHome;

const STYLEDSubmit = styled.button`
  color: var(--main-color);
  background-color: var(--background-color);
  &:hover {
    color: var(--secondary-color);
    background-color: var(--main-color);
  }
`;