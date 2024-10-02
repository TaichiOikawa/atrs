import { Container, Group, Stack, Text } from "@mantine/core";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { getUsers } from "../../../api/users";
import useSocket from "../../../components/hooks/useSocket";
import apiBaseUrl from "../../../config/index.config";
import { datetime } from "../../../types/datetime";
import { PermissionEnum, UsersType } from "../../../types/user";
import MemberCard from "./MemberCard";

const StyledMembers = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 10px;
`;

let isEdit = false;

switch (sessionStorage.getItem("permission")) {
  case PermissionEnum.ADMIN:
  case PermissionEnum.MODERATOR:
    isEdit = true;
    break;

  default:
    isEdit = false;
}

function Members() {
  const [data, setData] = useState<UsersType | null>(null);
  const [latestReloadTime, setLatestReloadTime] = useState<Date>(new Date());
  const [reload, setReload] = useState<number>(0);
  const socket = useSocket(apiBaseUrl);

  useEffect(() => {
    (async () => {
      const res = await getUsers();
      setData(res);
      setLatestReloadTime(new Date());
    })();
  }, [reload]);

  useEffect(() => {
    if (!socket) return;

    // Join the room
    socket.emit("join", "user_status");

    socket.on("reload", () => {
      setReload((prev) => prev + 1);
    });

    return () => {
      if (socket) {
        socket.off("reload");
        socket.emit("leave", "user_status");
      }
    };
  }, [socket]);

  return (
    <Container size="100%">
      <Stack justify="center" align="stretch" gap="md">
        <Group justify="flex-end">
          <Text>最終更新: {datetime.format(latestReloadTime)}</Text>
        </Group>
        <StyledMembers>
          {data?.map((member) => {
            if (member.permission === PermissionEnum.UNREGISTERED) return;
            return (
              <MemberCard
                key={member.user_id}
                id={member.user_id}
                name={member.name}
                attendTime={member.activity?.attendTime || ""}
                leaveTime={member.activity?.leaveTime || ""}
                status={member.status}
                activityTime={member.activity?.activityTime || ""}
                isEdit={isEdit}
              />
            );
          })}
        </StyledMembers>
      </Stack>
    </Container>
  );
}

export default Members;
