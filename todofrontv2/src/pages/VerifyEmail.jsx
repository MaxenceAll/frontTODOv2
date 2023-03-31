import React from "react";
import fetcher from "../Helpers/fetcher";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ButtonReturnToLogin from "../components/ButtonReturnToLogin";
import { useLocation } from "react-router-dom";

function VerifyEmail() {

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get("t");

  console.log(token)

  const handleClick = async () => {
    try {
      const resp = await fetcher.post(`verify-email`, { token });
      console.log(resp);
      if (resp.result){
        toast.success(<ButtonReturnToLogin msg="Validation de votre compte avec success !"/>);
      }else{
        toast.error(`Oops erreur, retour de l'api : ${resp.message}`)
      }
    } catch (error) {
      console.error(error);
      toast.error(`Oops erreur, retour de l'api : ${error.message}`)
    }
  };

  return (
    <>
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
      <div>Yo there, token is : {token} </div>
      <button onClick={handleClick}>Valider en cliquant ici</button>
    </>
  );
}

export default VerifyEmail;
