import axios from "axios";

export const getActivityStatus = async () => {
  const res = await axios.get(`/api/activity/status`);
  return res.data;
};

export const postActivity = async (data: { type: "attend" | "leave" }) => {
  await axios.post(`/api/activity`, data);
  return;
};
