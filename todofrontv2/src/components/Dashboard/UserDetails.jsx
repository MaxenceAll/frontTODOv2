import React from "react";
import styled from "styled-components";
import { STYLEDButton } from "../../styles/genericButton";

function UserDetails(props) {
  const { user } = props;

  return (
    <StyledCard>
      <StyledHeader>Carte utilisateur.</StyledHeader>
      <StyledCardBody>
        <StyledDetail>
          <StyledLabel>id:</StyledLabel>
          <StyledValue>{user[0].id}</StyledValue>
        </StyledDetail>
        <StyledDetail>
          <StyledLabel>email:</StyledLabel>
          <StyledValue>{user[0].email}</StyledValue>
        </StyledDetail>
        <StyledDetail>
          <StyledLabel>pincode:</StyledLabel>
          <StyledValue>Hashed</StyledValue>
          {/* <StyledValue>{user[0].pincode}</StyledValue> */}
        </StyledDetail>
        <StyledDetail>
          <StyledLabel>is_deleted:</StyledLabel>
          <StyledValue>{user[0].is_deleted}</StyledValue>
        </StyledDetail>
        <StyledDetail>
          <StyledLabel>is_verified:</StyledLabel>
          <StyledValue>{user[0].is_verified}</StyledValue>
        </StyledDetail>
        <StyledDetail>
          <StyledLabel>emailVerificationToken:</StyledLabel>
          <StyledValue>{user[0].emailVerificationToken}</StyledValue>
        </StyledDetail>
        <StyledDetail>
          <StyledLabel>is_admin:</StyledLabel>
          <StyledValue>{user[0].is_admin}</StyledValue>
        </StyledDetail>
      </StyledCardBody>
      <div>
        <STYLEDButton>Edit...</STYLEDButton>
        <STYLEDButton>Soft Delete</STYLEDButton>
        <STYLEDButton>Hard Delete.</STYLEDButton>
      </div>
    </StyledCard>
  );
}

export default UserDetails;

const StyledCard = styled.div`
  background-color: var(--background-color);
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  padding: 20px;
  margin: 20px;
`;

const StyledHeader = styled.h2`
  font-size: 1rem;
  font-weight: 700;
  margin: 0;
`;

const StyledCardBody = styled.div`
  margin-top: 20px;
`;

const StyledDetail = styled.div`
  display: flex;
  margin-bottom: 10px;
`;

const StyledLabel = styled.div`
  font-weight: 700;
  width: 150px;
`;

const StyledValue = styled.div`
  flex: 0;
`;
