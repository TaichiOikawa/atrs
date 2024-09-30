import TimeBox from "../parts/TimeBox";

import StyledCards from "../style/StyledCards";
type WeeklyActivityProps = {
  weeklyTime: string | null;
  totalTime: string | null;
};

function WeeklyActivity(props: WeeklyActivityProps) {
  return (
    <StyledCards>
      <TimeBox label="今週の活動時間" time={props.weeklyTime || "00h 00min"} />
      <TimeBox label="累計活動時間" time={props.totalTime || "00h 00min"} />
    </StyledCards>
  );
}

export default WeeklyActivity;
