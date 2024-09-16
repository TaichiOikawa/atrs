import styled from "styled-components";
import TodaysActivity from "../../../components/parts/TodaysActivity";
import WeeklyActivity from "../../../components/parts/WeeklyActivity";

import { useEffect, useState } from "react";

const StyledCards = styled.div`
  align-items: flex-start;
  flex-wrap: wrap;
  display: flex;
  gap: 20px 20px;
  width: 100%;
`;

type Activity = {
  attendTime: string;
  leaveTime: string;
  weeklyTime: string;
  totalTime: string;
};

function Cards() {
  const [activity, setActivity] = useState<Activity>({
    attendTime: "",
    leaveTime: "",
    weeklyTime: "00h 00min",
    totalTime: "00h 00min",
  });

  useEffect(() => {
    fetch(`/api/activity`, { method: "GET", mode: "cors" })
      .then((res) => res.json())
      .then((data) => setActivity(data));
  }, []);

  console.log(activity);

  return (
    <StyledCards>
      <TodaysActivity
        attendTime={activity.attendTime}
        leaveTime={activity.leaveTime}
      />
      <WeeklyActivity
        weeklyTime={activity.weeklyTime}
        totalTime={activity.totalTime}
      />
    </StyledCards>
  );
}

export default Cards;
