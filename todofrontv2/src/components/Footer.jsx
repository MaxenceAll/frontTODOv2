import styled from "styled-components";

function Footer() {
  return (
    <STYLEDFooterContainer>
      ALLART Maxence © 2023
    </STYLEDFooterContainer>
  );
}

export default Footer;


const STYLEDFooterContainer = styled.footer`
  margin-top: auto;
  border-top: 2px solid var(--main-color);
  display:flex;
  justify-content:center;

`