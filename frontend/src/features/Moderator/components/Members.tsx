import styled from "styled-components";
import { StatusEnum } from "../../../types/status";
import MemberCard from "./MemberCard";

const StyledMembers = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 10px;
`;

const data = [
  {
    name: "John Doe",
    attendTime: "2024/09/27 20:00:00",
    leaveTime: "",
    status: StatusEnum.ACTIVE,
    activityTime: "",
  },
  {
    name: "Jane Doe",
    attendTime: "2024/09/27 20:00:00",
    leaveTime: "2024/09/27 22:00:00",
    status: StatusEnum.LEAVE,
    activityTime: "00:00:00",
  },
  {
    name: "John Smith",
    attendTime: "",
    leaveTime: "",
    status: StatusEnum.NOT_ATTEND,
    activityTime: "",
  },
  {
    name: "Jane Smith",
    attendTime: "2024/09/27 20:00:00",
    leaveTime: "",
    status: StatusEnum.ACTIVE,
    activityTime: "",
  },
  {
    name: "John Doe",
    attendTime: "2024/09/27 20:00:00",
    leaveTime: "",
    status: StatusEnum.ACTIVE,
    activityTime: "",
  },
];

function Members() {
  return (
    <StyledMembers>
      {data.map((member) => (
        <MemberCard
          name={member.name}
          attendTime={member.attendTime}
          leaveTime={member.leaveTime}
          status={member.status}
          activityTime={member.activityTime}
          isEdit={true}
        />
      ))}
    </StyledMembers>
  );
}

export default Members;
