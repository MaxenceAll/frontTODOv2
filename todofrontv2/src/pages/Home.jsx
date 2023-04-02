import { useContext, useState } from "react";
import TodoCard from "../components/Todos/TodoCard";
import { AuthContext } from "../Contexts/AuthContext";
import { useGetAllTodos, useGetAllTodosByEmail } from "../features/todosSlice";

import styled from "styled-components";
import {
  STYLEDContainer,
  STYLEDContainerBox,
} from "../styles/genericContainer";
import FilterBox from "../components/Todos/FilterBox";

// TESTS AVEC RTK QUERIES (de redux)
export const Home = () => {
  const { auth, setAuth } = useContext(AuthContext);
  console.log(auth);


  const [order, setOrder] = useState("default");

  const changeOrder = (newOrder) => {
    setOrder(newOrder);
  };

  // const {
  //   data: allTodos,
  //   error,
  //   isError,
  //   isLoading,
  //   isSuccess,
  // } = useGetAllTodos();
  const {
    data: allTodosByEmail,
    error,
    isError,
    isLoading,
    isSuccess,
  } = useGetAllTodosByEmail(auth?.data?.email);

  let content;
  if (isSuccess) {
    content = (
      <ul>
        {allTodosByEmail?.data?.map((todo) => (
          <li key={todo.id}>
            <TodoCard todo={todo} />
          </li>
        )) ?? null}
      </ul>
    );
  }
  if (isError) {
    content = (
      <div>
        <h1>Error numéro : {error.status}</h1>
        <p>
          Retour de l'api : {error.data?.message ?? "Oops une erreur inconnue"}
        </p>
      </div>
    );
  }

  if (isLoading) return <h1> Loading...</h1>;
  return (
    <>
      Coucou {auth?.data?.email}
      <STYLEDFilterContainer>
        <STYLEDFilterContainerBox>
          <FilterBox />
        </STYLEDFilterContainerBox>
      </STYLEDFilterContainer>

      <STYLEDContainer>
        <STYLEDContainerBox>{content}</STYLEDContainerBox>
      </STYLEDContainer>
    </>
  );
};

const STYLEDTodoContainer = styled.article``;

const STYLEDFilterContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin: 20px;
`;
const STYLEDFilterContainerBox = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 100%;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: rgba(0, 0, 0, 0.05) 0 6px 245px, rgba(0, 0, 0, 0.08) 0 0 0 5px;
`;