import { useContext } from "react";
import { AuthContext } from "../Contexts/AuthContext";
import styled from "styled-components";
import {
  STYLEDContainer,
  STYLEDContainerBox,
} from "../styles/genericContainer";

import {
  useGetAllTasksByEmailQuery,
  useGetAllTodosByEmailQuery,
} from "../features/todosSlice";
import ButtonReturnToLogin from "../components/Tools/ButtonReturnToLogin";
import { STYLEDButton } from "../styles/genericButton";

import { useNavigate } from "react-router-dom";
import TodoCard2 from "../components/Todos/TodoCard2";

// TESTS AVEC RTK QUERIES (de redux)
export const Home2 = () => {
  const navigate = useNavigate();
  const { auth, setAuth } = useContext(AuthContext);

  const {
    data: todos,
    error: todosError,
    isError: todosIsError,
    isLoading: todosIsLoading,
    isSuccess: todosIsSuccess,
  } = useGetAllTodosByEmailQuery(auth?.data?.email);
  const {
    data: tasks,
    error: tasksError,
    isError: tasksIsError,
    isLoading: tasksIsLoading,
    isSuccess: tasksIsSuccess,
  } = useGetAllTasksByEmailQuery(auth?.data?.email);

  let content;
  if (todosIsSuccess && tasksIsSuccess) {
    content = (
      <>
        <ul>
          {todos.data?.map((todo) => (
            <li key={todo.id}>
              <TodoCard2  todo={todo} tasks={tasks} />
            </li>
          ))}
        </ul>
      </>
    );
  }

  if (todosIsError || tasksIsError) {
    content = (
      <div>
        <h1>Error :</h1>
        {todosIsError && <p>{todosError}</p>}
        {tasksIsError && <p>{tasksError}</p>}
      </div>
    );
  }

  if (todosIsLoading || tasksIsLoading) return <h1> Loading...</h1>;

  return (
    <>
      <>
        {auth?.data?.email ? (
          <STYLEDWelcomeDiv>
            Hello {auth?.data?.email}, &nbsp;
            <STYLEDButton onClick={() => navigate("/login")}>
              Se déconnecter
            </STYLEDButton>
          </STYLEDWelcomeDiv>
        ) : (
          <STYLEDWelcomeDiv>
            <p>Connectez vous pour commencer !</p>
            <ButtonReturnToLogin />
          </STYLEDWelcomeDiv>
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

const STYLEDWelcomeDiv = styled.div`
  padding-bottom: 2%;
`;
