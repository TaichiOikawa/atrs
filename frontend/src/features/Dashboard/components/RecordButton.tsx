import styled from "styled-components";
import Button from "../../../components/parts/Button";

const StyledStatus = styled.div`
  align-items: center;
  display: flex;
  gap: 11px;
  justify-content: center;
  position: relative;
  width: 100%;

  & .leaveButton {
    flex: 1 !important;
    width: unset !important;
`;

const StyledStatusIcon = styled.div`
  align-items: center;
  background-color: var(--attend-color);
  border-radius: 80px;
  display: inline-flex;
  gap: 10px;
  justify-content: center;
  padding: 10px 20px;
  position: relative;
  font-size: 1.6rem;
  position: relative;
  white-space: nowrap;
  width: fit-content;
  flex: 0 0 auto;
  color: #fff;
`;

type RecordButtonProps = {
  isAttend: Boolean;
  postActivityButton: () => Promise<void>;
};

function RecordButton({ isAttend, postActivityButton }: RecordButtonProps) {
  console.log("RecordButtonが再描画されました");
  console.log("[RecordButton] isAttend:", isAttend);

  return (
    <>
      {isAttend ? (
        <StyledStatus>
          <StyledStatusIcon>活動中</StyledStatusIcon>
          <Button
            text="退席を記録"
            onClick={async () => await postActivityButton()}
            color="var(--leave-color)"
            textStyle={{ fontSize: "1.5rem", color: "#000" }}
            className="leaveButton"
          />
        </StyledStatus>
      ) : (
        <Button
          text="出席を記録"
          onClick={async () => await postActivityButton()}
          color="var(--attend-color)"
          textStyle={{ fontSize: "1.5rem", color: "#000" }}
        />
      )}
    </>
  );
}

export default RecordButton;
