import { rem } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconX } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import styled from "styled-components";
import {
  getActivity,
  getActivityStatus,
  organizationStatus,
  postActivity,
} from "../../api/activity";
import Organization from "../../components/parts/Organization";
import { organizationStatusType } from "../../types/status";
import Cards from "./components/Cards";
import MemberStatusButton from "./components/MembersStatusButton";
import RecordButton from "./components/RecordButton";

const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 11px;
  margin: 0 0 25px;
  padding: 0 30px;
  position: relative;

  & Button {
    width: 100%;
  }
`;

type Activity = {
  attendTime: string;
  leaveTime: string;
  activityTime: string;
  weeklyTime: string;
  totalTime: string;
};

function DashboardMain() {
  const [isAttend, setIsAttend] = useState<boolean>(false);
  const [Activity, setActivity] = useState<Activity>({
    attendTime: "",
    leaveTime: "",
    activityTime: "",
    weeklyTime: "",
    totalTime: "",
  });
  const [memberStatus, setMemberStatus] =
    useState<organizationStatusType>(null);
  const xIcon = <IconX size={rem(20)} />;

  console.log("DashboardMainが再描画されました");
  console.log("isAttend:", isAttend);
  console.log("Activity:", Activity);

  useEffect(() => {
    (async () => {
      // 活動状態を取得
      const updatedIsAttend = await getActivityStatus();
      setIsAttend(updatedIsAttend);
      // 活動記録を取得
      const activity = await getActivity();
      setActivity(activity);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      // 組織の状態を取得
      const res = await organizationStatus();
      setMemberStatus(res);
    })();
  }, [isAttend]);

  const postActivityButton = async () => {
    try {
      await postActivity();
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
    const updatedActivity = await getActivity();
    setActivity(updatedActivity);
    const updatedIsAttend = await getActivityStatus();
    setIsAttend(updatedIsAttend);
    if (updatedIsAttend) {
      notifications.show({
        message: "出席を記録しました",
        color: "blue",
      });
    } else {
      notifications.show({
        message: "退席を記録しました",
        color: "orange",
      });
    }
    console.log(`[postActivityButton] updatedActivity:`, updatedActivity);
  };

  return (
    <Container>
      <Organization />
      <RecordButton
        isAttend={isAttend}
        postActivityButton={postActivityButton}
      />
      <Cards activity={Activity} />
      <MemberStatusButton status={memberStatus} />
    </Container>
  );
}

export default DashboardMain;
