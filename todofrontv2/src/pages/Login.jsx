import { useState } from "react";

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

  return (
    <div className="login-container">
      <div className="login-container-box">
        <form>
          <h2>{isLoggedin ? "Identifiez-vous" : "Enregistrez-vous"}</h2>
          <input
            type="email"
            placeholder="Saisir votre adresse mail ici"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Saisir votre mot de passe ici"
            onChange={(e) => setPassword(e.target.value)}
          />
          {!isLoggedin && (
            <input
              type="password"
              placeholder="Confirmez votre mot de passe ici"
              onChange={(e) => setPassword2(e.target.value)}
            />
          )}
          <input
            type="submit"
            className="login-create"
            // onClick={(e) => handleSubmit(e, isLoggedin ? "login" : "signup")}
          />
          {error && <p className="login-error">{error}</p>}
        </form>

        <div className="login-options">
          <button
          onClick={() => viewLogin(false)}
          style={{ backgroundColor: !isLoggedin ? "var(--main-color)" : "var(--secondary-color)" }}
          >
            S'identifier
          </button>

          <button
          onClick={() => viewLogin(true)}
          style={{ backgroundColor: !isLoggedin ? "var(--secondary-color)" : "var(--main-color)" }}
          >
            S'enregistrer
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
