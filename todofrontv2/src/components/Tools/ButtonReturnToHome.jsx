import { useNavigate } from "react-router-dom";
import { STYLEDButton } from "../../styles/genericButton";

function ButtonReturnToHome() {
  const navigate = useNavigate();
  return (
    <>
      <p>Identification avec succes !</p>
      <STYLEDButton onClick={() => navigate("/")}>
        Retour à la page principale.
      </STYLEDButton>
    </>
  );
}

export default ButtonReturnToHome;

