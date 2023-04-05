import styled from "styled-components";
import { DateDuJour } from "./Tools/DateDuJour";

function Footer() {
  return (
    <STYLEDFooterContainer>

        ALLART Maxence
        <DateDuJour  />
        {import.meta.env.VITE_APP_NAME} © 

    </STYLEDFooterContainer>
  );
}

export default Footer;

const STYLEDFooterContainer = styled.footer`
  /* pour gèrer le focus sur double click */
  user-select: none;

  margin-top: auto;
  border-top: 2px solid var(--main-color);
  display: flex;
  justify-content: space-between;
  padding: 2%;

`;
