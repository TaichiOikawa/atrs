import { StatusEnum } from "./status";

export enum PermissionEnum {
  ADMIN = "admin",
  MODERATOR = "moderator",
  TEACHER = "teacher",
  USER = "user",
  UNREGISTERED = "unregistered",
}

export type UsersType = [
  {
    user_id: number;
    login_id: string;
    name: string;
    permission: PermissionEnum;
    status: StatusEnum | null;
    activity: {
      attendTime: string;
      leaveTime: string | null;
      activityTime: string | null;
      isAutoLeave: boolean | null;
    } | null;
  }
];
