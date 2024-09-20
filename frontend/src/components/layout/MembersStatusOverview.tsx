import styled from "styled-components";

const StyledMemberStatusButton = styled.button`
  align-items: center;
  background-color: var(--status-color);
  border-radius: 18px;
  display: flex;
  gap: 0;
  justify-content: flex-end;
  overflow: hidden;
  padding: 10px 15px;
  position: relative;
  width: 100%;

  & .frame {
    align-items: center;
    display: flex;
    flex: 1;
    flex-grow: 1;
    gap: 8px;
    justify-content: center;
    position: relative;
  }

  & .people-fill {
    height: 35px;
    width: 35px;
    position: relative;
  }

  & div {
    align-items: flex-end;
    display: inline-flex;
    flex: 0 0 auto;
    gap: 5px;
    justify-content: center;
    position: relative;
  }

  & h4 {
    margin-top: -1px;
    white-space: nowrap;
    width: fit-content;
  }

  & p {
    font-size: 1rem;
    position: relative;
    white-space: nowrap;
    width: fit-content;
  }

  & .arrow-right {
    height: 30px;
    width: 30px;
    position: relative;
  }
`;

function MemberStatusButton(props: { online: number; total: number }) {
  return (
    <StyledMemberStatusButton>
      <div className="frame">
        <img
          src="/people-fill.svg"
          alt="Members Icon"
          className="people-fill"
        />
        <div>
          <h4>{props.online}人オンライン</h4>
          <p>/{props.total}人</p>
        </div>
      </div>
      <img
        src="/arrow-right-short.svg"
        alt="Right Arrow"
        className="arrow-right"
      />
    </StyledMemberStatusButton>
  );
}

export default MemberStatusButton;
