import { useContext, useState } from "react";
import TodoCard from "../components/Todos/TodoCard";
import { AuthContext } from "../Contexts/AuthContext";
import styled from "styled-components";
import {
  STYLEDContainer,
  STYLEDContainerBox,
} from "../styles/genericContainer";
import FilterBox from "../components/Todos/FilterBox";

import {
  useGetAllTasksByEmailQuery,
  useGetAllTodosByEmailQuery,
} from "../features/todosSlice";
import ButtonReturnToLogin from "../components/Tools/ButtonReturnToLogin";
import { STYLEDButton } from "../styles/genericButton";
import useCookie from "../Hooks/useCookie";
import { useNavigate } from "react-router-dom";

// TESTS AVEC RTK QUERIES (de redux)
export const Home = () => {

  const navigate = useNavigate();
  const { auth, setAuth } = useContext(AuthContext);
  // console.log(auth);

  const [sortOrderById, setSortOrderById] = useState("asc"); // "asc" or "desc"
  const [sortOrderByProgress, setSortOrderByProgress] = useState(""); // "asc" or "desc"
  const [showFavorites, setShowFavorites] = useState(false); // true or false
  const [showCompleted, setShowCompleted] = useState(false); // true or false

  const {
    data: allTodosByEmail,
    error,
    isError,
    isLoading,
    isSuccess,
  } = useGetAllTodosByEmailQuery(auth?.data?.email);

  let content;
  if (isSuccess) {
    let sortedTodos = [...allTodosByEmail?.data];

    // Filter by id:
    if (sortOrderById) {
      sortedTodos.sort((a, b) => {
        if (sortOrderById === "asc") {
          return a.id - b.id;
        } else {
          return b.id - a.id;
        }
      });
    }
    // Filter by is_favorite:
    if (showFavorites) {
      sortedTodos = sortedTodos.filter((todo) => todo.is_favorite);
    }
    // Filter by progress:
    if (sortOrderByProgress) {
      sortedTodos.sort((a, b) => {
        if (sortOrderByProgress === "asc") {
          return a.is_completed - b.is_completed;
        } else {
          return b.is_completed - a.is_completed;
        }
      });
    }
    // Filter by completed:
    if (showCompleted) {
      sortedTodos = sortedTodos.filter((todo) => todo.is_completed !== 100);
    }
    // le pourcentage de completed :
    let completedTodos = sortedTodos.filter(
      (todo) => todo.is_completed === 100
    );

    content = (
      <>
        <FilterBox
          sortOrderById={sortOrderById}
          setSortOrderById={setSortOrderById}
          showFavorites={showFavorites}
          setShowFavorites={setShowFavorites}
          sortOrderByProgress={sortOrderByProgress}
          setSortOrderByProgress={setSortOrderByProgress}
          showCompleted={showCompleted}
          setShowCompleted={setShowCompleted}
          numTodos={sortedTodos.length}
          completedTodos={completedTodos}
        />
        <ul>
          {sortedTodos?.map((todo) => (
            <li key={todo.id}>
              <TodoCard todo={todo} />
            </li>
          ))}
        </ul>
      </>
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
      <>
        {auth?.data?.email ? (
          <div>
            Hello {auth?.data?.email}, &nbsp;
            <STYLEDButton onClick={() => navigate("/login")}>
              Se déconnecter
            </STYLEDButton>
          </div>
        ) : (
          <>
            <p>Connectez vous pour commencer !</p>
            <ButtonReturnToLogin />
          </>
        )}
      </>

      {auth?.data?.email && (
        <STYLEDContainer>
          <STYLEDContainerBox>{content}</STYLEDContainerBox>
        </STYLEDContainer>
      )}
    </>
  );
};
