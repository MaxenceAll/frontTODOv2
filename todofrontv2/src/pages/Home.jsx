import React, { useContext } from "react";
import { AuthContext } from "../Contexts/AuthContext";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import TodoList from "../components/Todo/TodoList";

import {
  useGetTodosQuery,
  useGetTodosForCustomerQuery,
} from "../features/api/ApiSlice";

function Home() {
  const { auth, setAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  console.log(auth);

  const { data, isLoading, isSuccess, isError, error } =
    useGetTodosForCustomerQuery(auth?.data?.email);

  let content;
  if (isLoading) {
    content = <p>Loading ...</p>;
  } else if (isSuccess) {
    content = data;
  } else if (isError) {
    content = <p>{error}</p>;
  }

  return (
    <div>
      Bienvenue,
      {auth?.data?.email ? (
        <div>
          {[auth?.data?.email]}
          <div>
            {isSuccess && <TodoList todos={content} />}
            {isLoading && content}
            {isError && content}
          </div>
        </div>
      ) : (
        <p>
          Connectez-vous pour voir vos TODOs
          <STYLEDButton onClick={() => navigate("/login")}>
            Je me connecte
          </STYLEDButton>
        </p>
      )}
    </div>
  );
}

export default Home;

const STYLEDButton = styled.button`
  color: var(--main-color);
  background-color: var(--background-color);
  &:hover {
    color: var(--secondary-color);
    background-color: var(--main-color);
  }
`;
