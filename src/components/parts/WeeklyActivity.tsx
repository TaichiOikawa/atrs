import TimeBox from "../atoms/TimeBox";

import StyledCards from "../style/StyledCards";

type WeeklyActivityProps = {
  weeklyTime: string | "00h 00min";
  totalTime: string | "00h 00min";
};

function WeeklyActivity(props: WeeklyActivityProps) {
  return (
    <StyledCards>
      <TimeBox label="今週の活動時間" time={props.weeklyTime} />
      <TimeBox label="累計活動時間" time={props.totalTime} />
    </StyledCards>
  );
}

export default WeeklyActivity;
