import React, { useRef, useState } from "react";
import styled from "styled-components";
import { STYLEDButton } from "../../styles/genericButton";
import { STYLEDInput } from "../../styles/genericInput";
import { useUpdateTaskMutation } from "../../features/todosSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function SmallTaskCard({ task }) {
  const [editMode, setEditMode] = useState(false);

  const [newCheck, setNewCheck] = useState(task.is_completed === 1);
  const [newTitle, setNewTitle] = useState(task.title);
  const [newDeadline, setNewDeadline] = useState(task.deadline_date);
  const [newDescription, setNewDescription] = useState(task.description);
  const [newPriority, setNewPriority] = useState(task.id_priority);

  const newCheckRef = useRef(null);
  const newTitleRef = useRef(null);
  const newDeadlineRef = useRef(null);
  const newDescriptionRef = useRef(null);
  const newPriorityRef = useRef(null);

  const [
    updateTask,
    {
      error: taskError,
      isError: taskIsError,
      isLoading: taskIsLoading,
      isSuccess: taskIsSuccess,
    },
  ] = useUpdateTaskMutation();

  const handleChangingTask = async () => {
    const newCheck = newCheckRef.current.checked;
    const newTitle = newTitleRef.current.value;
    const newDeadline = newDeadlineRef.current.value;
    const newDescription = newDescriptionRef.current.value;
    const newPriority = newPriorityRef.current.value;

    const newTaskObject = {
      id: task.id,
      title: newTitle,
      description: newDescription,
      deadline_date: newDeadline,
      is_completed: (newCheck ? 1 : 0),
      id_priority: newPriority,
    };
    console.log("L'object a send:", newTaskObject);
    try {
      const { data } = await updateTask(newTaskObject);
      console.log(data)
      setNewCheck(data.data.is_completed === 1);
      setNewTitle(data.data.title);
      setNewDeadline(data.data.deadline_date);
      setNewDescription(data.data.description);
      setNewPriority(data.data.id_priority);
      setEditMode(false);
    } catch (err) {
      console.error(err);
    }
  };

  console.log("component re-rendered")

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

      <STYLEDSmallTaskCardContainer>
        <STYLEDSmallTaskCardContainerContent>
          {!editMode ? (
            <STYLEDTitleAndId>
              {newCheck ? <>✅</> : <>❌</>}
              (id={task.id}){newTitle}
            </STYLEDTitleAndId>
          ) : (
            <STYLEDTitleAndId>
              <input
                type="checkbox"
                defaultChecked={task.is_completed}
                ref={newCheckRef}
              />
              (id={task.id})
              <STYLEDInput
                name="title"
                height="10px"
                width="100%"
                type="text"
                defaultValue={newTitle}
                ref={newTitleRef}
              />
            </STYLEDTitleAndId>
          )}

          {!editMode ? (
            <div>deadline={newDeadline}</div>
          ) : (
            <STYLEDInput
              name="deadline_date"
              height="10px"
              width="100%"
              type="text"
              defaultValue={newDeadline}
              ref={newDeadlineRef}
            />
          )}

          {!editMode ? (
            <div>{newDescription}</div>
          ) : (
            <STYLEDInput
              name="description"
              height="10px"
              width="100%"
              type="text"
              defaultValue={newDescription}
              ref={newDescriptionRef}
            />
          )}

          {!editMode ? (
            <div>Priority={newPriority}</div>
          ) : (
            <STYLEDInput
              name="id_priority"
              height="10px"
              width="100%"
              type="text"
              defaultValue={newPriority}
              ref={newPriorityRef}
            />
          )}

          <div>
            <i>TodoId:{task.id_Todo}</i>
          </div>
        </STYLEDSmallTaskCardContainerContent>

        <STYLEDSmallTaskCardContainerOptions>
          {!editMode ? (
            <STYLEDButton
              onClick={() => setEditMode(!editMode)}
              width="30%"
              height="45px"
            >
              Edit...
            </STYLEDButton>
          ) : (
            <STYLEDValidateButton>
              <STYLEDButton onClick={handleChangingTask}>✔️</STYLEDButton>
              <STYLEDButton onClick={() => setEditMode(!editMode)}>
                ❌
              </STYLEDButton>
            </STYLEDValidateButton>
          )}
          <STYLEDButton width="30%" height="45px">
            Soft Delete
          </STYLEDButton>
          <STYLEDButton width="30%" height="45px">
            Hard Delete
          </STYLEDButton>
        </STYLEDSmallTaskCardContainerOptions>
      </STYLEDSmallTaskCardContainer>
    </>
  );
}

export default SmallTaskCard;

const STYLEDValidateButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const STYLEDTitleAndId = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: start;
`;

const STYLEDSmallTaskCardContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  padding: 2%;
  font-size: 0.6rem;
  background-color: var(--background-color);
`;
const STYLEDSmallTaskCardContainerContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;
const STYLEDSmallTaskCardContainerOptions = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 2%;
`;
