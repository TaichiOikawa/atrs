import styled from "styled-components";
import TimeBox from "../atoms/TimeBox";

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
    margin-top: -1px;
    font-size: 1.4em;
    margin: 0;
  }
`;

const StyledAttendTime = styled.div`
  align-items: flex-start;
  align-self: stretch;
  display: flex;
  flex: 0 0 auto;
  flex-direction: column;
  padding: 0 15px;
  position: relative;
  width: 100%;

  & p {
    position: relative;
    white-space: nowrap;
    width: fit-content;
    font-size: 1.2em;
    margin: 3px 0;
  }
`;

type TodaysActivityProps = {
  attendTime: string | "";
  leaveTime: string | "";
};

function TodaysActivity(props: TodaysActivityProps) {
  const todaysActivityTime = "00h 00min";

  return (
    <StyledCards>
      <StyledToday>
        <h4>今日の活動記録</h4>
        <StyledAttendTime>
          <p>出席時間：{props.attendTime}</p>
          <p>離席時間：{props.leaveTime}</p>
        </StyledAttendTime>
      </StyledToday>
      <TimeBox label="活動時間" time={todaysActivityTime} />
    </StyledCards>
  );
}

export default TodaysActivity;
