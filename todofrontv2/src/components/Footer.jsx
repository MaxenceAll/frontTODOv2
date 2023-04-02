import styled from "styled-components";
import { DateDuJour } from "./Tools/DateDuJour";

function Footer() {
  return (
    <STYLEDFooterContainer>


        <DateDuJour  />{import.meta.env.VITE_APP_NAME} © 

    </STYLEDFooterContainer>
  );
}

export default Footer;

const STYLEDFooterContainer = styled.footer`
  margin-top: auto;
  border-top: 2px solid var(--main-color);
  display: flex;
  justify-content: space-between;
  padding: 2%;

`;
