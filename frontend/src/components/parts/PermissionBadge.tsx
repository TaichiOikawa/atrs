import { Badge } from "@mantine/core";
import { PermissionEnum } from "../../types/user";

type PermissionBadgeProps = {
  permission: PermissionEnum;
};

function PermissionBadge(props: PermissionBadgeProps) {
  return (
    <>
      {props.permission === PermissionEnum.ADMIN ? (
        <Badge variant="outline" color="pink" size="lg">
          ADMIN
        </Badge>
      ) : props.permission === PermissionEnum.MODERATOR ? (
        <Badge variant="outline" color="orange" size="lg">
          MODERATOR
        </Badge>
      ) : props.permission === PermissionEnum.TEACHER ? (
        <Badge variant="outline" color="blue" size="lg">
          TEACHER
        </Badge>
      ) : props.permission === PermissionEnum.USER ? (
        <Badge variant="outline" color="green" size="lg">
          USER
        </Badge>
      ) : props.permission === PermissionEnum.UNREGISTERED ? (
        <Badge variant="outline" color="gray" size="lg">
          UNREGISTERED
        </Badge>
      ) : (
        <Badge variant="default" size="lg">
          {props.permission + " [ERROR]"}
        </Badge>
      )}
    </>
  );
}

export default PermissionBadge;
