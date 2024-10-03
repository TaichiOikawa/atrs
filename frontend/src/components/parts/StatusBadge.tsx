import { Badge } from "@mantine/core";
import { StatusEnum } from "../../types/status";

type StatusBadgeProps = {
  status: StatusEnum | null;
  fullWidth?: boolean;
};

function StatusBadge({ status, fullWidth = true }: StatusBadgeProps) {
  return (
    <>
      {!status ? (
        <></>
      ) : status === StatusEnum.ACTIVE ? (
        <Badge fullWidth={fullWidth} variant="light" color="blue" size="lg">
          ACTIVE
        </Badge>
      ) : status === StatusEnum.LEAVE ? (
        <Badge fullWidth={fullWidth} variant="light" color="orange" size="lg">
          LEAVED
        </Badge>
      ) : status === StatusEnum.NOT_ATTEND ? (
        <Badge fullWidth={fullWidth} variant="light" color="gray" size="lg">
          NOT ATTEND
        </Badge>
      ) : (
        <Badge fullWidth={fullWidth} variant="default" size="lg">
          {status + " [ERROR]"}
        </Badge>
      )}
    </>
  );
}

export default StatusBadge;
