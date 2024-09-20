import styled from "styled-components";
import TimeBox from "../parts/TimeBox";

import StyledCards from "../style/StyledCards";

const StyledToday = styled.div`
  align-items: flex-start;
  align-self: stretch;
  display: flex;
  flex: 0 0 auto;
  flex-direction: column;
  gap: 4px;
  position: relative;
  width: 100%;

  & h4 {
    align-self: stretch;
    position: relative;
  }
`;

const StyledAttendTime = styled.div`
  align-items: flex-start;
  align-self: stretch;
  display: flex;
  flex: 0 0 auto;
  flex-direction: column;
  padding: 0 0.8rem;
  position: relative;
  width: 100%;

  & p {
    position: relative;
    white-space: nowrap;
    width: fit-content;
    font-size: 1.2rem;
    margin: 3px 0;
  }
`;

type TodaysActivityProps = {
  attendTime: string;
  leaveTime: string;
  todaysActivityTime: string;
};

function TodaysActivity(props: TodaysActivityProps) {
  if (props.todaysActivityTime === "") {
    var todaysActivityTime = "活動記録がありません";
    var addStyle: object = { color: "red", fontSize: "1.1rem" };
  } else {
    var todaysActivityTime = props.todaysActivityTime;
    var addStyle: object = {};
  }

  return (
    <StyledCards>
      <StyledToday>
        <h4>今日の活動記録</h4>
        <StyledAttendTime>
          <p>出席：{props.attendTime}</p>
          <p>離席：{props.leaveTime}</p>
        </StyledAttendTime>
      </StyledToday>
      <TimeBox label="活動時間" time={todaysActivityTime} addStyle={addStyle} />
    </StyledCards>
  );
}

export default TodaysActivity;
