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
import MemberStatusButton from "../../components/layout/MembersStatusOverview";
import Cards from "./components/Cards";
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

const Title = styled.div`
  align-items: center;
  align-self: stretch;
  display: flex;
  flex: 0 0 auto;
  gap: 10px;
  position: relative;
  width: 100%;
`;

type Activity = {
  attendTime: string;
  leaveTime: string;
  activityTime: string;
  weeklyTime: string;
  totalTime: string;
};

function DashboardMain() {
  const organization =
    sessionStorage.getItem("organizationName") || "Organization";
  const [isAttend, setIsAttend] = useState<boolean>(false);
  const [Activity, setActivity] = useState<Activity>({
    attendTime: "",
    leaveTime: "",
    activityTime: "",
    weeklyTime: "",
    totalTime: "",
  });
  const [everyoneStatus, setEveryoneStatus] = useState({
    numberOfUsers: 0,
    numberOfActive: 0,
  });
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
      const organizationId = sessionStorage.getItem("organizationId") || "";
      const status = await organizationStatus({ organizationId });
      setEveryoneStatus(status);
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
      <Title>
        <h2>{organization}</h2>
      </Title>
      <RecordButton
        isAttend={isAttend}
        postActivityButton={postActivityButton}
      />
      <Cards activity={Activity} />
      <MemberStatusButton
        online={everyoneStatus.numberOfActive}
        total={everyoneStatus.numberOfUsers}
      />
    </Container>
  );
}

export default DashboardMain;
