import TimeBox from "../atoms/TimeBox";

import StyledCards from "../style/StyledCards";

function WeeklyActivity() {
  return (
    <StyledCards>
      <TimeBox label="今週の活動時間" time="00h 00min" />
      <TimeBox label="累計活動時間" time="00h 00min" />
    </StyledCards>
  );
}

export default WeeklyActivity;
