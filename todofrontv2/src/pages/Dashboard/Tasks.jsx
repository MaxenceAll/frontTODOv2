import React, { useContext } from "react";
import { AdminContext } from "../../Contexts/AdminContext";
import { useGetAllTasksQuery } from "../../features/todosSlice";
import {
  STYLEDContainer,
  STYLEDContainerBox,
} from "../../styles/genericContainer";

import Loader from "../../components/Loader/Loader";


function Tasks() {
  const {
    data: allTasks,
    error: allTasksError,
    isError: allTasksIsError,
    isLoading: allTasksIsLoading,
    isSuccess: allTasksIsSuccess,
  } = useGetAllTasksQuery();
  console.log(allTasks);
  console.log(useGetAllTasksQuery())

  let content = "";
  if (allTasksIsSuccess) {
    content = (
      <>
        <ul>
          {allTasks?.data?.map((task) => (
            <li key={task.id}>
              •
              {task.id}
              {task.title}
              {task.deadline_date}
              {task.is_completed}
              {task.description}
              {task.id_priority}
              {task.id_Todo}
            </li>
          ))}
        </ul>
      </>
    );
  }
  if (allTasksIsError) {
    content = <>Oops error spotted, {allTasksError}</>;
  }
  if (allTasksIsLoading) {
    content = (
      <>
        <div>
          <Loader />
        </div>
      </>
    );
  }

  return (
    <>
      {useContext(AdminContext).isAdmin ? (
        // IF ADMIN LOGIC
        <STYLEDContainer>
          <STYLEDContainerBox>
            <div>All Tasks</div>
            {content}
          </STYLEDContainerBox>
        </STYLEDContainer>
      ) : (
        // IF NOT ADMIN LOGIC
        <STYLEDContainer>
          <STYLEDContainerBox>
            <div>Your Tasks</div>
            {content}
          </STYLEDContainerBox>
        </STYLEDContainer>
      )}
    </>
  );
}

export default Tasks;
