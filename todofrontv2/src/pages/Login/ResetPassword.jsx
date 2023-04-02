import { useForm } from "react-hook-form";
import { HiCheck, HiBan } from "react-icons/hi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSearchParams } from "react-router-dom";
import ButtonReturnToLogin from "../../components/Tools/ButtonReturnToLogin";
import fetcher from "../../Helpers/fetcher";
import {
  STYLEDContainer,
  STYLEDContainerBox,
} from "../../styles/genericContainer";
import { STYLEDForm } from "../../styles/genericForm";
import { STYLEDButton } from "../../styles/genericButton";
import { STYLEDhr } from "../../styles/genericHR";
import { STYLEDErrorMessage } from "../../styles/genericParagraphError";
import { STYLEDInput } from "../../styles/genericInput";

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
    console.log(token);
    console.log(data.token);
    const resp = await fetcher.post("reset", data);
    console.log(resp);
    if (resp.result) {
      toast.success(
        <ButtonReturnToLogin
          msg={"Modification de votre mot de passe avec succes !"}
        />
      );
      // navigate("/login"); //TODO TROUVER UNE SOLUTION POUR AFFICHER LE MSG AVANT DE NAVIGATE Ou apres
    } else {
      toast.error(`Oops erreur, retour de l'api : ${resp.message}`);
    }
  };

  return (
    <STYLEDContainer>
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

      <STYLEDContainerBox>
        <STYLEDForm onSubmit={handleSubmit(onSubmit)}>
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
                {/* {errors.pincode?.type === "matchPattern" && (
              <STYLEDErrorMessage>
                Doit contenir au moins une Majuscule,
                une minuscule, une chiffre et un caractère spécial..
              </STYLEDErrorMessage>
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

          <STYLEDhr />

                {/* {errors.pincode?.type === "matchPattern" && (
              <STYLEDErrorMessage>
                Doit contenir au moins une Majuscule,
                une minuscule, une chiffre et un caractère spécial..
              </STYLEDErrorMessage>
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

          <STYLEDButton type="submit" width="40%">
            Valider
          </STYLEDButton>
        </STYLEDForm>
      </STYLEDContainerBox>
    </STYLEDContainer>
  );
}

export default ResetPassword;
