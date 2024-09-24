export enum PermissionEnum {
  ADMIN = "admin",
  MODERATOR = "moderator",
  USER = "user",
  UNREGISTERED = "unregistered",
}

export type UsersType = [
  {
    user_id: number;
    login_id: string;
    name: string;
    permission: PermissionEnum;
    status: string;
  }
];
