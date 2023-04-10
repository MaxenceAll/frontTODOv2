import React, { useContext, useEffect } from "react";
import UserDetails from "../components/Dashboard/UserDetails";
import { AuthContext } from "../Contexts/AuthContext";
import { useActualUserQuery, useGetCustomerQuery, useIsAdminQuery } from "../features/todosSlice";
import { AdminContext } from "../Contexts/AdminContext";
import styled from "styled-components";

function Dashboard() {
  const { isAdmin, setIsAdmin } = useContext(AdminContext);
  const { auth, setAuth } = useContext(AuthContext);

  console.log(auth)

  let content = "";
  if (isAdmin) {
    const {
      data: customers,
      isLoading,
      isSuccess,
      isError,
      error,
    } = useGetCustomerQuery();

      const {
        actualUser,
         isSuccess:actualUserIsSuccess
        } = useActualUserQuery( auth?.data?.email );
      console.log(actualUser);
    
    let foundUser = "";

    if (isSuccess) {
      foundUser = customers?.data?.filter(
        (customer) => customer.id === auth.data.id
      );
      // console.log(foundUser);
      [foundUser] = foundUser;
      // console.log(foundUser);
      content = (
        <>
          <UserDetails user={foundUser} />
        </>
      );
    }
    if (isLoading) {
      content = (
        <>
          <div>Loading...</div>
        </>
      );
    }
    if (isError) {
      content = (
        <>
          <div>Error : {error}</div>
        </>
      );
    }
  } else {
    content = "yo"
  }

  return <>{content}</>;
}

export default Dashboard;

const STYLEDNavLinkDashboard = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: row;
`;
