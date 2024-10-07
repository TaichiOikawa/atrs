import { Button, rem } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconX } from "@tabler/icons-react";
import styled from "styled-components";
import { postActivity } from "../../../api/activity";
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
  const formatTime = (time: string) => {
    if (!time) return "";
    return time.slice(5);
  };
  const formatActivityTime = (time: string) => {
    if (!time) return "";
    const [hour, minute] = time.split(":");
    return `${hour}h ${minute}min`;
  };
  return (
    <StyledMemberStatusContent>
      <h4>{props.name}</h4>
      <div>
        <p>出席時間: {formatTime(props.attendTime)}</p>
        <p>退席時間: {formatTime(props.leaveTime)}</p>
        <p>活動時間: {formatActivityTime(props.activityTime)}</p>
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
  width: 310px;
  transition: background-color 0.3s;

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
  id: number;
  name: string;
  attendTime: string;
  leaveTime: string;
  status: StatusEnum | null;
  activityTime: string;
  isEdit?: boolean | false;
};

const xIcon = <IconX size={rem(20)} />;

function MemberCard(props: MemberCardProps) {
  const handleClick = async () => {
    try {
      const res = await postActivity(props.id);
      if (res.status !== 200) {
        notifications.show({
          title: "エラーが発生しました",
          message: "もう一度お試しください",
          icon: xIcon,
          color: "red",
        });
        return;
      }
      if (res.data === StatusEnum.ACTIVE) {
        notifications.show({
          message: `${props.name}さんの出席を記録しました。`,
          color: "blue",
        });
      } else {
        notifications.show({
          message: `${props.name}さんの退席を記録しました。`,
          color: "orange",
        });
      }
    } catch (error) {
      console.error(`[postActivityButton] error:`, error);
      notifications.show({
        title: "エラーが発生しました",
        message: "もう一度お試しください",
        icon: xIcon,
        color: "red",
      });
      return;
    }
  };
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
        <div style={{ textAlign: "center" }}>
          {props.status === StatusEnum.ACTIVE ? (
            <img src="/person-fill-check.svg" alt="Status Icon (ACTIVE)" />
          ) : props.status === StatusEnum.LEAVE ? (
            <img src="/person-fill-dash.svg" alt="Status Icon (LEAVE)" />
          ) : props.status === StatusEnum.NOT_ATTEND ? (
            <img src="/person-fill-x.svg" alt="Status Icon (NOT_ATTEND)" />
          ) : null}
          {props.isEdit ? (
            <>
              {props.status === StatusEnum.ACTIVE ? (
                <Button
                  color="var(--leave-color)"
                  radius="md"
                  style={{ color: "#534c4c" }}
                  onClick={handleClick}
                >
                  退席
                </Button>
              ) : props.status === StatusEnum.LEAVE ||
                props.status === StatusEnum.NOT_ATTEND ? (
                <Button
                  color="var(--attend-color)"
                  radius="md"
                  style={{ color: "#534c4c" }}
                  onClick={handleClick}
                >
                  出席
                </Button>
              ) : null}
            </>
          ) : null}
        </div>
        <MemberStatusContent {...props} />
      </div>
    </StyledMemberCard>
  );
}

export default MemberCard;
