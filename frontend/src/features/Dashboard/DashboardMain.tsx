import { useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import styled from "styled-components";
import {
  getActivity,
  getActivityStatus,
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
  const organization = "Organization Name";
  const toast = useToast();
  const [isAttend, setIsAttend] = useState<boolean>(false);
  const [Activity, setActivity] = useState<Activity>({
    attendTime: "",
    leaveTime: "",
    activityTime: "",
    weeklyTime: "",
    totalTime: "",
  });

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

  const postActivityButton = async () => {
    try {
      await postActivity();
    } catch (error) {
      console.error(`[postActivityButton] error:`, error);
      toast({
        title: "エラーが発生しました",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    const updatedActivity = await getActivity();
    setActivity(updatedActivity);
    const updatedIsAttend = await getActivityStatus();
    setIsAttend(updatedIsAttend);
    if (updatedIsAttend) {
      toast({
        title: "出席を記録しました",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: "退席を記録しました",
        status: "success",
        duration: 3000,
        isClosable: true,
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
      <MemberStatusButton online={5} total={10} />
    </Container>
  );
}

export default DashboardMain;
