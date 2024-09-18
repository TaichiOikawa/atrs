import { useEffect, useState } from "react";
import styled from "styled-components";
import {
  getActivity,
  getActivityStatus,
  postActivity,
} from "../../api/activity";
import Cards from "./components/Cards";
import RecordButton from "./components/RecordButton";

const MainContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 11px;
  padding: 0 30px;
  position: relative;

  & Button {
    width: 100%;
  }
`;

const Organization = styled.div`
  align-items: center;
  align-self: stretch;
  display: flex;
  flex: 0 0 auto;
  gap: 10px;
  position: relative;
  width: 100%;

  & h2 {
    font-size: 2rem;
    margin: 0;
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
  const organization = "Organization Name";
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
    await postActivity();
    const updatedActivity = await getActivity();
    setActivity(updatedActivity);
    const updatedIsAttend = await getActivityStatus();
    setIsAttend(updatedIsAttend);
    console.log(`[postActivityButton] updatedActivity:`, updatedActivity);
  };

  return (
    <MainContainer>
      <Organization>
        <h2>{organization}</h2>
      </Organization>
      <RecordButton
        isAttend={isAttend}
        postActivityButton={postActivityButton}
      />
      <Cards activity={Activity} />
    </MainContainer>
  );
}

export default DashboardMain;
