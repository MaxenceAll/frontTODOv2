import { STYLEDContainer } from "../../styles/genericContainer";
import { STYLEDhr } from "../../styles/genericHR";
import styled from "styled-components";

function DashboardHeader() {
  return (
    <>
      <STYLEDDashboardHeader>
        <p>
          : Ici vous pouvez gèrer vos tâches de manière plus simple/ rapide
          De plus si vous êtes un admin, vous pouvez gèrer la totalité des
          données de la base de donnée. :
        </p>
      </STYLEDDashboardHeader>
      <STYLEDhr />
    </>
  );
}

export default DashboardHeader;

const STYLEDDashboardHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5%;
`;
