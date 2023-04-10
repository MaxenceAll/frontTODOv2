import React, { useContext, useEffect } from "react";
import UserDetails from "../components/Dashboard/UserDetails";
import { AuthContext } from "../Contexts/AuthContext";
import {
  useActualUserQuery
} from "../features/todosSlice";
import { AdminContext } from "../Contexts/AdminContext";
import styled from "styled-components";

function Dashboard() {
  const { isAdmin, setIsAdmin } = useContext(AdminContext);
  const { auth, setAuth } = useContext(AuthContext);

  // console.log(auth)

  const { data, isSuccess, isLoading, isError } = useActualUserQuery({
    table: "customer",
    id: auth?.data?.id
  });

  // console.log(data);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error</div>;
  }
  if (isSuccess) {

  }

  return <div></div>;
}

export default Dashboard;

const STYLEDNavLinkDashboard = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: row;
`;
