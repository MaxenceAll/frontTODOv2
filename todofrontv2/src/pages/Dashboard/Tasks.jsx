import React, { useContext, useState } from "react";
import { AdminContext } from "../../Contexts/AdminContext";
import { useGetAllTasksQuery } from "../../features/todosSlice";
import {
  STYLEDContainer,
  STYLEDContainerBox,
} from "../../styles/genericContainer";

import Loader from "../../components/Loader/Loader";
import { FixedSizeList } from 'react-window';

import styled from "styled-components"
import SmallTaskCard from "../../components/Dashboard/SmallTaskCard";
import { STYLEDButton } from "../../styles/genericButton";

function Tasks() {
  const {
    data: allTasks,
    error: allTasksError,
    isError: allTasksIsError,
    isLoading: allTasksIsLoading,
    isSuccess: allTasksIsSuccess,
  } = useGetAllTasksQuery();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(3);
  const [activeButtonIndex, setActiveButtonIndex] = useState(0);

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage+1);
    setActiveButtonIndex(selectedPage);
  }

  const handleNextPageClick = () => {
    setCurrentPage((prevPage) => prevPage + 1);
    setActiveButtonIndex((prevPage) => prevPage + 1);
  };

  const handlePrevPageClick = () => {
    setCurrentPage((prevPage) => prevPage - 1);
    setActiveButtonIndex((prevPage) => prevPage - 1);
  };

  const handlePageSizeChange = (event) => {
    setPageSize(Number(event.target.value));
    setCurrentPage(1);
    setActiveButtonIndex(0);
  };

  let content = "";
  if (allTasksIsSuccess) {
    const startIndex = pageSize * (currentPage - 1);
    const endIndex = startIndex + pageSize;
    const tasksToDisplay = allTasks?.data?.slice(startIndex, endIndex);

    content = (
      <>
        <FixedSizeList
          height={300}
          itemCount={tasksToDisplay.length}
          itemSize={100}
          width={"100%"}
        >
          {({ index, style }) => (
            <div style={style}>
              <SmallTaskCard task={tasksToDisplay[index]} />
            </div>
          )}
        </FixedSizeList>

        <STYLEDPageContainer>
          {Array.from({ length: Math.ceil(allTasks?.data?.length / pageSize) }, (_, i) => (
            <STYLEDButton 
            style={{
              backgroundColor: activeButtonIndex === i ? "var(--main-color)" : "var(--secondary-color)",
              color: activeButtonIndex === i ? "var(--background-color)" : "var(--main-color)",
            }}            
            key={i} onClick={() => handlePageChange(i)}>{i + 1}</STYLEDButton>
          ))}
        </STYLEDPageContainer>

        <div>
          <STYLEDButton width="40%"
           onClick={handlePrevPageClick} disabled={currentPage === 1}>
           Page Précédente
          </STYLEDButton>
          <span>&nbsp;Page {currentPage} of {Math.ceil(allTasks?.data?.length / pageSize)}&nbsp;</span>
          <STYLEDButton width="40%"
           onClick={handleNextPageClick} disabled={currentPage === (Math.ceil(allTasks?.data?.length / pageSize))}>
            Page Suivante
          </STYLEDButton>          
        </div>

        <div>
          <label htmlFor="pageSize">Affichage par page:</label>
          <select id="pageSize" value={pageSize} onChange={handlePageSizeChange}>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value={allTasks?.data?.length}>All</option>
          </select>
        </div>

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

const STYLEDPageContainer = styled.div`
display:flex;
justify-content:center;
align-items: center;

`
