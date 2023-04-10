import React, { useContext, useState } from "react";
import {
  useGetCustomerQuery,
  useIsAdminQuery,
} from "../../features/todosSlice";
import { AdminContext } from "../../Contexts/AdminContext";
import { AuthContext } from "../../Contexts/AuthContext";
import UserDetails from "../../components/Dashboard/UserDetails";

import Loader from "../../components/Loader/Loader";
import { FixedSizeList } from "react-window";

import styled from "styled-components";
import { STYLEDButton } from "../../styles/genericButton";
import { STYLEDhr } from "../../styles/genericHR";
import { STYLEDContainer, STYLEDContainerBox } from "../../styles/genericContainer";
import { useForm } from "react-hook-form";

function Users() {
  const { auth, setAuth } = useContext(AuthContext);
  const { isAdmin, setIsAdmin } = useContext(AdminContext);
  const isAdminQuery = useIsAdminQuery({ email: auth?.data?.email });
  // console.log(isAdmin);
  // console.log(isAdminQuery?.data?.data===1);



  const {
    register,
    handleSubmit,
    formState: { errors = "" },
    reset,
  } = useForm();


  let allUsersQuery;
  if (isAdmin) {
    allUsersQuery = useGetCustomerQuery();
  } else {
    allUsersQuery = { auth };
  }

  const {
    data: allUsers,
    error: allUsersError,
    isError: allUsersIsError,
    isLoading: allUsersIsLoading,
    isSuccess: allUsersIsSuccess,
  } = allUsersQuery;


  // console.log(allUsers);

  // PAGINATION LOGIC
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(1);
  const [activeButtonIndex, setActiveButtonIndex] = useState(0);
  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage + 1);
    setActiveButtonIndex(selectedPage);
  };
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
  if (allUsersIsSuccess) {
    const startIndex = pageSize * (currentPage - 1);
    const endIndex = startIndex + pageSize;
    const usersToDisplay = allUsers?.data?.slice(startIndex, endIndex);

    content = (
      <>
        <STYLEDPaginationOptions>
          <STYLEDhr />
          <div>
            <STYLEDButton
              width="30%"
              onClick={handlePrevPageClick}
              disabled={currentPage === 1}
            >
              Page Précédente
            </STYLEDButton>
            <span>
            &nbsp;{currentPage}&nbsp;sur&nbsp;{Math.ceil(allUsers?.data?.length / pageSize)}&nbsp;
            </span>
            <STYLEDButton
              width="30%"
              onClick={handleNextPageClick}
              disabled={
                currentPage === Math.ceil(allUsers?.data?.length / pageSize)
              }
            >
              Page Suivante
            </STYLEDButton>
          </div>

          <div>
            <label htmlFor="pageSize">Affichage par page:</label>
            <STYLEDSelect
              id="pageSize"
              value={pageSize}
              onChange={handlePageSizeChange}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
              <option value={allUsers?.data?.length}>
                All({allUsers?.data?.length})
              </option>
            </STYLEDSelect>
          </div>
        </STYLEDPaginationOptions>

        <FixedSizeList
          height={350}
          itemCount={usersToDisplay.length}
          itemSize={350}
          width={"100%"}
        >
          {({ index, style }) => (
            <div style={style}>
              <UserDetails user={usersToDisplay[index]} />
            </div>
          )}
        </FixedSizeList>

        <STYLEDPageContainer>
          {Array.from(
            { length: Math.ceil(allUsers?.data?.length / pageSize) },
            (_, i) => (
              <STYLEDButton
                style={{
                  backgroundColor:
                    activeButtonIndex === i
                      ? "var(--main-color)"
                      : "var(--secondary-color)",
                  color:
                    activeButtonIndex === i
                      ? "var(--background-color)"
                      : "var(--main-color)",
                }}
                key={i}
                onClick={() => handlePageChange(i)}
              >
                {i + 1}
              </STYLEDButton>
            )
          )}
        </STYLEDPageContainer>
      </>
    );
  }

  if (allUsersIsError) {
    content = <>Oops error spotted, {allUsersError}</>;
  }
  if (allUsersIsLoading) {
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
            <div>Vous êtes admin, voici tous les utilisateurs :</div>
            {content}
          </STYLEDContainerBox>
        </STYLEDContainer>
      ) : (
        // IF NOT ADMIN LOGIC
        <STYLEDContainer>
          <STYLEDContainerBox>
            <div>Vous devez être admin pour être ici !</div>
            {content}
          </STYLEDContainerBox>
        </STYLEDContainer>
      )}
    </>
  );

}

export default Users;

const STYLEDPaginationOptions = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const STYLEDPageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const STYLEDSelect = styled.select`
  text-align: center;
  background: var(--background-color);
  color: var(--main-color);
  border: 1px solid var(--main-color);
  border-radius: 50px;

  &:hover {
    background: var(--main-color);
    color: var(--secondary-color);
    border: 1px solid var(--background-color);
  }

  option {
    background-color: var(--background-color);
    color: var(--main-color);
  }
`;
