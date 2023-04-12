import { useContext, useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  FcLikePlaceholder,
  FcLike,
  FcSearch,
  FcCancel,
  FcAddColumn,
} from "react-icons/fc";
import styled from "styled-components";
import {
  useCreateTaskMutation,
  useGetAllTasksByEmailQuery,
  useGetAllTasksByTodoIdQuery,
  useSoftDeleteMutation,
  useUpdateFavoriteMutation,
  useUpdateTodoDescMutation,
  useUpdateTodoMutation,
  useUpdateTodoTitleMutation,
} from "../../features/todosSlice";
import { STYLEDButton } from "../../styles/genericButton";
import { AuthContext } from "../../Contexts/AuthContext";
import TaskCard from "./TaskCard";
import { STYLEDInput } from "../../styles/genericInput";
import { useForm } from "react-hook-form";
import { STYLEDErrorMessage } from "../../styles/genericParagraphError";
import GenericModal from "../Tools/GenericModal";
import { STYLEDForm } from "../../styles/genericForm";
import { STYLEDhr } from "../../styles/genericHR";

import Confetti from "react-confetti";
import useWindowSize from "react-use/lib/useWindowSize";

import { AnimatedCheckmark, MODES } from "../Checkmark/AnimatedCheckmark";
import PulsingHeart from "../PulsingHeart/PulsingHeart";
import Image from "../Image/Image";
import SelectImage from "../Image/SelectImage";

function TodoCard({ todo }) {
  const [favorite, setFavorite] = useState(todo.is_favorite);
  const [updateFavorite, { updateFavoriteIsLoading }] =
    useUpdateFavoriteMutation();
  const toggleFavorite = (e) => {
    e.stopPropagation();
    setFavorite(!favorite);
    updateFavorite({ id: todo.id, is_favorite: favorite ? 0 : 1 });
    {
      favorite
        ? toast.info(`${todo.title} retiré des favoris !`)
        : toast.success(`${todo.title} ajouté aux favoris avec succes.`);
    }
  };

  const [softDelete] = useSoftDeleteMutation();
  const handleDelete = (e) => {
    e.stopPropagation();
    softDelete(todo.id);
    toast.info(`${todo.title} supprimé avec succes !`);
  };

  //  GET TASK DATA
  const { auth, setAuth } = useContext(AuthContext);
  const {
    data: allTasksById,
    error,
    isError,
    isSuccess,
  } = useGetAllTasksByTodoIdQuery(todo.id);
  const [numberOfTask, setNumberOfTask] = useState(0);
  const [numberOfCompletedTask, setNumberOfCompletedTask] = useState(0);
  // console.log(((numberOfCompletedTask / numberOfTask) * 100).toFixed(0));

  useEffect(() => {
    if (allTasksById?.data) {
      setNumberOfTask(allTasksById.data.length);
      setNumberOfCompletedTask(
        (allTasksById?.data?.filter((task) => task.is_completed === 1)).length
      );
    }
  }, [allTasksById]);

  let AllTaskContentByTodoId = "";
  if (isSuccess) {
    AllTaskContentByTodoId = (
      <ul>
        {allTasksById?.data?.map((task) => (
          <li key={task.id}>
            <TaskCard
              task={task}
              numberOfCompletedTask={numberOfCompletedTask}
              setNumberOfCompletedTask={setNumberOfCompletedTask}
            />
          </li>
        ))}
      </ul>
    );
  }

  //TODO REMOVE THIS REF, react hook form setFocus()
  const inputNewTitleRef = useRef(null);
  const {
    register,
    handleSubmit,
    formState: { errors = "" },
    reset,
  } = useForm();
  const [editTitle, setEditTitle] = useState(false);
  const [updateTitle, { updateTitleIsLoading }] = useUpdateTodoTitleMutation();
  const handleDoubleClickNewTitle = (e) => {
    e.stopPropagation();
    inputNewTitleRef?.current?.focus();
    setEditTitle(!editTitle);
    reset();
  };
  const handleSubmitNewTitle = (data) => {
    // console.log(data);
    updateTitle({ id: todo.id, title: data.title });
    toast.success(`Changement de titre avec success !`);
    setEditTitle(false);
    reset();
  };

  // EDIT desc LOGIC
  const [editDesc, setEditDesc] = useState(false);
  const [updateDesc, { updateDescIsLoading }] = useUpdateTodoDescMutation();
  const handleDoubleClickNewDesc = () => {
    setEditDesc(!editDesc);
    reset();
  };
  const handleSubmitNewDesc = (data) => {
    console.log(data);
    updateDesc({ id: todo.id, description: data.description });
    toast.success(`Changement de description avec success !`);
    setEditDesc(false);
    reset();
  };

  //  show tasks logic :
  const [showTasks, setShowTasks] = useState(false);
  const toggleView = (e) => {
    e.stopPropagation();
    setShowTasks(!showTasks);
  };

  //  MODAL new task logic:
  const [isModalNewTask, setIsModalNewTask] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDesc, setNewTaskDesc] = useState("");
  const [newTaskdeadline_date, setNewTaskdeadline_date] = useState("");
  const [createTodo, { isLoading: createTodoIsLoading }] =
    useCreateTaskMutation();

  const handleNewTask = (e) => {
    e.preventDefault();
    createTodo({
      title: newTaskTitle,
      description: newTaskDesc,
      deadline_date: newTaskdeadline_date,
      id_Todo: todo.id,
    });
    reset();
    setIsModalNewTask(false);
    toast.success("Nouvelle tâche ajoutée avec succes.");
  };

  // Confetti logic :
  const { width, height } = useWindowSize();

  // select image logic :
  const [
    updateTodo,
    {
      error: updateTodoError,
      isLoading: updateTodoIsLoading,
      isSuccess: updateTodoIsSuccess,
      isError: updateTodoIsError,
    },
  ] = useUpdateTodoMutation();
  const [isModalNewImage, setIsModalNewImage] = useState(false);
  const handleChooseImage = (e) => {
    setIsModalNewImage(true);
  };
  const handleSelectImage = async (filename) => {
    // console.log("filename caught:", filename);
    try {
      await updateTodo({ id: todo.id, url_img: filename });
      if (updateTodoIsSuccess) {
        // console.log("yo its a success");
      }
      if (updateTodoIsError) {
        console.log("oops error:", updateTodoError);
      }
    } catch (error) {
      console.log("oops error:", error);
    }
    setIsModalNewImage(false);
  };

  return (
    <>
      <GenericModal
        ariaLabelMessage="Modal d'ajout de TODO'"
        isOpen={isModalNewTask}
        onClose={() => setIsModalNewTask(false)}
      >
        <>
          <STYLEDForm onSubmit={handleNewTask}>
            <label>Ajout d'une tâche pour la TODO :</label>
            <STYLEDInput disabled value={todo.title} />
            <STYLEDhr />
            <label htmlFor="newTaskTitle">Nom de la tâche :</label>
            <STYLEDInput
              width="80%"
              id="newTaskTitle"
              name="title"
              type="text"
              placeholder="Le titre ?"
              onChange={(e) => setNewTaskTitle(e.target.value)}
              required
            />
            <label htmlFor="newTaskDesc">Description de la tâche :</label>
            <STYLEDInput
              width="80%"
              id="newTaskDesc"
              name="description"
              type="text"
              placeholder="La description ?"
              onChange={(e) => setNewTaskDesc(e.target.value)}
              required
            />
            <label htmlFor="newTaskDeadline">Deadline de la tâche :</label>
            <STYLEDInput
              id="newTaskDeadline"
              type="datetime-local"
              onChange={(e) => setNewTaskdeadline_date(e.target.value)}
            ></STYLEDInput>
            <STYLEDhr />
            <STYLEDButton width="80%" type="submit">
              Ajouter
            </STYLEDButton>
            <STYLEDButton
              width="80%"
              type="button"
              onClick={() => setIsModalNewTask(false)}
              required
            >
              Fermer
            </STYLEDButton>
          </STYLEDForm>
        </>
      </GenericModal>

      <STYLEDTitle
        // prop pour le style :
        progressValue={((numberOfCompletedTask / numberOfTask) * 100).toFixed(
          0
        )}
        onDoubleClick={handleDoubleClickNewTitle}
      >
        <STYLEDFavorite>{favorite ? <PulsingHeart /> : ``}</STYLEDFavorite>
        {!editTitle ? (
          todo.title
        ) : (
          <>
            <form onSubmit={handleSubmit(handleSubmitNewTitle)}>
              <label htmlFor="changeTitle">Edit mode :</label>
              <STYLEDInput
                ref={inputNewTitleRef}
                id="changeTitle"
                placeholder="Saisir le nouveau titre"
                type="text"
                name="title"
                {...register("title", {
                  required: "Saisir un nouveau titre !",
                  validate: {
                    checkLength: (value) => value.length <= 30,
                  },
                })}
              ></STYLEDInput>

              <STYLEDButton width="50%" type="submit">
                Valider
              </STYLEDButton>

              {errors.title?.type === "checkLength" && (
                <STYLEDErrorMessage>Maximum 30 signes svp !</STYLEDErrorMessage>
              )}
            </form>
          </>
        )}

        <STYLEDParagraphProgress>
          {/* {numberOfCompletedTask}/{numberOfTask} */}
          {((numberOfCompletedTask / numberOfTask) * 100).toFixed(0)}%
          <STYLEDCompleted>
            {numberOfCompletedTask === numberOfTask ? (
              <div>
                <Confetti
                  recycle={false}
                  numberOfPieces={1000}
                  width={width}
                  height={height}
                />
                <AnimatedCheckmark
                  mode={MODES.SUCCESS}
                  size={34}
                  collapseFactor={1}
                  baseColor={"var(--main-color)"}
                />
              </div>
            ) : (
              <div>
                <AnimatedCheckmark
                  mode={MODES.LOADING}
                  size={34}
                  collapseFactor={1}
                  baseColor={"var(--main-color)"}
                />
              </div>
            )}
          </STYLEDCompleted>
        </STYLEDParagraphProgress>
      </STYLEDTitle>

      <STYLEDTodoContainer onDoubleClick={handleDoubleClickNewDesc}>
        <GenericModal
          ariaLabelMessage="Modal d'ajout d'image."
          isOpen={isModalNewImage}
          onClose={() => setIsModalNewImage(false)}
        >
          <SelectImage
            userId={todo.id_customer}
            onSelectImage={handleSelectImage}
          />
        </GenericModal>

        {todo.url_img ? (
          <Image userId={todo.id_customer} filename={todo.url_img} />
        ) : (
          <STYLEDNoImgTodo>
            <STYLEDButton
              width="100%"
              height="100%"
              onClick={handleChooseImage}
            >
              Ajouter une image
            </STYLEDButton>
          </STYLEDNoImgTodo>
        )}

        {!editDesc ? (
          todo.description ? (
            todo.description
          ) : (
            <i>Aucune description</i>
          )
        ) : (
          <>
            <form onSubmit={handleSubmit(handleSubmitNewDesc)}>
              <label htmlFor="changeDesc">Edit mode :</label>
              <STYLEDInput
                id="changeDesc"
                placeholder="Saisir la nouvelle description."
                type="text"
                name="description"
                {...register("description", {
                  validate: {
                    checkLength: (value) => value.length <= 255,
                  },
                })}
              ></STYLEDInput>

              <STYLEDButton width="50%" type="submit">
                Valider
              </STYLEDButton>

              {errors.description?.type === "checkLength" && (
                <STYLEDErrorMessage>
                  Maximum 255 signes svp !
                </STYLEDErrorMessage>
              )}
            </form>
          </>
        )}

        <STYLEDTodoOptionsContainer>
          <STYLEDButton onClick={(e) => toggleView(e)}>
            <FcSearch />
          </STYLEDButton>
          <STYLEDButton onClick={(e) => toggleFavorite(e)}>
            {favorite ? <FcLike /> : <FcLikePlaceholder />}
          </STYLEDButton>
          <STYLEDButton onClick={(e) => handleDelete(e)}>
            <FcCancel />
          </STYLEDButton>

          <STYLEDButton onClick={() => setIsModalNewTask(true)}>
            <FcAddColumn />
          </STYLEDButton>
        </STYLEDTodoOptionsContainer>
      </STYLEDTodoContainer>

      <STYLEDTaskContainer style={{ display: showTasks ? "block" : "none" }}>
        {AllTaskContentByTodoId}
      </STYLEDTaskContainer>
      {/* {showTasks ? (
        <STYLEDTaskContainer>{AllTaskContentByTodoId}</STYLEDTaskContainer>
      ) : (
        <STYLEDTaskContainerHidden>{AllTaskContentByTodoId}</STYLEDTaskContainerHidden>
      )} */}
    </>
  );
}

export default TodoCard;

const STYLEDTaskContainer = styled.div`
  transition: all 0.3s ease;
  font-size: 0.8rem;
  border: solid 1px var(--main-color);
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5%;
  /* padding:2%; */
`;
const STYLEDTaskContainerHidden = styled.div`
  transition: all 0.3s ease;
  font-size: 0.8rem;
  border: solid 1px var(--main-color);
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5%;
  /* padding:2%; */
  display: none;
`;

const STYLEDFavorite = styled.div`
  font-size: 1.5rem;
`;
const STYLEDCompleted = styled.div`
  font-size: 1.5rem;
`;

const STYLEDTitle = styled.div`
  /* pour gèrer le focus sur double click */
  user-select: none;

  min-height: 60px;

  display: flex;
  align-items: center;
  justify-content: space-around;

  border-top-left-radius: 10px;
  border-top-right-radius: 10px;

  color: var(--secondary-color);

  background: linear-gradient(
    to right,
    var(--main-color) ${(props) => props.progressValue}%,
    var(--background-color) ${(props) => props.progressValue}%
  );

  font-weight: bold;
  font-size: 1.5rem;

  background-clip: padding-box;
  background-image: linear-gradient(
    to right,
    var(--main-color),
    var(--background-color)
  );
  background-size: ${(props) => props.progressValue}% 100%;
  background-repeat: no-repeat;
  background-color: var(--background-color);

  border: 1px solid var(--main-color);
`;

const STYLEDTodoContainer = styled.div`
  /* pour gèrer le focus sur double click */
  user-select: none;

  font-size: 1rem;

  min-height: 50px;
  border: solid 1px var(--main-color);
  padding: 2%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  &:hover {
    border: 1px dashed var(--main-color);
  }
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
  display: flex;
  color: var(--secondary-color);
  /* writing-mode: vertical-rl;
  text-orientation: mixed;
  border-right: 1px dashed var(--main-color); */
`;

const STYLEDTodoTitle = styled.div``;

const STYLEDNoImgTodo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 0.7rem;
  font-style: italic;
  width: 100px;
  height: 100px;
  background-color: var(--background-color);
  border-radius: 10px;
`;
