import { useNavigate } from "react-router-dom";
import { STYLEDButton } from "../../styles/genericButton";

function ButtonReturnToLogin(props) {
  const navigate = useNavigate();
  return (
    <>
      <p>{props.msg}</p>
      <STYLEDButton onClick={() => navigate("/login")}>
        Retour à la page de login
      </STYLEDButton>
    </>
  );
}

export default ButtonReturnToLogin;
