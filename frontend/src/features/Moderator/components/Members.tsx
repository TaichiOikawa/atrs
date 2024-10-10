import { Container, Flex, Group, rem, Stack, Text } from "@mantine/core";
import { IconVolume, IconVolumeOff } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import styled from "styled-components";
import useSound from "use-sound";
import { getUsers } from "../../../api/users";
import useSocket from "../../../components/hooks/useSocket";
import apiBaseUrl from "../../../config/index.config";
import { datetime } from "../../../types/datetime";
import { PermissionEnum, UsersType } from "../../../types/user";
import MemberCard from "./MemberCard";
import AttendSound from "/sound/attend_notify_sound.mp3";
import LeaveSound from "/sound/leave_notify_sound.mp3";

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
  const [notifySound, setNotifySound] = useState<boolean>(false);
  const socket = useSocket(apiBaseUrl);

  const [attendSoundPlay] = useSound(AttendSound);
  const [leaveSoundPlay] = useSound(LeaveSound);

  const iconStyle = { width: rem(25), height: rem(25) };

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

  useEffect(() => {
    if (!socket) return;

    if (notifySound) {
      socket.emit("join", "user_status_notify");
      socket.on("notify", (msg) => {
        if (msg == "attend") {
          console.log("[websocket] attend notify");
          attendSoundPlay();
        } else if (msg == "leave") {
          console.log("[websocket] leave notify");
          leaveSoundPlay();
        }
      });
    }

    return () => {
      socket.off("notify");
      socket.emit("leave", "user_status_notify");
    };
  }, [notifySound]);

  return (
    <>
      <Flex w="100%" justify="flex-end" align="center" gap="md">
        <Text>最終更新: {datetime.format(latestReloadTime)}</Text>
        <Group onClick={() => setNotifySound(!notifySound)}>
          {notifySound ? (
            <IconVolume style={iconStyle} />
          ) : (
            <IconVolumeOff style={iconStyle} />
          )}
        </Group>
      </Flex>
      <Container>
        <Stack justify="center" align="stretch" gap="md">
          <StyledMembers>
            {data?.map((member) => {
              if (
                member.permission === PermissionEnum.UNREGISTERED ||
                member.permission === PermissionEnum.ADMIN ||
                member.permission === PermissionEnum.TEACHER
              )
                return;
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
    </>
  );
}

export default Members;
