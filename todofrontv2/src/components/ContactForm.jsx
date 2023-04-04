import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import { STYLEDButton } from "../styles/genericButton";
import {
  STYLEDContainer,
  STYLEDContainerBox,
} from "../styles/genericContainer";
import { STYLEDForm } from "../styles/genericForm";
import { STYLEDhr } from "../styles/genericHR";
import { STYLEDInput } from "../styles/genericInput";
import { STYLEDErrorMessage } from "../styles/genericParagraphError";

const ContactForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const { name, email, subject, message } = data;

    //TODO envoyer le mail en prenant ces données.
    // console.log("Nom: ", name);
    // console.log("Mail: ", email);
    // console.log("Sujet: ", subject);
    // console.log("Message: ", message);
    alert("pas encore fonctionnel !");
    toast.success(`Message envoyé avec success avec comme adresse de contact : ${data.email}`);
    reset();
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
        <STYLEDForm onSubmit={handleSubmit(onSubmit)} noValidate>
          Pour me contacter depuis le site, utilisez ce petit formulaire !

          <STYLEDhr/>

          <STYLEDInput
            type="text"
            name="name"
            {...register("name", {
              required: {
                value: true,
                message: "Merci de saisir votre nom.",
              },
              maxLength: {
                value: 30,
                message: "Un nom de plus de 30 signes, vraiment ?!",
              },
            })}
            placeholder="Votre nom ?"
          ></STYLEDInput>
          <STYLEDInput
            type="email"
            name="email"
            {...register("email", {
              required: true,
              pattern:
                /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
            })}
            placeholder="Votre adresse mail ici"
          ></STYLEDInput>
          <STYLEDInput
            type="text"
            name="subject"
            {...register("subject", {
              required: {
                value: true,
                message: "Il faut saisir un sujet.",
              },
              maxLength: {
                value: 75,
                message: "Un sujet plus court svp, moins de 75 signes.",
              },
            })}
            placeholder="Le sujet ?"
          ></STYLEDInput>
          <STYLEDInput
            height="60px"
            rows={3}
            name="message"
            {...register("message", {
              required: true,
            })}
            placeholder="Votre message ici"
          ></STYLEDInput>

          <STYLEDhr/>

          <STYLEDButton  width="80%" height="35px" type="submit">Envoyer votre message</STYLEDButton>



          <div>
            {errors.name && (
              <STYLEDErrorMessage className="errorMessage">
                {errors.name.message}
              </STYLEDErrorMessage>
            )}
            {errors.email && (
              <STYLEDErrorMessage className="errorMessage">
                Merci de saisir une adresse mail valide.
              </STYLEDErrorMessage>
            )}
            {errors.subject && (
              <STYLEDErrorMessage>{errors.subject.message}</STYLEDErrorMessage>
            )}
            {errors.message && (
              <STYLEDErrorMessage>
                Il faut saisir un message sinon ça sert à rien !
              </STYLEDErrorMessage>
            )}
          </div>
        </STYLEDForm>
      </STYLEDContainerBox>
    </STYLEDContainer>
  );
};

export default ContactForm;
