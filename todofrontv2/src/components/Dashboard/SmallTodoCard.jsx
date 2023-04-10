import React, { useRef, useState } from "react";
import styled from "styled-components";
import { STYLEDButton } from "../../styles/genericButton";
import { STYLEDInput } from "../../styles/genericInput";
import { useUpdateTaskMutation, useUpdateTodoMutation } from "../../features/todosSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function SmallTodoCard({ todo }) {
  const [editMode, setEditMode] = useState(false);

  const [newTitle, setNewTitle] = useState(todo.title);
  const [newDescription, setNewDescription] = useState(todo.description);
  const [newFavorite, setNewFavorite] = useState(todo.is_favorite);

  const newTitleRef = useRef(null);
  const newDescriptionRef = useRef(null);
  const newFavoriteRef = useRef(null);

  const [
    updateTodo,
    {
      error: taskError,
      isError: taskIsError,
      isLoading: taskIsLoading,
      isSuccess: taskIsSuccess,
    },
  ] = useUpdateTodoMutation();

  const handleChangingTask = async () => {
    const newTitle = newTitleRef.current.value;
    const newDescription = newDescriptionRef.current.value;
    const newFavorite = newFavoriteRef.current.checked;

    const newTodoObject = {
      id: todo.id,
      title: newTitle,
      description: newDescription,
      is_favorite: (newFavorite ? 1 : 0),
      id_customer: todo.id_customer,
    };
    console.log("L'object a send:", newTaskObject);
    // try {
    //   const { data } = await updateTask(newTaskObject);
    //   // console.log(data)
    //   setNewCheck(data.data.is_completed === 1);
    //   setNewTitle(data.data.title);
    //   setNewDeadline(data.data.deadline_date);
    //   setNewDescription(data.data.description);
    //   setNewPriority(data.data.id_priority);
    //   setEditMode(false);
    // } catch (err) {
    //   console.error(err);
    // }
  };

  // console.log("component re-rendered")

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
              {newFavorite ? <>♥</> : <>♡</>}
              (id={todo.id}){newTitle}
            </STYLEDTitleAndId>
          ) : (
            <STYLEDTitleAndId>
                              <input
                type="checkbox"
                defaultChecked={todo.is_favorite}
                ref={newFavoriteRef}
              />
              (id={todo.id})
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




            <div>id_customer={todo.id_customer}</div>

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

export default SmallTodoCard;

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
