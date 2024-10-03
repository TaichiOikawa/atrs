import axios from "axios";
import { datetime } from "../types/datetime";
import { UsersType } from "../types/user";

export const getUsers = async () => {
  console.log("GET /api/organization/:organizationId/users");
  const organization = sessionStorage.getItem("organizationId");
  if (!organization) {
    throw new Error("Organization not found");
  }
  const res = await axios.get(`/api/organization/${organization}/users`);
  const data = res.data as UsersType;

  data.forEach((user) => {
    if (user.activity) {
      if (user.activity.attendTime) {
        user.activity.attendTime = datetime.format(
          new Date(user.activity.attendTime)
        );
      }
      if (user.activity.leaveTime) {
        user.activity.leaveTime = datetime.format(
          new Date(user.activity.leaveTime)
        );
      }
    }
  });
  return data;
};
