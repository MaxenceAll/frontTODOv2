import { useEffect, useRef, useState } from "react";
import { HiCheck, HiBan } from "react-icons/hi";

import fetcher from "../Helpers/fetcher"

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import styled from "styled-components";

import ForgottenPasswordModal from "../components/Modals/ForgottenPasswordModal";

import { useForm } from "react-hook-form";

{/* TODO: MAKE THIS IN 1 FORM ONLY */}
function Login() {
  const [display, setDisplay] = useState("login");

  const [email, setEmail] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const passwordForgottenEmailInputRef = useRef(null);
  const emailInputRef = useRef(null);

  useEffect(() => {
    if (emailInputRef.current) {
      emailInputRef.current.focus();
    }
    if (isModalOpen && passwordForgottenEmailInputRef.current) {
      passwordForgottenEmailInputRef.current.focus();
    }
  }, [isModalOpen]);

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

  const {
    register,
    handleSubmit,
    formState: { errors = "" },
    reset,
  } = useForm();

  const onSubmit = async(data) => {
    console.log(data);
    data.email = data.email.toLowerCase();
    const resp = await fetcher.post("login", data);
    if (!resp.result){
      toast.error(
        `Oops erreur. Retour de l'api : ${resp.message}`
      );
    }
    console.log(resp);
    reset();
  };
  const onSubmit2 = (data) => {
    data.email = data.email.toLowerCase();
    if (data.password !== data.password2) {
      console.log(errors);
      toast.error(`Oooooops les mots de passe ne correspondent pas !`);
      return
    }
    reset();
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

        {display === "login" && (
          <STYLEDLoginContainerBoxForm onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label>Adresse mail :</label>
              <STYLEDInput
              ref={emailInputRef}
                placeholder="Saisir votre adresse mail"
                type="text"
                name="email"
                {...register("email", {
                  required: "Il faut saisir une adresse mail voyons 1!",
                  pattern: {
                    value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                    message: "Adresse mail invalide",
                  },
                })}
                
              />
              {errors.email ? <HiBan /> : <HiCheck />}
            </div>
            <div>
              <label>Mot de passe :</label>
              <STYLEDInput
                placeholder="Saisir votre mot de passe"
                type="password"
                name="password"
                {...register("password", {
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
              {/* TODO: FIX THIS */}
              {errors.password ? <HiBan /> : <HiCheck />}
            </div>
            <div>
              <label></label>
              <STYLEDSubmit type="submit">S'identifier</STYLEDSubmit>
            </div>

            {errors.email && (
              <STYLEDErrorMessage>{errors.email.message}</STYLEDErrorMessage>
            )}
            {/* {errors.password?.type === "matchPattern" && (
              <p className="errorMsg">
                Password should contain at least one uppercase letter,
                lowercase letter, digit, and special symbol.
              </p>
            )} */}
            {errors.password?.type === "required" && (
              <STYLEDErrorMessage>
                Il faut saisir un mot de passe voyons !
              </STYLEDErrorMessage>
            )}
            {errors.password?.type === "checkLength" && (
              <STYLEDErrorMessage>
                Le mot de passe doit être de 4 signes minimum, bah wé.
              </STYLEDErrorMessage>
            )}
            <STYLEDSubmit onClick={openForgottenPasswordModal}>
              Mot de passe oublié ?
            </STYLEDSubmit>
          </STYLEDLoginContainerBoxForm>
        )}

        {display === "register" && (
          <STYLEDLoginContainerBoxForm onSubmit={handleSubmit(onSubmit2)}>
            <div>
              <label>Adresse mail :</label>
              <STYLEDInput
              ref={emailInputRef}
                placeholder="Saisir votre adresse mail"
                type="text"
                name="email"
                {...register("email", {
                  required: "Il faut saisir une adresse mail voyons !",
                  pattern: {
                    value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                    message: "Adresse mail invalide",
                  },
                })}
              />
              {errors.email ? <HiBan /> : <HiCheck />}
            </div>
            <div>
              <label>Mot de passe :</label>
              <STYLEDInput
                placeholder="Saisir votre mot de passe"
                type="password"
                name="password"
                {...register("password", {
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
              {errors.password ? <HiBan /> : <HiCheck />}
            </div>

            <div>
              <label>------------ :</label>
              <STYLEDInput
                placeholder="Valider votre mot de passe"
                type="password"
                name="password2"
                {...register("password2", {
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
              {/* TODO: FIX THIS */}
              {errors.password2 ? <HiBan /> : <HiCheck />}
            </div>

            <div>
              <label></label>
              <STYLEDSubmit type="submit">S'enregistrer</STYLEDSubmit>
            </div>

            {errors.email && (
              <STYLEDErrorMessage>{errors.email.message}</STYLEDErrorMessage>
            )}
            {/* {errors.password?.type === "matchPattern" && (
              <p className="errorMsg">
                Password should contain at least one uppercase letter,
                lowercase letter, digit, and special symbol.
              </p>
            )} */}
            {errors.password?.type === "required" && (
              <STYLEDErrorMessage>
                Il faut saisir un mot de passe voyons !
              </STYLEDErrorMessage>
            )}
            {errors.password?.type === "checkLength" && (
              <STYLEDErrorMessage>
                Le mot de passe doit être de 4 signes minimum, bah wé.
              </STYLEDErrorMessage>
            )}
            {/* {errors.password2?.type === "matchPattern" && (
              <p className="errorMsg">
                Password should contain at least one uppercase letter,
                lowercase letter, digit, and special symbol.
              </p>
            )} */}
            {errors.password2?.type === "required" && (
              <STYLEDErrorMessage>
                Il faut saisir un mot de passe voyons !
              </STYLEDErrorMessage>
            )}
            {errors.password2?.type === "checkLength" && (
              <STYLEDErrorMessage>
                Le mot de passe doit être de 6 signes, bah wé.
              </STYLEDErrorMessage>
            )}
            <STYLEDSubmit onClick={openForgottenPasswordModal}>
              Mot de passe oublié ?
            </STYLEDSubmit>
          </STYLEDLoginContainerBoxForm>
        )}

        <STYLEDLoginOptions>
          <STYLEDLoginOptionsButtons
            onClick={() => setDisplay("login")}
            style={{
              backgroundColor:
                display === "login"
                  ? "var(--main-color)"
                  : "var(--background-color)",
              color:
                display === "login"
                  ? "var(--secondary-color)"
                  : "var(--main-color)",
            }}
          >
            S'identifier
          </STYLEDLoginOptionsButtons>
          <STYLEDLoginOptionsButtons
            onClick={() => setDisplay("register")}
            style={{
              backgroundColor:
                display === "register"
                  ? "var(--main-color)"
                  : "var(--background-color)",
              color:
                display === "register"
                  ? "var(--secondary-color)"
                  : "var(--main-color)",
            }}
          >
            S'enregistrer
          </STYLEDLoginOptionsButtons>
        </STYLEDLoginOptions>
      </STYLEDLoginContainerBox>
    </STYLEDLoginContainer>
  );
}

export default Login;

const STYLEDLoginContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin: 20px;
`;
const STYLEDLoginContainerBox = styled.div`
  width: 100%;
  max-width: 500px;
  border-radius: 15px;

  overflow: hidden;
  box-shadow: rgba(0, 0, 0, 0.05) 0 6px 245px, rgba(0, 0, 0, 0.08) 0 0 0 5px;
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

const STYLEDLoginContainerBoxForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-height: 250px;
  padding: 25px;
  display: flex;
`;

const STYLEDErrorMessage = styled.p`
  color: red;
  background-color: lightcoral;
`;
const STYLEDLoginOptions = styled.div`
  display: flex;
`;
const STYLEDLoginOptionsButtons = styled.button`
  width: 50%;
  border: none;
  padding: 10px;
  color: var(--background-color);
  text-transform: uppercase;
  font-weight: bold;
  &:hover {
    color: var(--background-color) !important;
    background-color: var(--main-color) !important;
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
