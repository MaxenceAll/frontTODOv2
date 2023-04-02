import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

function ButtonReturnToLogin(props) {
  const navigate = useNavigate();
  return (
    <>
      <p>{props.msg}</p>
      <STYLEDSubmit onClick={() => navigate("/login")}>
        Retour à la page de login
      </STYLEDSubmit>
    </>
  );
}

export default ButtonReturnToLogin;

const STYLEDSubmit = styled.button`
  color: var(--main-color);
  background-color: var(--background-color);
  &:hover {
    color: var(--secondary-color);
    background-color: var(--main-color);
  }
`;