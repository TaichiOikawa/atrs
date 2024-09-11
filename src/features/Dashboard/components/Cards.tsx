import styled from "styled-components";
import TodaysActivity from "../../../components/parts/TodaysActivity";
import WeeklyActivity from "../../../components/parts/WeeklyActivity";

const StyledCards = styled.div`
  align-items: flex-start;
  flex-wrap: wrap;
  display: flex;
  gap: 20px 20px;
  width: 100%;
`;

function Cards() {
  return (
    <StyledCards>
      <TodaysActivity />
      <WeeklyActivity />
    </StyledCards>
  );
}

export default Cards;
