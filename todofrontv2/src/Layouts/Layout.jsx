import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";

import styled from "styled-components";

export default function Layout() {
  return (
    <STYLEDAppContainer className="app-container">
      <Header />

      <main>
        <Outlet />
      </main>

      <Footer />
    </STYLEDAppContainer>
  );
}

const STYLEDAppContainer = styled.div`
  background-color: var(--secondary-color);

  box-shadow: rgba(0, 0, 0, 0.05) 0 6px 24px, rgba(0, 0, 0, 0.08) 0 0 0 15px;

  padding: 1rem;
  margin-top: 10px;

  width: 90vw;
  width: 90dvw;

  min-height: 100vh;
  /* fall-back */
  min-height: -moz-available;
  min-height: -webkit-fill-available;
  min-height: fill-available;

  display: flex;
  flex-direction: column;
`;
