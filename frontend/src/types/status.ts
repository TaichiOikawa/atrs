export enum StatusEnum {
  ACTIVE = "active",
  LEAVE = "leave",
  NOT_ATTEND = "not_attend",
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
