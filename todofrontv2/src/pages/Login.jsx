import { useState } from "react";
import styled from "styled-components";

function Login() {
  const [isLoggedin, setIsLoggedin] = useState(false);

  const [error, setError] = useState();

  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const viewLogin = (status) => {
    setError(null);
    setIsLoggedin(status);
  };

  function handleSubmit(e) {
    e.preventDefault();
    console.log(isLoggedin);
  }

  const handleFogottenPassword = (e) => {
    // const modal = new Modal ("#lostPasswordModal")
    // modal.show();
    alert("toto");
  };

  async function handleRenewPassword(e) {
    e.preventDefault();
  }

  return (
    <STYLEDLoginContainer>
      <STYLEDLoginContainerBox>
        <STYLEDLoginContainerBoxForm>
          <h2>{isLoggedin ? "Identifiez-vous" : "Enregistrez-vous"}</h2>
          <STYLEDInput
            type="email"
            placeholder="Saisir votre adresse mail ici"
            onChange={(e) => setEmail(e.target.value)}
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
              <STYLEDLoginCreate onClick={(e) => handleFogottenPassword(e)}>
                Mot de passe oublié ?
              </STYLEDLoginCreate>
            </>
          )}
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
            S'identifier
          </STYLEDLoginOptionsButtons>

          <STYLEDLoginOptionsButtons
            onClick={() => viewLogin(true)}
            style={{
              backgroundColor: !isLoggedin
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
`;

const STYLEDLoginCreate = styled.button`
  border: 1.5px solid var(--main-color);
  color: var(--main-color);
  background-color: var(--background-color);
  text-transform: uppercase;

  &:hover {
    border: 1.5px solid var(--background-color);
    color: var(--secondary-color);
    background-color: var(--main-color);
  }
`;
