import styled from "styled-components";

type TimeBoxProps = {
  label: string;
  time: string;
  addStyle?: object;
};

const StyledTimeBox = styled.div`
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  gap 4px;
  position: relative;
  width: 100%;

  & h4 {
    font-size: 1.4rem;
    margin: 0;
  }

  & .time {
    align-items: flex-start;
    align-self: stretch;
    display: flex;
    flex: 0 0 auto;
    flex-direction: column;
    gap: 24px;
    padding: 0 0.8rem;
    position: relative;
    width: 100%;
  }

  & p {
    font-size: 1.4rem;
    margin: 2px 0;
  }
`;

function TimeBox(props: TimeBoxProps) {
  return (
    <StyledTimeBox>
      <h4>{props.label}</h4>
      <div className="time">
        <p style={props.addStyle}>{props.time}</p>
      </div>
    </StyledTimeBox>
  );
}

export default TimeBox;
