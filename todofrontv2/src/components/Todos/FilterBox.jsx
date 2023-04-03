import { useState } from "react";
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
} from "react-icons/bs";
import { STYLEDButton } from "../../styles/genericButton";

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
}) {
  const [ascendingById, setAscendingById] = useState(true);
  const [ascendingByProgress, setAscendingByProgress] = useState(true);

  const handleSortOrderByIdToggle = () => {
    setAscendingById(!ascendingById);
    setSortOrderById(ascendingById ? "desc" : "asc");
    setSortOrderByProgress("");
    toast.success(
      `Filtrage : + ${
        ascendingById ? "ancien au + récent." : "récent au + ancien."
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

  return (
    <STYLEDTodoContainer>
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

      <STYLEDTodoContainerBox>
        <div>
          <div>
            <u>Trier :</u>
            <div>
              <STYLEDTodoButton
                isActiveFilter={!ascendingById ? "active" : ""}
                onClick={handleSortOrderByIdToggle}
              >
                {ascendingById ? <BsSortUpAlt /> : <BsSortDown />}
              </STYLEDTodoButton>
            </div>

            <div>
              <STYLEDTodoButton
                isActiveFilter={!ascendingByProgress ? "active" : ""}
                onClick={handleSortOrderByProgressToggle}
              >
                {ascendingByProgress ? (
                  <BsSortNumericDownAlt />
                ) : (
                  <BsSortNumericUp />
                )}
              </STYLEDTodoButton>
            </div>
            <STYLEDButton onClick={resetAllFilters}>Reset</STYLEDButton>
          </div>
          <div>
            <u>Filtrer :</u>
            <div>
              <STYLEDTodoButton
                isActiveFilter={showFavorites ? "active" : ""}
                onClick={handleShowFavoritesToggle}
              >
                {showFavorites ? <BsSuitHeartFill /> : <BsSuitHeart />}
              </STYLEDTodoButton>
            </div>

            <div>
              <STYLEDTodoButton
                isActiveFilter={showCompleted ? "active" : ""}
                onClick={handleShowCompletedToggle}
              >
                {showCompleted ? <BsFileEarmarkBreak /> : <BsFileCheck />}
              </STYLEDTodoButton>
            </div>
          </div>
          <STYLEDButton onClick={resetAllFilters}>Reset</STYLEDButton>
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
        </div>
      </STYLEDTodoContainerBox>
    </STYLEDTodoContainer>
  );
}

export default FilterBox;

const STYLEDTodoContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
  align-items: center;
`;

const STYLEDTodoContainerBox = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  max-width: 500px;
  border-radius: 15px;
  box-shadow: rgba(0, 0, 0, 0.05) 0 6px 245px, rgba(0, 0, 0, 0.08) 0 0 0 5px;
  padding: 3%;
`;

const STYLEDTodoButton = styled.button`
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

  // SPECIAL page :
  background-color: ${(props) =>
    props.isActiveFilter ? "var(--main-color)" : "var(--secondary-color)"};
  color: ${(props) =>
    props.isActiveFilter ? "var(--secondary-color)" : "var(--main-color)"};

  transform: ${(props) => (props.isActiveFilter ? "translateY(-3px)" : "")};

  box-shadow: ${(props) =>
    props.isActiveFilter ? "0 14px 16px rgba(0, 0, 0, 0.2)" : ""};
`;
