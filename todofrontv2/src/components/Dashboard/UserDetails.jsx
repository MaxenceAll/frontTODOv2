import React, { useState } from "react";
import styled from "styled-components";
import { STYLEDButton } from "../../styles/genericButton";
import { useForm } from "react-hook-form";
import { STYLEDInput } from "../../styles/genericInput";
import { HiBan, HiCheck } from "react-icons/hi";
import { useUpdateCustomerMutation } from "../../features/todosSlice";

function UserDetails(props) {
  const [editMode, setEditMode] = useState(false);
  const { user } = props;

  const [updateCustomer, { updateCustomerIsLoading }] =
    useUpdateCustomerMutation();

  const onSubmit = async (data) => {
    // console.log(data);
    const newCustomerObject = {
      id: user.id,
      email: data.email,
      is_deleted: data.is_deleted ? 1 : 0,
      is_verified: data.is_verified ? 1 : 0,
      is_admin: data.is_admin ? 1 : 0,
    };
    // console.log(updateCustomer);
    try {
      const { data } = await updateCustomer(newCustomerObject);
      // console.log(data)
      setEditMode(false);
    } catch (err) {
      console.error(err);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors = "" },
    reset,
  } = useForm();

  let content = "";
  if (!editMode) {
    content = (
      <StyledCard>
        <StyledHeader>Carte utilisateur.</StyledHeader>
        <StyledCardBody>
          <StyledDetail>
            <StyledLabel>id:</StyledLabel>
            <StyledValue></StyledValue>
          </StyledDetail>
          <StyledDetail>
            <StyledLabel>email:</StyledLabel>
            <StyledValue>{user.email}</StyledValue>
          </StyledDetail>
          <StyledDetail>
            <StyledLabel>pincode:</StyledLabel>
            <StyledValue>Hashed</StyledValue>
            {/* <StyledValue>{user.pincode}</StyledValue> */}
          </StyledDetail>
          <StyledDetail>
            <StyledLabel>is_deleted:</StyledLabel>
            <StyledValue>{user.is_deleted}</StyledValue>
          </StyledDetail>
          <StyledDetail>
            <StyledLabel>is_verified:</StyledLabel>
            <StyledValue>{user.is_verified}</StyledValue>
          </StyledDetail>
          <StyledDetail>
            <StyledLabel>emailVerificationToken:</StyledLabel>
            <StyledValue>{user.emailVerificationToken}</StyledValue>
          </StyledDetail>
          <StyledDetail>
            <StyledLabel>is_admin:</StyledLabel>
            <StyledValue>{user.is_admin}</StyledValue>
          </StyledDetail>
        </StyledCardBody>
        <div>
          <STYLEDButton onClick={() => setEditMode(!editMode)}>
            Edit...
          </STYLEDButton>
          <STYLEDButton>Soft Delete</STYLEDButton>
          <STYLEDButton>Hard Delete.</STYLEDButton>
        </div>
      </StyledCard>
    );
  } else {
    content = (
      <form onSubmit={handleSubmit(onSubmit)}>
        <StyledCard>
          <StyledHeader>Carte utilisateur.</StyledHeader>
          <StyledCardBody>
            <StyledDetail>
              <StyledLabel>id:</StyledLabel>
              <StyledValue>{user.id}</StyledValue>
            </StyledDetail>
            <StyledDetail>
              <StyledLabel>email:</StyledLabel>
              <StyledValue>
                <STYLEDInput
                  id="email"
                  placeholder="Saisir votre adresse mail"
                  type="text"
                  defaultValue={user.email}
                  name="email"
                  {...register("email", {
                    pattern: {
                      value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                      message: "Adresse mail invalide",
                    },
                  })}
                />
                {errors.email ? <HiBan /> : <HiCheck />}
              </StyledValue>
            </StyledDetail>
            <StyledDetail>
              <StyledLabel>pincode:</StyledLabel>
              <StyledValue>********</StyledValue>
              {/* <StyledValue>{user.pincode}</StyledValue> */}
            </StyledDetail>
            <StyledDetail>
              <StyledLabel>is_deleted:</StyledLabel>
              <StyledValue>
                <STYLEDInput
                  id="is_deleted"
                  defaultChecked={user.is_deleted}
                  type="checkbox"
                  name="is_deleted"
                  {...register("is_deleted", {})}
                />
              </StyledValue>
            </StyledDetail>
            <StyledDetail>
              <StyledLabel>is_verified:</StyledLabel>
              <StyledValue>
                <STYLEDInput
                  id="is_verified"
                  defaultChecked={user.is_verified}
                  type="checkbox"
                  name="is_verified"
                  {...register("is_verified", {})}
                />
              </StyledValue>
            </StyledDetail>
            <StyledDetail>
              <StyledLabel>emailVerificationToken:</StyledLabel>
              <StyledValue>{user.emailVerificationToken}</StyledValue>
            </StyledDetail>
            <StyledDetail>
              <StyledLabel>is_admin:</StyledLabel>
              <StyledValue>
                <STYLEDInput
                  id="is_admin"
                  defaultChecked={user.is_admin}
                  type="checkbox"
                  name="is_admin"
                  {...register("is_admin", {})}
                />
              </StyledValue>
            </StyledDetail>
          </StyledCardBody>
          <div>
            <STYLEDButton type="submit">✔️</STYLEDButton>
            <STYLEDButton onClick={() => setEditMode(!editMode)}>
              ❌
            </STYLEDButton>
            <STYLEDButton>Soft Delete</STYLEDButton>
            <STYLEDButton>Hard Delete.</STYLEDButton>
          </div>
        </StyledCard>
      </form>
    );
  }

  return <>{content}</>;
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
  display: flex;
  flex: 0;
`;
