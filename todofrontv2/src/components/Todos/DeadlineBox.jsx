import React from "react";
import styled from "styled-components";
import { format, differenceInMinutes, differenceInHours, differenceInDays, differenceInMonths } from "date-fns";
import { fr } from "date-fns/locale";
import { STYLEDErrorMessage } from "../../styles/genericParagraphError";

function DeadlineBox(props) {
  // console.log (props)
  if (props.deadline === "" || props.deadline === "0000-00-00 00:00:00" || props.deadline === null ) {
    return <STYLEDErrorMessage>Double-click pour ajouter une dead-line.</STYLEDErrorMessage>;
  }
  const deadlineTimestamp = new Date(props.deadline).getTime();
  const currentTimestamp = Date.now();
  const diffInMinutes = differenceInMinutes(deadlineTimestamp, currentTimestamp);
  const diffInHours = differenceInHours(deadlineTimestamp, currentTimestamp);
  const diffInDays = differenceInDays(deadlineTimestamp, currentTimestamp);
  const diffInMonths = differenceInMonths(deadlineTimestamp, currentTimestamp);

  // const totalDiff = diffInMinutes + diffInHours * 60 + diffInDays * 24 * 60 + diffInMonths * 30 * 24 * 60;
  // const progress = Math.max(0, Math.min(100, Math.floor(((24 * 60 * 30) - totalDiff) / (24 * 60 * 30) * 100)));
  // const reversedProgress = 100 - progress;

  const formattedDate = format(new Date(props.deadline), "dd/MM/yy HH:mm:ss", { locale: fr });

  return (
    <BoxContainer
    // progress={reversedProgress}
    >
      <DeadlineText>{formattedDate} -</DeadlineText>
      <span>
        {diffInMonths > 0 && `${diffInMonths} mois `}
        {diffInDays > 1 && `${diffInDays % 30} jour${diffInDays % 30 > 1 ? "s" : ""} `}
        {diffInMonths <= 1 && diffInDays <= 1 && `${diffInHours % 24} heure${diffInHours % 24 > 1 ? "s" : ""} `}
        {(diffInMonths <= 1 && diffInDays <= 1) && `${diffInMinutes % 60} minute${diffInMinutes % 60 > 1 ? "s" : ""} `}
        restants
      </span>
    </BoxContainer>
  );
}

export default DeadlineBox;


const BoxContainer = styled.div`
font-size: 0.7rem;
  /* width: 100%; */
  /* background-clip: padding-box;
  background-image: linear-gradient(
    to right,
    var(--main-color),
    var(--background-color)
    );
    background-size: ${(props) => props.progress}% 100%;
    background-repeat: no-repeat;
    background-color: var(--background-color); */
`;

const ProgressContainer = styled.div`
  height: 5px;
  width: 100%;
  background-color: var(--secondary-color);
`;

const ProgressBar = styled.div`
  height: 100%;
  width: ${({ progress }) => progress}%;
  background-color: var(--main-color);
`;

const DeadlineText = styled.span`
  margin-right: 5px;
`;