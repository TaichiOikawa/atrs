export enum StatusEnum {
  ACTIVE = "active",
  LEAVE = "leave",
  AUTO_LEAVE = "auto_leave",
}

export type organizationStatusType =
  | [
      {
        login_id: number;
        name: string;
        status: StatusEnum;
      }
    ]
  | null;
