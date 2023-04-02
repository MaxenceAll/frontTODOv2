import { useContext } from "react";
import { AuthContext } from "../Contexts/AuthContext";
import { useGetAllTodos } from "../features/todosSlice";


// TESTS AVEC RTK QUERIES (de redux)
export const Home = () => {

    const { auth, setAuth } = useContext(AuthContext);
    console.log(auth);


  const {
    data: allTodos,
    error,
    isError,
    isLoading,
    isSuccess,
  } = useGetAllTodos();

//   console.log(useGetAllTodos());
//   console.log(allTodos);

  let content;
  if (isSuccess) {
    content = (
        <ul>
          {allTodos?.data?.map((item) => (
            <li key={item.id}>{item.title} : {item.description}</li>
          )) ?? null}
        </ul>
      );
  }
  if (isError) {
    content = (
      <div>
        <h1>Error numéro : {error.status}</h1>
        <p>Retour de l'api : {error.data?.message ?? 'Oops une erreur inconnue'}</p>
      </div>
    )
  }

  if (isLoading) return <h1> Loading...</h1>;
  return (
    <>
      <div> Coucou {auth?.data?.email} , voici vos todos:</div>
      <div>{content}</div>
    </>
  );
};
