import { Badge } from "@mantine/core";
import { StatusEnum } from "../../types/status";

type StatusBadgeProps = {
  status: StatusEnum;
};

function StatusBadge(props: StatusBadgeProps) {
  return (
    <>
      {props.status === StatusEnum.ACTIVE ? (
        <Badge fullWidth variant="light" color="blue" size="lg">
          ACTIVE
        </Badge>
      ) : props.status === StatusEnum.LEAVE ? (
        <Badge fullWidth variant="light" color="orange" size="lg">
          LEAVED
        </Badge>
      ) : props.status === StatusEnum.NOT_ATTEND ? (
        <Badge fullWidth variant="light" color="gray" size="lg">
          NOT ATTEND
        </Badge>
      ) : (
        <Badge fullWidth variant="default" size="lg">
          {props.status + " [ERROR]"}
        </Badge>
      )}
    </>
  );
}

export default StatusBadge;
