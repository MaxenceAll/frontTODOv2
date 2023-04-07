import React from "react";
import styled from 'styled-components'

function SmallTaskCard({ task }) {
  return (
    <>
      <STYLEDSmallTaskCard>
        <div>
          <input type="checkbox" defaultChecked={task.is_completed} />
          (id={task.id}){task.title}
        </div>
        <div>deadline={task.deadline_date}</div>
        <div>{task.description}</div>
        <div>Priority={task.id_priority}</div>
        <div>TodoId:{task.id_Todo}</div>
      </STYLEDSmallTaskCard>
    </>
  );
}

export default SmallTaskCard;

const STYLEDSmallTaskCard = styled.div`
display:flex;
flex-direction: column;
justify-content:center;
align-items: flex-start;
padding: 2%;
font-size:0.6rem;
background-color:var(--background-color);
`