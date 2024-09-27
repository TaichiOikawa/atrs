import { Button, Group } from "@mantine/core";
import styled from "styled-components";
import { StatusEnum } from "../../../types/status";

const StyledMemberStatusContent = styled.div`
  align-items: center;
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  width: 100%;

  & h4 {
    font-size: 1.15rem;
    white-space: nowrap;
    width: 100%;
    color: #534c4c;
  }

  & div {
    flex-direction: column;
    align-items: flex-start;
    display: flex;
    flex: 0 0 auto;
    position: relative;
    width: 100%;

    & p {
      font-size: 0.95rem;
      white-space: nowrap;
      width: 100%;
      color: #534c4c;
    }
  }
`;

type MemberStatusContentProps = {
  name: string;
  attendTime: string;
  leaveTime: string;
  activityTime: string;
};

function MemberStatusContent(props: MemberStatusContentProps) {
  return (
    <StyledMemberStatusContent>
      <h4>{props.name}</h4>
      <div>
        <p>出席時間: {props.attendTime}</p>
        <p>退席時間: {props.leaveTime}</p>
        <p>活動時間: {props.activityTime}</p>
      </div>
    </StyledMemberStatusContent>
  );
}

const StyledMemberCard = styled.div`
  align-items: center;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: center;
  padding: 12px 15px;
  position: relative;
  width: fit-content;
  min-width: 295px;

  & .frame {
    width: 100%;
    align-items: center;
    display: inline-flex;
    flex: 0 0 auto;
    gap: 10px;
    justify-content: space-between;
    position: relative;
  }

  & img {
    height: 40px;
    width: 40px;
    color: #fff;
  }
`;

type MemberCardProps = {
  name: string;
  attendTime: string;
  leaveTime: string;
  status: StatusEnum;
  activityTime: string;
  isEdit?: boolean | false;
};

function MemberCard(props: MemberCardProps) {
  return (
    <StyledMemberCard
      style={
        props.status === StatusEnum.ACTIVE
          ? { backgroundColor: "var(--attend-color)" }
          : props.status === StatusEnum.LEAVE
          ? { backgroundColor: "var(--leave-color)" }
          : props.status === StatusEnum.NOT_ATTEND
          ? { backgroundColor: "#c8cad3" }
          : {}
      }
    >
      <div className="frame">
        {props.status === StatusEnum.ACTIVE ? (
          <img src="/person-fill-check.svg" alt="Status Icon (ACTIVE)" />
        ) : props.status === StatusEnum.LEAVE ? (
          <img src="/person-fill-dash.svg" alt="Status Icon (LEAVE)" />
        ) : props.status === StatusEnum.NOT_ATTEND ? (
          <img src="/person-fill-x.svg" alt="Status Icon (NOT_ATTEND)" />
        ) : null}

        <MemberStatusContent {...props} />
      </div>
      {props.isEdit ? (
        <Group justify="center">
          {props.status === StatusEnum.ACTIVE ? (
            <Button
              color="var(--leave-color)"
              radius="md"
              style={{ color: "#534c4c" }}
            >
              退席
            </Button>
          ) : props.status === StatusEnum.LEAVE ||
            props.status === StatusEnum.NOT_ATTEND ? (
            <Button
              color="var(--attend-color)"
              radius="md"
              style={{ color: "#534c4c" }}
            >
              出席
            </Button>
          ) : null}
          <Button color="#CAE9FF" radius="md" style={{ color: "#534c4c" }}>
            ユーザー詳細
          </Button>
        </Group>
      ) : null}
    </StyledMemberCard>
  );
}

export default MemberCard;
