import styled from "styled-components";
import {
  HiUser,
  HiInformationCircle,
  HiCog,
  HiAdjustments,
  HiHome,
} from "react-icons/hi";
import { NavLink } from "react-router-dom";

function Header() {



  return (
    <STYLEDLayoutHeader className="layout-header">
      <h3>{import.meta.env.VITE_APP_NAME}</h3>
      <STYLEDHeaderBtnContainer className="header-btn-container">
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? "active-link" : null)}
        >
          <HiHome />
          <STYLEDHiddenMobile className="hide-mobile">Home</STYLEDHiddenMobile>
        </NavLink>

        <NavLink
          to="/login"
          className={({ isActive }) => (isActive ? "active-link" : null)}
        >
          <HiUser />
          <STYLEDHiddenMobile className="hide-mobile">Login</STYLEDHiddenMobile>
        </NavLink>

        <NavLink
          to="/dashboard"
          className={({ isActive }) => (isActive ? "active-link" : null)}
        >
          <HiCog />
          <STYLEDHiddenMobile className="hide-mobile">
            Dashboard
          </STYLEDHiddenMobile>
        </NavLink>

        <NavLink
          to="/themes"
          className={({ isActive }) => (isActive ? "active-link" : null)}
        >
          <HiAdjustments />
          <STYLEDHiddenMobile className="hide-mobile">Theme</STYLEDHiddenMobile>
        </NavLink>

        <NavLink
          to="/about"
          className={({ isActive }) => (isActive ? "active-link" : null)}
        >
          <HiInformationCircle />
          <STYLEDHiddenMobile className="hide-mobile">Apropos</STYLEDHiddenMobile>
        </NavLink>
      </STYLEDHeaderBtnContainer>
    </STYLEDLayoutHeader>
  );
}

export default Header;

const STYLEDLayoutHeader = styled.div`
  /* pour gèrer le focus sur double click */
  user-select: none;
  
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding-bottom: 2rem;
  border-bottom: var(--main-color) 2px solid;
`;
const STYLEDHiddenMobile = styled.span`
  @media only screen and (max-width: 650px) {
    display: none;
  }
`;
const STYLEDHeaderBtnContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  gap: 5%;
  padding-left: 2%;
  padding-right: 2%;

  @media only screen and (max-width: 650px) {
    font-size: 2rem;
  }
`;
