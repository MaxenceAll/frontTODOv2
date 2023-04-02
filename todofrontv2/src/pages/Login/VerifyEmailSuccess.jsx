import React from "react";
import styled from "styled-components";
import ButtonReturnToLogin from "../../components/Tools/ButtonReturnToLogin";

const VerifyEmailSuccess = () => {
  return (
    <STYLEDContainer>
      <STYLEDContainerBox>
        <u>E-mail vérifié avec success !</u>
        <ButtonReturnToLogin msg={"Votre adresse mail est vérifiée, vous pouvez vous identifier !"}/>
      </STYLEDContainerBox>
    </STYLEDContainer>
  );
};

export default VerifyEmailSuccess;

const STYLEDContainer = styled.div`
  margin: 20px;
`;
const STYLEDContainerBox = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;

  width: 100%;
  max-width: 500px;
  border-radius: 15px;

  box-shadow: rgba(0, 0, 0, 0.05) 0 6px 245px, rgba(0, 0, 0, 0.08) 0 0 0 5px;
`;
