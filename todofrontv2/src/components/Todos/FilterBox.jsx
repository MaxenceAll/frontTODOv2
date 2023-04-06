import { useContext, useState } from "react";
import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  BsSortDown,
  BsSortUpAlt,
  BsSuitHeartFill,
  BsSuitHeart,
  BsFileCheck,
  BsFileEarmarkBreak,
  BsSortAlphaDown,
  BsSortAlphaUpAlt,
  BsSortNumericDownAlt,
  BsSortNumericUpAlt,
  BsSortNumericUp,
  BsUpload,
} from "react-icons/bs";
import { STYLEDButton } from "../../styles/genericButton";
import { useCreateTodoMutation } from "../../features/todosSlice";
import { STYLEDInput } from "../../styles/genericInput";
import { AuthContext } from "../../Contexts/AuthContext";
import { STYLEDForm } from "../../styles/genericForm";

function FilterBox({
  sortOrderById,
  setSortOrderById,
  showFavorites,
  setShowFavorites,
  sortOrderByProgress,
  setSortOrderByProgress,
  showCompleted,
  setShowCompleted,
  numTodos,
  completedTodos,
  FcAddColumn,
}) {
  const [ascendingById, setAscendingById] = useState(true);
  const [ascendingByProgress, setAscendingByProgress] = useState(true);

  // FILTERS :
  const handleSortOrderByIdToggle = () => {
    setAscendingById(!ascendingById);
    setSortOrderById(ascendingById ? "desc" : "asc");
    setSortOrderByProgress("");
    toast.success(
      `Filtrage : + ${
        ascendingById ? "récent en premier" : "vieux en premier."
      }`
    );
  };
  const handleSortOrderByProgressToggle = () => {
    setAscendingByProgress(!ascendingByProgress);
    setSortOrderByProgress(ascendingByProgress ? "desc" : "asc");
    setSortOrderById("");
    toast.success(
      `Filtrage du  ${
        ascendingByProgress
          ? "+ completé au - completé."
          : "- completé au + completé."
      }`
    );
  };
  const handleShowFavoritesToggle = () => {
    setShowFavorites(!showFavorites);
    toast.success(
      `${
        !showFavorites
          ? "Filtrage de vos favoris."
          : "Affichage de tous vos todos."
      }`
    );
  };
  const handleShowCompletedToggle = () => {
    setShowCompleted(!showCompleted);
    toast.success(
      `${
        !showCompleted
          ? "Filtrage des terminées."
          : "Affichage de tous vos todos."
      }`
    );
  };

  const resetAllFilters = () => {
    setSortOrderByProgress("");
    setSortOrderById("");
    setShowFavorites(false);
    setShowCompleted(false);
    setAscendingById(true);
    setAscendingByProgress(true);
    toast.info("Remise à zéro des filtres.");
  };

  // NEW TODO
  const { auth, setAuth } = useContext(AuthContext);
  const [createTodo, { isLoading }] = useCreateTodoMutation();
  const [newTodoTitle, setNewTodoTitle] = useState("");
  const [newTodoDesc, setNewTodoDesc] = useState("");

  const handleSubmitNewTodo = (e) => {
    e.preventDefault();
    if (newTodoTitle && newTodoDesc) {
      createTodo({
        id_customer: auth?.data?.id,
        title: newTodoTitle,
        description: newTodoDesc,
      });
      setNewTodoTitle("");
      setNewTodoDesc("");
      toast.success(`Ajout de la todo ${newTodoTitle} avec succes !`);
    } else {
      toast.error(`Oops merci de remplir le petit formulaire en entier !`);
    }
  };

  const newTodoSection = (
    <STYLEDFormNewTodo onSubmit={handleSubmitNewTodo}>
      <STYLEDLabelFormNewTodo htmlFor="new-todo-title">
        Son nom ?
      </STYLEDLabelFormNewTodo>
      <div>
        <STYLEDInput
          type="text"
          id="new-todo-title"
          value={newTodoTitle}
          onChange={(e) => setNewTodoTitle(e.target.value)}
          placeholder="Le nom de la TODO ?"
          disabled={isLoading}
        />
      </div>
      <STYLEDLabelFormNewTodo htmlFor="new-todo-desc">
        Sa description ?
      </STYLEDLabelFormNewTodo>
      <div>
        <STYLEDInput
          type="text"
          id="new-todo-desc"
          value={newTodoDesc}
          onChange={(e) => setNewTodoDesc(e.target.value)}
          placeholder="La description de la TODO ?"
          disabled={isLoading}
        />
        {isLoading && " Loading..."}
      </div>
      <STYLEDButton width="80%">
        <BsUpload />
      </STYLEDButton>
    </STYLEDFormNewTodo>
  );

  // Gestion ouverture filterbox
  const [filterBox, setFilterBox] = useState(false);
  const toggleFilterBox = () => {
    setFilterBox((prevFilterBox) => !prevFilterBox);
    if (filterBox) {
      toast.info("Ouverture de la filter box !");
    } else {
      toast.info("Fermeture de la filter box !");
    }
  };

  return (
    <STYLEDFilterboxContainer>
      {/*  TODO Trouver un moyen de déplacer cette logique ailleurs (main.jsx ?) */}
      <ToastContainer
        position="bottom-center"
        autoClose={1000}
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
      <STYLEDFilterBoxContainerBox>
        {filterBox ? (
          <>
            <div>
              <div>
                <u>Trier:</u>
                <div>
                  <STYLEDFilterBoxButton
                    isActiveFilter={!ascendingById ? "active" : ""}
                    onClick={handleSortOrderByIdToggle}
                  >
                    {ascendingById ? <BsSortUpAlt /> : <BsSortDown />}
                  </STYLEDFilterBoxButton>
                </div>
                <div>
                  <STYLEDFilterBoxButton
                    isActiveFilter={!ascendingByProgress ? "active" : ""}
                    onClick={handleSortOrderByProgressToggle}
                  >
                    {ascendingByProgress ? (
                      <BsSortNumericDownAlt />
                    ) : (
                      <BsSortNumericUp />
                    )}
                  </STYLEDFilterBoxButton>
                </div>
                <STYLEDButton onClick={resetAllFilters}>Reset</STYLEDButton>
              </div>

              <div>
                <u>Filtrer:</u>
                <div>
                  <STYLEDFilterBoxButton
                    isActiveFilter={showFavorites ? "active" : ""}
                    onClick={handleShowFavoritesToggle}
                  >
                    {showFavorites ? <BsSuitHeartFill /> : <BsSuitHeart />}
                  </STYLEDFilterBoxButton>
                </div>
                <div>
                  <STYLEDFilterBoxButton
                    isActiveFilter={showCompleted ? "active" : ""}
                    onClick={handleShowCompletedToggle}
                  >
                    {showCompleted ? <BsFileEarmarkBreak /> : <BsFileCheck />}
                  </STYLEDFilterBoxButton>
                </div>
                <STYLEDButton onClick={resetAllFilters}>Reset</STYLEDButton>
              </div>
            </div>

            <div>
              <u>Informations :</u>
              <p>
                {/* Illisible mais tellement beau ! ☺*/}
                {numTodos === 0
                  ? "Aucune todo !"
                  : numTodos === 1
                  ? "Todo trouvée."
                  : `${numTodos} Todos trouvées.`}
              </p>
              <p>
                {completedTodos.length === 0
                  ? "Aucune todo !"
                  : completedTodos.length === 1
                  ? `${completedTodos.length}/${numTodos} completée. (${(
                      (completedTodos.length / numTodos) *
                      100
                    ).toFixed(0)}%)`
                  : `${completedTodos.length}/${numTodos} completées. (${(
                      (completedTodos.length / numTodos) *
                      100
                    ).toFixed(0)}%)`}
              </p>

              <div>
                <p>
                  <u>Création d'une TODO:</u>
                </p>
                {newTodoSection}
              </div>
            </div>
          </>
        ) : (
          <p></p>
        )}

        {!filterBox && (
          <STYLEDOpenFilterBoxButton onClick={toggleFilterBox}>
            Ouvrir la boite 🡃 à outils.
          </STYLEDOpenFilterBoxButton>
        )}
        {filterBox && (
          <STYLEDCloseFilterBoxButton onClick={toggleFilterBox}>
            🠽
          </STYLEDCloseFilterBoxButton>
        )}
      </STYLEDFilterBoxContainerBox>
    </STYLEDFilterboxContainer>
  );
}

export default FilterBox;

const STYLEDBoiteAOutilContainer = styled.div``;

const STYLEDOpenFilterBoxButton = styled.button`
  width: 100%;
  height: 25px;

  font-size: 1rem;
  position: absolute;
  top: -1%;

  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  color: var(--main-color);
  background-color: var(--background-color);
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover {
    color: var(--secondary-color);
    background-color: var(--main-color);
    transform: translateY(-3px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  }
`;

const STYLEDCloseFilterBoxButton = styled.button`
  width: 100%;
  height: 10px;

  font-size: 1rem;
  position: absolute;
  bottom: 0%;

  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  color: var(--main-color);
  background-color: var(--background-color);
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover {
    color: var(--secondary-color);
    background-color: var(--main-color);
    transform: translateY(-1px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  }
`;

const STYLEDFormNewTodo = styled.form`
  transition: all 0.3s ease;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;
const STYLEDLabelFormNewTodo = styled.label`
  font-size: 0.8rem;
  font-style: italic;
`;
const STYLEDFilterboxContainer = styled.div`
  /* pour gèrer le focus sur double click */
  user-select: none;

  display: flex;
  justify-content: center;
  flex-direction: row;
  align-items: center;
  border: 2px groove var(--main-color);
  margin-bottom: 5%;
`;

const STYLEDFilterBoxContainerBox = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  flex-direction: row;
  align-items: center;

  width: 100%;

  border-radius: 15px;
  /* box-shadow: rgba(0, 0, 0, 0.05) 0 6px 245px, rgba(0, 0, 0, 0.08) 0 0 0 5px; */
  /* padding: 3%;

  padding-top: 5%;
  margin-bottom: 3%; */
`;

const STYLEDFilterBoxButton = styled.button`
  font-size: 1.5rem;

  width: ${(props) => props.width || ""};
  height: ${(props) => props.height || ""};
  border-radius: 10px;
  color: var(--main-color);
  background-color: var(--background-color);

  cursor: pointer;

  transition: all 0.3s ease;

  &:hover {
    color: var(--secondary-color);
    background-color: var(--main-color);

    transform: translateY(-3px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  }

  // SPECIAL page filterbox:
  background-color: ${(props) =>
    props.isActiveFilter ? "var(--main-color)" : "var(--secondary-color)"};
  color: ${(props) =>
    props.isActiveFilter ? "var(--secondary-color)" : "var(--main-color)"};

  transform: ${(props) => (props.isActiveFilter ? "translateY(-3px)" : "")};

  box-shadow: ${(props) =>
    props.isActiveFilter ? "0 14px 16px rgba(0, 0, 0, 0.2)" : ""};
`;
