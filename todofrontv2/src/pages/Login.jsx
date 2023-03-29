import { useEffect, useRef, useState } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import styled from "styled-components";

import ForgottenPasswordModal from "../components/Modals/ForgottenPasswordModal";

import { useForm } from 'react-hook-form';

function Login() {
  const [isLoggedin, setIsLoggedin] = useState(true);
  const [error, setError] = useState();
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);

  const passwordForgottenEmailInputRef = useRef(null);
  const emailInputRef = useRef(null);
  useEffect(() => {
    emailInputRef.current.focus();
    if (isModalOpen) {
      passwordForgottenEmailInputRef.current.focus();
    }
  }, [isModalOpen]);


  const viewLogin = (status) => {
    setError(null);
    setIsLoggedin(status);
  };

  function handleSubmit(e) {
    e.preventDefault();
    // console.log(isLoggedin);
  }

  const openForgottenPasswordModal = (e) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  async function handleRenewPassword(e) {
    e.preventDefault();
    alert(`Envoi d'un email à ${email}`);
    setIsModalOpen(false);
    toast.success(
      `Envoi d'un e-mail à votre adresse : ${email} ; vérifiez votre boite mail !`
    );
  }

  // console.log("render")

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <STYLEDLoginContainer>
      <STYLEDLoginContainerBox>
        <ForgottenPasswordModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        >
          <STYLEDModalContainer>
            <i>Envoyer les instructions sur l'adresse mail suivante ?</i>
            <form onSubmit={handleRenewPassword}>
              <STYLEDModalInputMail
                id="email"
                name="email"
                type="email"
                className="form-control"
                placeholder="Votre adresse email"
                onChange={(e) => setEmail(e.target.value)}
                required
                ref={passwordForgottenEmailInputRef}
              />
              <STYLEDModalButtons type="submit">Oui</STYLEDModalButtons>
              <STYLEDModalButtons
                type="button"
                onClick={() => setIsModalOpen(false)}
              >
                Non
              </STYLEDModalButtons>
            </form>
          </STYLEDModalContainer>
        </ForgottenPasswordModal>

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

        <STYLEDLoginContainerBoxForm>
          <h2>{isLoggedin ? "Identifiez-vous" : "Enregistrez-vous"}</h2>
          <STYLEDInput
            type="email"
            placeholder="Saisir votre adresse mail ici"
            onChange={(e) => setEmail(e.target.value)}
            ref={emailInputRef}
          />
          <STYLEDInput
            type="password"
            placeholder="Saisir votre mot de passe ici"
            onChange={(e) => setPassword(e.target.value)}
          />
          {!isLoggedin && (
            <>
              <STYLEDInput
                type="password"
                placeholder="Confirmez votre mot de passe ici"
                onChange={(e) => setPassword2(e.target.value)}
              />
            </>
          )}
          <STYLEDLoginCreate onClick={openForgottenPasswordModal}>
            Mot de passe oublié ?
          </STYLEDLoginCreate>

          <STYLEDSubmit
            type="submit"
            value={isLoggedin ? "S'identifier" : "S'enregistrer"}
            onClick={(e) => handleSubmit(e, isLoggedin ? "login" : "signup")}
          />

          {error && <p className="login-error">{error}</p>}
        </STYLEDLoginContainerBoxForm>

        <STYLEDLoginOptions>
          <STYLEDLoginOptionsButtons
            onClick={() => viewLogin(false)}
            style={{
              backgroundColor: !isLoggedin
                ? "var(--main-color)"
                : "var(--secondary-color)",
            }}
          >
            S'enregistrer
          </STYLEDLoginOptionsButtons>

          <STYLEDLoginOptionsButtons
            onClick={() => viewLogin(true)}
            style={{
              backgroundColor: !isLoggedin
                ? "var(--secondary-color)"
                : "var(--main-color)",
            }}
          >
            S'identifier
          </STYLEDLoginOptionsButtons>
        </STYLEDLoginOptions>
      </STYLEDLoginContainerBox>
    </STYLEDLoginContainer>
  );
}

export default Login;

const STYLEDInput = styled.input`
  color: var(--main-color);
  background-color: var(--background-color);
`;
const STYLEDSubmit = styled.input`
  color: var(--main-color);
  background-color: var(--background-color);
  &:hover {
    border: 1.5px solid var(--background-color);
    color: var(--secondary-color);
    background-color: var(--main-color);
  }
`;

const STYLEDLoginContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px;
`;

const STYLEDLoginContainerBox = styled.div`
  width: 500px;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: rgba(0, 0, 0, 0.05) 0 6px 245px, rgba(0, 0, 0, 0.08) 0 0 0 5px;
`;
const STYLEDLoginContainerBoxForm = styled.form`
  display: flex;
  flex-direction: column;
  height: 250px;
  padding: 25px;
`;
const STYLEDLoginOptions = styled.div`
  display: flex;
`;
const STYLEDLoginOptionsButtons = styled.button`
  width: 50%;
  border: none;
  padding: 10px;
  color: var(--background-color);
  text-transform:uppercase;
  font-weight: bold;
`;

const STYLEDLoginCreate = styled.button`
  border: 1.5px solid var(--main-color);
  color: var(--main-color);
  background-color: var(--background-color);

  &:hover {
    border: 1.5px solid var(--background-color);
    color: var(--secondary-color);
    background-color: var(--main-color);
  }
`;

const STYLEDModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const STYLEDModalButtons = styled.button`
  width: 100%;
  border-radius: 10px;
  color: var(--main-color);
  background-color: var(--background-color);
`;
const STYLEDModalInputMail = styled.input`
  width: 100%;
  color: var(--main-color);
  background-color: var(--background-color);
`;
