import React, { useState } from "react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import styled from "styled-components";
import { STYLEDButton } from "../../styles/genericButton";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { BiCheckbox, BiCheckboxChecked } from "react-icons/bi";

import {
  FcHighPriority,
  FcLowPriority,
  FcMediumPriority,
  FcDeleteRow,
  FcCheckmark,
  FcCancel,
  FcInspection,
} from "react-icons/fc";
import {
  useSoftDeleteTaskMutation,
  useUpdateTaskCompletedMutation,
  useUpdateTaskDescMutation,
  useUpdateTaskDlineMutation,
  useUpdateTaskPriorityMutation,
  useUpdateTaskTitleMutation,
} from "../../features/todosSlice";
import DeadlineBox from "./DeadlineBox";
import { STYLEDInput } from "../../styles/genericInput";
import Checkbox from "./Checkbox";
import { STYLEDhr } from "../../styles/genericHR";
import { useForm } from "react-hook-form";

function TaskCard({ task, numberOfCompletedTask, setNumberOfCompletedTask }) {
  //  TODO erk fix this
  //   Complete LOGIC :
  const [completed, setCompleted] = useState(task.is_completed);
  const [updateTaskCompleted, { updateTaskIsLoading }] =
    useUpdateTaskCompletedMutation();
  const toggleIsCompleted = () => {
    completed
      ? setNumberOfCompletedTask((prevState) => prevState - 1)
      : setNumberOfCompletedTask((prevState) => prevState + 1);

    updateTaskCompleted({ id: task.id, is_completed: !completed ? 1 : 0 });

    completed
      ? toast.info(`${task.title} n'est plus terminée.`)
      : toast.success(`${task.title} est maintenant finie !`);

    setCompleted(!completed);
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

  //  EDIT Title LOGIC:
  const {
    register,
    handleSubmit,
    formState: { errors = "" },
    reset,
  } = useForm();

  const [editTitle, setEditTitle] = useState(false);
  const [updateTitle, { updateTitleIsLoading }] = useUpdateTaskTitleMutation();
  const handleDoubleClickNewTitle = (e) => {
    e.stopPropagation();
    setEditTitle(!editTitle);
    reset();
  };
  const handleSubmitNewTitle = (data) => {
    // console.log(data);
    updateTitle({ id: task.id, title: data.title });
    toast.success(`Changement de titre avec success !`);
    setEditTitle(false);
    reset();
  };

  // Edit Desc Logic
  const [editDesc, setEditDesc] = useState(false);
  const [updateDesc, { updateDescIsLoading }] = useUpdateTaskDescMutation();
  const handleDoubleClickNewDesc = (e) => {
    e.stopPropagation();
    setEditDesc(!editDesc);
    reset();
  };
  const handleSubmitNewDesc = (data) => {
    // console.log(data);
    updateDesc({ id: task.id, description: data.description });
    toast.success(`Changement de description avec success !`);
    setEditTitle(false);
    reset();
  };

  // EDIT Deadline logic
  const [editDline, setEditDline] = useState(false);
  const [updateDline, { updateDlineIsLoading }] = useUpdateTaskDlineMutation();
  const handleDoubleClickNewDline = (e) => {
    e.stopPropagation();
    setEditDline(!editDline);
  };
  const handleSubmitNewDline = (data) => {
    console.log(data);
    if (data.deadline_date) {
      updateDline({ id: task.id, deadline_date: data.deadline_date });
      toast.success(`Changement de deadline avec success !`);
      setEditDline(false);
      reset();
    } else {
      updateDline({ id: task.id, deadline_date: "" });
      toast.success(`Changement de deadline avec success !`);
      setEditDline(false);
      reset();
    }
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
          {/* <STYLEDCheckbox
            type="checkbox"
            defaultChecked={task.is_completed}
            id={task.id}
            onChange={toggleIsCompleted}
          /> */}

          {completed ? (
            <BiCheckboxChecked onClick={toggleIsCompleted} />
          ) : (
            <BiCheckbox onClick={toggleIsCompleted} />
          )}
        </STYLEDCheckArea>

        <STYLEDContentArea>
          <STYLEDTaskTitle onDoubleClick={handleDoubleClickNewTitle}>
            {!editTitle ? (
              task.title
            ) : (
              <>
                <form onSubmit={handleSubmit(handleSubmitNewTitle)}>
                  <STYLEDInput
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

                  <STYLEDButton width="12%" type="submit">
                    ✓
                  </STYLEDButton>
                  <STYLEDButton width="12%" onClick={handleDoubleClickNewTitle}>
                    ❌
                  </STYLEDButton>

                  {errors.title?.type === "checkLength" && (
                    <STYLEDErrorMessage>
                      Maximum 30 signes svp !
                    </STYLEDErrorMessage>
                  )}
                </form>
              </>
            )}
          </STYLEDTaskTitle>

          <STYLEDhr />

          <STYLEDTaskDesc onDoubleClick={handleDoubleClickNewDesc}>
            {!editDesc ? (
              task.description
            ) : (
              <>
                <form onSubmit={handleSubmit(handleSubmitNewDesc)}>
                  <STYLEDInput
                    width={"74%"}
                    placeholder="Saisir la nouvelle description ?"
                    type="text"
                    name="description"
                    {...register("description", {
                      required: "Saisir une description",
                      validate: {
                        checkLength: (value) => value.length <= 255,
                      },
                    })}
                  ></STYLEDInput>

                  <STYLEDButton width="12%" type="submit">
                    ✓
                  </STYLEDButton>
                  <STYLEDButton width="12%" onClick={handleDoubleClickNewDesc}>
                    ❌
                  </STYLEDButton>

                  {errors.description?.type === "checkLength" && (
                    <STYLEDErrorMessage>
                      Maximum 30 signes svp !
                    </STYLEDErrorMessage>
                  )}
                </form>
              </>
            )}
          </STYLEDTaskDesc>
        </STYLEDContentArea>

        <STYLEDDlineArea onDoubleClick={handleDoubleClickNewDline}>
          {!editDline ? (
            <DeadlineBox deadline={task.deadline_date} />
          ) : (
            <>
              <form onSubmit={handleSubmit(handleSubmitNewDline)}>
                <STYLEDInput
                  width={"72%"}
                  placeholder="Saisir la nouvelle dead-line ?"
                  type="datetime-local"
                  name="deadline_date"
                  {...register("deadline_date")}
                ></STYLEDInput>

                <STYLEDButton width="12%" type="submit">
                  ✓
                </STYLEDButton>
                <STYLEDButton width="12%" onClick={handleDoubleClickNewDline}>
                  ❌
                </STYLEDButton>
              </form>
            </>
          )}
        </STYLEDDlineArea>

        <STYLEDTodoOptionsContainer>
          <STYLEDButton priority={priority} onClick={() => handlePriority(1)}>
            <FcHighPriority />
          </STYLEDButton>
          <STYLEDButton priority={priority} onClick={() => handlePriority(2)}>
            <FcMediumPriority />
          </STYLEDButton>
          <STYLEDButton priority={priority} onClick={() => handlePriority(3)}>
            <FcLowPriority />
          </STYLEDButton>
          &nbsp;
          <STYLEDButton onClick={handleDelete}>
            <FcDeleteRow />
          </STYLEDButton>
        </STYLEDTodoOptionsContainer>
      </STYLEDTaskContainer>
    </>
  );
}

export default TaskCard;

const STYLEDTaskTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const STYLEDTaskDesc = styled.div`
  font-size: 0.8rem;
`;

const STYLEDCheckbox = styled.input``;

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
  /* height: 100px; */
`;

const STYLEDCheckArea = styled.div`
  grid-area: checkArea;
  display: flex;
  justify-content: center;
  align-items: center;
  /* margin = clickable */
  /* transform: scale(2); */
  font-size: 10vw;
  /* margin: 25%; */
`;
const STYLEDContentArea = styled.div`
  /* pour gèrer le focus sur double click */
  user-select: none;
  grid-area: contentArea;
  border-left: 1px solid var(--main-color);
  padding: 1%;
`;
const STYLEDDlineArea = styled.div`
  /* pour gèrer le focus sur double click */
  user-select: none;
  grid-area: dlineArea;
  border-top: 1px solid var(--main-color);
  display: flex;
  justify-content: center;
  align-items: center;
  max-height: 33px;
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
