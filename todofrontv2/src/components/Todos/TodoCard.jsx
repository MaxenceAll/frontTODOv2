import { useState } from "react";
import {
  FcLikePlaceholder,
  FcLike,
  FcSearch,
  FcOk,
  FcCancel,
} from "react-icons/fc";
import styled from "styled-components";
import config from "../../config";

import { STYLEDButton } from "../../styles/genericButton";

function TodoCard({ todo }) {
  const [favorite, setFavorite] = useState(todo.is_favorite);


  //TODO CONVERT THIS TO REDUX
  const toggleFavorite = () => {
    setFavorite(!favorite);
    let body = {
      is_favorite: favorite ? 0 : 1,
    };
    const myJSON = JSON.stringify(body);
    console.log("json:", myJSON);
    fetch("http://localhost:5000/todo/" + todo.id, {
      method: "PUT",
      headers: {
        "Authorization": config.api.authorization,
        "Content-Type": "application/json",
      },
      body: myJSON,
    })
      .then((response) => response.json())
      .catch((error) => console.error(error));
  };

  return (
    <>
      <STYLEDTitle progressValue={todo.is_completed}>
        {todo.title}
        <STYLEDParagraphProgress>
          {todo.is_completed}% completée
        </STYLEDParagraphProgress>
      </STYLEDTitle>

      <STYLEDTodoContainer>
        {todo.description ? todo.description : <i>...</i>}

        <STYLEDTodoOptionsContainer>
          <FcSearch />
          <STYLEDButton onClick={toggleFavorite}>
            {favorite ? <FcLike /> : <FcLikePlaceholder />}
          </STYLEDButton>
          <FcCancel />
        </STYLEDTodoOptionsContainer>
      </STYLEDTodoContainer>
    </>
  );
}

export default TodoCard;

const STYLEDTitle = styled.div`
  display: flex;
  justify-content: space-around;

  border-radius: 5px;
  color: var(--secondary-color);

  /* background: linear-gradient(
    to right,
    var(--main-color) ${(props) => props.progressValue}%,
    var(--background-color) ${(props) => props.progressValue}%
  ); */

  border: 1px solid transparent;
  background-clip: padding-box;
  background-image: linear-gradient(
    to right,
    var(--main-color),
    var(--background-color)
  );
  background-size: ${(props) => props.progressValue}% 100%;
  background-repeat: no-repeat;
  background-color: var(--background-color);
`;

const STYLEDTodoContainer = styled.div`
  font-size: 0.8rem;
  border-radius: 10px;
  max-width: 500px;
  min-height: 50px;
  border: solid 1px var(--main-color);

  padding: 2%;

  display: flex;
  justify-content: space-between;
  align-items: center;
  &:hover {
    border: 1px dashed var(--main-color);
  }

  margin-bottom: 5%;
`;

const STYLEDTodoOptionsContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 2%;
  font-size: 1.5rem;
  border: 1px dashed var(--main-color);

  &:hover {
    border: 1px solid var(--main-color);
  }
`;

const STYLEDParagraphProgress = styled.span`
  color: var(--secondary-color);
  /* writing-mode: vertical-rl;
  text-orientation: mixed;
  border-right: 1px dashed var(--main-color); */
`;
