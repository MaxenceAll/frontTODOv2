import {
  FcLikePlaceholder,
  FcLike,
  FcSearch,
  FcOk,
  FcCancel,
} from "react-icons/fc";
import styled from "styled-components";

function TodoCard({ todo , onMoveUp, onMoveDown }) {
  return (
    <>
      <STYLEDTitle toto={todo.is_completed}>
        {todo.title}
        <STYLEDParagraphProgress>{todo.is_completed}%</STYLEDParagraphProgress>
      </STYLEDTitle>
      <STYLEDTodoContainer>
        {todo.description ? todo.description : <i>...</i>}
        <STYLEDTodoOptionsContainer>
          <FcSearch />
          {todo.is_favorite ? <FcLike /> : <FcLikePlaceholder />}


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
  background: linear-gradient(
    to right,
    var(--main-color) ${(props) => props.toto}%,
    var(--background-color) ${(props) => props.toto}%
  );

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
  font-size: 2rem;
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
