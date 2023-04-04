import React, { useState } from "react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import styled from "styled-components";
import { STYLEDButton } from "../../styles/genericButton";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  FcHighPriority,
  FcLowPriority,
  FcMediumPriority,
  FcDeleteRow,
} from "react-icons/fc";
import {
    useSoftDeleteTaskMutation,
  useUpdateTaskCompletedMutation,
  useUpdateTaskPriorityMutation,
} from "../../features/todosSlice";

function TaskCard({ task }) {
  const formattedDate = format(
    new Date(task.deadline_date),
    "dd MMMM yyyy à HH:mm:ss",
    { locale: fr }
  );

  //   Complete LOGIC :
  const [completed, setCompleted] = useState(task.is_completed);
  const [updateTaskCompleted, { updateTaskIsLoading }] =
    useUpdateTaskCompletedMutation();
  const toggleIsCompleted = () => {
    setCompleted(!completed);
    updateTaskCompleted({ id: task.id, is_completed: completed ? 0 : 1 });
    {
      completed
        ? toast.success(`${task.title} est maintenant finie !`)
        : toast.info(`${task.title} n'est plus terminée.`);
    }
  };
  //   Priority LOGIC :
  const [priority, setPriority] = useState(task.id_priority);
  const [updateTaskPriority, { updateTaskPriorityIsLoading }] =
    useUpdateTaskPriorityMutation();
  const handlePriority = (combien) => {
    updateTaskPriority({ id: task.id, id_priority: combien });
    {
      priority === 1
        ? toast.success(`${task.title} est maintenant priority HAUTE !`)
        : priority === 2
        ? toast.info(`${task.title} est maintenant priority NORMALE !`)
        : toast.error(`${task.title} est maintenant priority BASSE !`);
    }
    setPriority(combien);
  };

    // DELETE LOGIC
    const [softDeleteTask] = useSoftDeleteTaskMutation();
    const handleDelete = () => {
    softDeleteTask(task.id);
      toast.info(`${task.title} supprimé avec succes !`);
    };

  return (
    <>
      {/*  TODO Trouver un moyen de déplacer cette logique ailleurs (main.jsx ?) */}
      <ToastContainer
        position="bottom-center"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        toastStyle={{
          backgroundColor: "var(--background-color)",
          color: "var(--main-color)",
        }}
      />
      <STYLEDTaskContainer priority={task.id_priority} isChecked={completed}>
        <STYLEDCheckArea>
          <input
            type="checkbox"
            defaultChecked={task.is_completed}
            id={task.id}
            onChange={toggleIsCompleted}
          />
        </STYLEDCheckArea>

        <STYLEDContentArea>
          {task.title}- A faire :{task.description}
        </STYLEDContentArea>

        <STYLEDDlineArea>Deadline : {formattedDate} </STYLEDDlineArea>

        <STYLEDTodoOptionsContainer>
          <STYLEDButton onClick={() => handlePriority(1)}>
            <FcHighPriority />
          </STYLEDButton>
          <STYLEDButton onClick={() => handlePriority(2)}>
            <FcMediumPriority />
          </STYLEDButton>
          <STYLEDButton onClick={() => handlePriority(3)}>
            <FcLowPriority />
          </STYLEDButton>
          &nbsp;
          <STYLEDButton
          onClick={handleDelete}
          >
            <FcDeleteRow />
          </STYLEDButton>
        </STYLEDTodoOptionsContainer>
      </STYLEDTaskContainer>
    </>
  );
}

export default TaskCard;

const STYLEDTaskContainer = styled.div`
  /* display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  width: 100%;
  background-color: var(--background-color); */

  display: grid;
  grid-template-rows: 1fr 1fr 1fr 1fr;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-template-areas:
    "checkArea  contentArea  contentArea  contentArea  contentArea"
    "checkArea  contentArea  contentArea  contentArea  contentArea"
    "checkArea  contentArea  contentArea  contentArea  contentArea"
    "dlineArea  dlineArea    dlineArea    dlineArea    tBoxArea";
  gap: 5px;
  height: 100%;
  background-color: var(--background-color);
  border: 2px groove var(--main-color);
  border: 2px groove
    ${(props) =>
      props.priority === 1 ? "red" : props.priority === 2 ? "yellow" : "green"};
  ${(props) => (props.isChecked ? "text-decoration: line-through" : "")};

  margin-bottom: 1%;
`;

const STYLEDCheckArea = styled.div`
  grid-area: checkArea;
  display: flex;
  justify-content: center;
  align-items: center;
  /* margin = clickable */
  transform: scale(3);
  margin: 25%;
`;
const STYLEDContentArea = styled.div`
  grid-area: contentArea;
  border-left: 1px solid var(--main-color);
  padding: 1%;
`;
const STYLEDDlineArea = styled.div`
  grid-area: dlineArea;
  border-top: 1px solid var(--main-color);
  display: flex;
  justify-content: center;
  align-items: center;
`;
const STYLEDTBoxArea = styled.div`
  grid-area: tBoxArea;
`;

const STYLEDTodoOptionsContainer = styled.div`
  height: 25px;
  display: flex;
  justify-content: center;
  padding: 2%;
  font-size: 1.5rem;
  border-top-left-radius: 10px;
  border-top: 1px dashed var(--main-color);
  border-left: 1px dashed var(--main-color);

  &:hover {
    border-top: 1px solid var(--main-color);
    border-left: 1px solid var(--main-color);
  }
`;
