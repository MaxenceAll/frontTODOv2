import { useContext, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  FcLikePlaceholder,
  FcLike,
  FcSearch,
  FcOk,
  FcCancel,
  FcCheckmark,
  FcApproval,
  FcDoughnutChart,
} from "react-icons/fc";
import styled from "styled-components";
import {
  useGetAllTasksByEmailQuery,
  useSoftDeleteMutation,
  useUpdateFavoriteMutation,
} from "../../features/todosSlice";

import { STYLEDButton } from "../../styles/genericButton";
import { AuthContext } from "../../Contexts/AuthContext";

function TodoCard({ todo }) {
  const [favorite, setFavorite] = useState(todo.is_favorite);
  const [updateFavorite, { isLoading }] = useUpdateFavoriteMutation();  
  const toggleFavorite = () => {
    setFavorite(!favorite);
    updateFavorite({ id: todo.id, is_favorite: favorite ? 0 : 1 });
    {
      favorite
      ? toast.success(`${todo.title} ajouté aux favoris avec succes.`)
      : toast.info(`${todo.title} retiré des favoris !`);
    }
  };

  const [softDelete] = useSoftDeleteMutation();
  const handleDelete = () => {
    softDelete(todo.id);
    toast.info(`${todo.title} supprimé avec succes !`);
  };

  const { auth, setAuth } = useContext(AuthContext);
  const {
    data: allTasksByEmail,
    error,
    isError,
    isSuccess,
  } = useGetAllTasksByEmailQuery(auth?.data?.email);
  let sortedTasks = [];
  let taskContent=""
  if (isSuccess) {
    sortedTasks = [...allTasksByEmail?.data];
    taskContent = (        <ul>
      {sortedTasks?.map((task) => (
        <li key={task.id}>
          <p>{task.title}</p>          
        </li>
      ))}
    </ul>)
  }

  return (
    <>
      <STYLEDTitle progressValue={todo.is_completed}>
        <STYLEDCompleted>{favorite ? <FcLike /> : ``}</STYLEDCompleted>
        {todo.title}
        <STYLEDParagraphProgress>
          {todo.is_completed}%
          <STYLEDFavorite>{todo.is_completed === 100 ? <FcApproval/> : <FcDoughnutChart/> }</STYLEDFavorite>
        </STYLEDParagraphProgress>
      </STYLEDTitle>

      <STYLEDTodoContainer>
        {todo.description ? todo.description : <i>...</i>}

        <STYLEDTodoOptionsContainer>
          <FcSearch />
          <STYLEDButton onClick={toggleFavorite}>
            {favorite ? <FcLike /> : <FcLikePlaceholder />}
          </STYLEDButton>
          <STYLEDButton onClick={handleDelete}>
            <FcCancel />
          </STYLEDButton>
        </STYLEDTodoOptionsContainer>



      </STYLEDTodoContainer>
          {taskContent}
    </>
  );
}

export default TodoCard;

const STYLEDFavorite = styled.div`
 /* font-size: 1.5rem; */
`
const STYLEDCompleted = styled.div`
 /* font-size: 1.5rem; */
`

const STYLEDTitle = styled.div`

  display: flex;
  align-items:center;
  justify-content: space-around;

  border-radius: 5px;
  color: var(--secondary-color);

  background: linear-gradient(
    to right,
    var(--main-color) ${(props) => props.progressValue}%,
    var(--background-color) ${(props) => props.progressValue}%
  );

  /* border: 1px solid transparent;
  background-clip: padding-box;
  background-image: linear-gradient(
    to right,
    var(--main-color),
    var(--background-color)
  );
  background-size: ${(props) => props.progressValue}% 100%;
  background-repeat: no-repeat;
  background-color: var(--background-color); */
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
