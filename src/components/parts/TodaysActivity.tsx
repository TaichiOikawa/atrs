import styled from "styled-components";
import TimeBox from "../atoms/TimeBox";

const StyledTodaysActivity = styled.div`
  align-items: flex-start;
  background-color: #e7f3ff;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  justify-content: center;
  padding: 20px 15px;
  position: relative;
  width: 100%;
`;

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
  margin: 0;

  & p {
    position: relative;
    white-space: nowrap;
    width: fit-content;
    font-size: 1.2em;
  }
`;

function TodaysActivity() {
  return (
    <StyledTodaysActivity>
      <StyledToday>
        <h4>今日の活動記録</h4>
        <StyledAttendTime>
          <p>出席時間：</p>
          <p>離席時間：</p>
        </StyledAttendTime>
      </StyledToday>
      <TimeBox label="活動時間" time="00h 00min" />
    </StyledTodaysActivity>
  );
}

export default TodaysActivity;
