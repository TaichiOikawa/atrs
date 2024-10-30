import axios from "axios";
import { datetime } from "../types/datetime";
import { organizationStatusType, StatusEnum } from "../types/status";

export const getActivity = async () => {
  console.log("GET /api/activity");
  const res = await axios.get(`/api/activity`);
  console.log(res.data);

  if (res.data.attendTime) {
    res.data.attendTime = datetime.format(new Date(res.data.attendTime));
  }
  if (res.data.leaveTime) {
    res.data.leaveTime = datetime.format(new Date(res.data.leaveTime));
    const time = res.data.activityTime.split(":");
    res.data.activityTime = `${time[0]}h ${time[1]}min`;
  }
  if (res.data.weeklyTime) {
    const time = res.data.weeklyTime.split(":");
    res.data.weeklyTime = `${time[0]}h ${time[1]}min`;
  } else {
    res.data.weeklyTime = "00h 00min";
  }
  if (res.data.totalTime) {
    const time = res.data.totalTime.split(":");
    res.data.totalTime = `${time[0]}h ${time[1]}min`;
  } else {
    res.data.totalTime = "00h 00min";
  }

  return res.data;
};

export const getActivityStatus = async (): Promise<boolean> => {
  console.log("GET /api/activity/status");
  const res = await axios.get(`/api/activity/status`);
  console.log(res.data);
  if (res.data === StatusEnum.ACTIVE) {
    return true;
  } else {
    return false;
  }
};

export const postActivity = async (userId?: number) => {
  console.log("POST /api/activity");
  const res = await axios.post(`/api/activity`, { userId });
  return res;
};

export const organizationStatus = async () => {
  console.log("GET /api/organization/:organizationId/status");
  const organizationId = sessionStorage.getItem("organizationId");
  const res = await axios.get(`/api/organization/${organizationId}/status`);
  return res.data as organizationStatusType;
};

export const allLeave = async () => {
  console.log("POST /api/organization/:organizationId/all-leave");
  const organizationId = sessionStorage.getItem("organizationId");
  const res = await axios.post(`/api/organization/${organizationId}/all-leave`);
  return res;
};
