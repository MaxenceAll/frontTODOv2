import React from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { HiCheck, HiBan } from "react-icons/hi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSearchParams } from "react-router-dom";
import fetcher from "../Helpers/fetcher";
import ButtonReturnToLogin from "../components/ButtonReturnToLogin";

function ResetPassword() {

  let [searchParams] = useSearchParams();

  const {
    register,
    handleSubmit,
    formState: { errors = "" },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);

    if (data.pincode1 !== data.pincode2) {
      toast.error(`Oooooops les mots de passe ne correspondent pas !`);
      return;
    }
    const token = searchParams.get("t");
    data.token = token;
    console.log(token)
    console.log(data.token)
    const resp = await fetcher.post("reset", data);
    console.log(resp);
    if (resp.result) {
      console.log("sucess!");
      toast.success(<ButtonReturnToLogin msg={"Modification de votre mot de passe avec succes !"}/>);
      // navigate("/login"); //TODO TROUVER UNE SOLUTION POUR AFFICHER LE MSG AVANT DE NAVIGATE Ou apres
    } else {
      console.log("not a sucess :(");
      toast.error(`Oops erreur, retour de l'api : ${resp.message}`);
    }
  };

  return (
    <STYLEDResetContainer>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        toastStyle={{
          backgroundColor: "var(--background-color)",
          color: "var(--main-color)",
        }}
      />

      <STYLEDResetContainerBox>
        <STYLEDResetContainerBoxForm onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="pincode1">Saisir votre nouveau mot de passe :</label>
          <STYLEDInput
            placeholder="Saisir votre mot de passe"
            autoComplete="current-password"
            type="password"
            name="pincode1"
            {...register("pincode1", {
              required: true,
              validate: {
                checkLength: (value) => value.length >= 4,
                // matchPattern: (value) =>
                //   /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s)(?=.*[!@#$*])/.test(
                //     value
                //   ),
              },
            })}
          />
          {errors.pincode1 ? <HiBan /> : <HiCheck />}
          {/* {errors.pincode1?.type === "matchPattern" && (
              <p className="errorMsg">
                Password should contain at least one uppercase letter,
                lowercase letter, digit, and special symbol.
              </p>
            )} */}
          {errors.pincode1?.type === "required" && (
            <STYLEDErrorMessage>
              Il faut saisir un mot de passe voyons !
            </STYLEDErrorMessage>
          )}
          {errors.pincode1?.type === "checkLength" && (
            <STYLEDErrorMessage>
              Le mot de passe doit être de 4 signes minimum, bah wé.
            </STYLEDErrorMessage>
          )}

          {/* ///////////////////////////////////////////// */}

          <label htmlFor="pincode2">Valider votre nouveau mot de passe :</label>
          <STYLEDInput
            placeholder="Valider votre mot de passe"
            autoComplete="current-password"
            type="password"
            name="pincode2"
            {...register("pincode2", {
              required: true,
              validate: {
                checkLength: (value) => value.length >= 4,
                // matchPattern: (value) =>
                //   /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s)(?=.*[!@#$*])/.test(
                //     value
                //   ),
              },
            })}
          />
          {errors.pincode2 ? <HiBan /> : <HiCheck />}
          {/* {errors.pincode?.type === "matchPattern" && (
              <p className="errorMsg">
                Password should contain at least one uppercase letter,
                lowercase letter, digit, and special symbol.
              </p>
            )} */}
          {errors.pincode2?.type === "required" && (
            <STYLEDErrorMessage>
              Il faut saisir un mot de passe voyons !
            </STYLEDErrorMessage>
          )}
          {errors.pincode2?.type === "checkLength" && (
            <STYLEDErrorMessage>
              Le mot de passe doit être de 4 signes minimum, bah wé.
            </STYLEDErrorMessage>
          )}

          <STYLEDSubmit type="submit">Valider</STYLEDSubmit>
        </STYLEDResetContainerBoxForm>
      </STYLEDResetContainerBox>
    </STYLEDResetContainer>
  );
}

export default ResetPassword;

const STYLEDResetContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin: 20px;
`;
const STYLEDResetContainerBox = styled.div`
  width: 100%;
  max-width: 500px;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: rgba(0, 0, 0, 0.05) 0 6px 245px, rgba(0, 0, 0, 0.08) 0 0 0 5px;
`;

const STYLEDResetContainerBoxForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 250px;
  padding: 25px;
  display: flex;
`;

const STYLEDInput = styled.input`
  color: var(--main-color);
  background-color: var(--background-color);
`;
const STYLEDSubmit = styled.button`
  color: var(--main-color);
  background-color: var(--background-color);
  &:hover {
    color: var(--secondary-color);
    background-color: var(--main-color);
  }
`;

const STYLEDErrorMessage = styled.p`
  color: red;
  background-color: lightcoral;
`;
