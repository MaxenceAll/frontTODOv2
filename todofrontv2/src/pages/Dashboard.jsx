import React, { useContext, useEffect } from "react";
import UserDetails from "../components/Dashboard/UserDetails";
import { AuthContext } from "../Contexts/AuthContext";
import { useGetCustomerQuery, useIsAdminQuery } from "../features/todosSlice";
import { AdminContext } from "../Contexts/AdminContext";
import styled from "styled-components";

function Dashboard() {
  const { auth } = useContext(AuthContext);
  const { setIsAdmin } = useContext(AdminContext);
  const isAdminQuery = useIsAdminQuery({ email: auth?.data?.email });
  const {
    data: customers,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetCustomerQuery();

  useEffect(() => {
    if (isAdminQuery?.data?.result) {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }, [isAdminQuery?.data?.result]);

  let content = "";
  let foundUser = "";

  if (isSuccess) {
    foundUser = customers?.data?.filter(
      (customer) => customer.id === auth.data.id
    );
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

  return <>{content}</>;
}

export default Dashboard;

const STYLEDNavLinkDashboard = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: row;
`;
