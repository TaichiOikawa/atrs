import styled from "styled-components";
import TodaysActivity from "../../../components/layout/TodaysActivity";
import WeeklyActivity from "../../../components/layout/WeeklyActivity";
import { ActivityType } from "../../../types/activity";

const StyledCards = styled.div`
  align-items: flex-start;
  flex-wrap: wrap;
  display: flex;
  gap: 20px 20px;
  width: 100%;
`;

type CardsProps = {
  activity: ActivityType;
};

function Cards({ activity }: CardsProps) {
  console.log("Cardsが再描画されました");

  return (
    <StyledCards>
      <TodaysActivity
        attendTime={activity.attendTime}
        leaveTime={activity.leaveTime}
        todaysActivityTime={activity.activityTime}
      />
      <WeeklyActivity
        weeklyTime={activity.weeklyTime}
        totalTime={activity.totalTime}
      />
    </StyledCards>
  );
}

export default Cards;
