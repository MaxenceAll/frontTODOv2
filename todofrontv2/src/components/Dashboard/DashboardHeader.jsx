import { STYLEDContainer } from "../../styles/genericContainer";
import { STYLEDhr } from "../../styles/genericHR";
import styled from 'styled-components'

function DashboardHeader() {
  return (
    <>
      <STYLEDDashboardHeader>: Dashboard header here :</STYLEDDashboardHeader>
      <STYLEDhr />
    </>
  );
}

export default DashboardHeader;

const STYLEDDashboardHeader = styled.div`

display:flex;
justify-content:center;
align-items:center;
padding: 5%; 

`