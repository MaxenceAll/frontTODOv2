import React, { useContext, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import DashboardHeader from "../components/Dashboard/DashboardHeader";
import NavlinksDashboard from "../components/Dashboard/NavlinksDashboard";
import ButtonReturnToLogin from "../components/Tools/ButtonReturnToLogin";
import { AdminContext } from "../Contexts/AdminContext";
import { AuthContext } from "../Contexts/AuthContext";
import fetcher from "../Helpers/fetcher";

export default function DashboardLayout() {
  const isAdmin = useContext(AdminContext).isAdmin;
  const { auth, setAuth } = useContext(AuthContext);
  // console.log(auth)
  // console.log(isAdmin)





  if (!auth?.data?.email) {
    return (
      <>
        <div>
          Il faut se logger ! <ButtonReturnToLogin />
        </div>
      </>
    );
  }
  return (
    <>
      <DashboardHeader />
      <div>
        Bonjour, {auth?.data?.email} ({isAdmin ? "admin" : "user"})

        <NavlinksDashboard />
      </div>
      <Outlet />
    </>
  );
}
