import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { STYLEDButton } from "../../styles/genericButton";

function NavlinksDashboard() {
  return (
    <STYLEDNavLinkDashboard>
      <span>
        <NavLink to="/dashboard/users">
          <STYLEDButton>Users</STYLEDButton>
        </NavLink>
      </span>
      <span>
        <NavLink to="/dashboard/todos">
          <STYLEDButton>Todos</STYLEDButton>
        </NavLink>
      </span>
      <span>
        <NavLink to="/dashboard/tasks">
          <STYLEDButton>Tasks</STYLEDButton>
        </NavLink>
      </span>
      <span>
        <NavLink to="/dashboard/upload">
          <STYLEDButton>Upload</STYLEDButton>
        </NavLink>
      </span>

    </STYLEDNavLinkDashboard>
  );
}

export default NavlinksDashboard;

const STYLEDNavLinkDashboard = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: row;
`;
