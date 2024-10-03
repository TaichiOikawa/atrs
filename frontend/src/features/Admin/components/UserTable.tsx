import {
  ActionIcon,
  Badge,
  Container,
  Flex,
  Group,
  HoverCard,
  rem,
  Table,
  Text,
} from "@mantine/core";
import { IconPencil, IconTrash } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { getUsers } from "../../../api/users";
import PermissionBadge from "../../../components/parts/PermissionBadge";
import StatusBadge from "../../../components/parts/StatusBadge";
import { UsersType } from "../../../types/user";
import AddUser from "./AddUser";

function UserTable() {
  const [data, setData] = useState<UsersType | null>(null);
  useEffect(() => {
    (async () => {
      const res = await getUsers();
      setData(res);
    })();
  }, []);

  const rows = data?.map((user) => (
    <Table.Tr key={user.user_id}>
      <Table.Td>{user.user_id}</Table.Td>
      <Table.Td>{user.login_id}</Table.Td>
      <Table.Td>{user.name}</Table.Td>
      <Table.Td>
        <PermissionBadge permission={user.permission} />
      </Table.Td>
      <Table.Td>
        <HoverCard>
          <HoverCard.Target>
            <div>
              <StatusBadge status={user.status} fullWidth={false} />
            </div>
          </HoverCard.Target>
          <HoverCard.Dropdown>
            {user.activity ? (
              <Container>
                <Text>Attend Time: {user.activity.attendTime}</Text>
                <Text>Leave Time: {user.activity.leaveTime}</Text>
                <Text>Activity Time: {user.activity.activityTime}</Text>
                {user.activity.isAutoLeave ? (
                  <Badge color="pink" size="sm">
                    AUTO LEAVE
                  </Badge>
                ) : (
                  <></>
                )}
              </Container>
            ) : (
              <Text c="red">No Activity</Text>
            )}
          </HoverCard.Dropdown>
        </HoverCard>
      </Table.Td>
      <Table.Td>
        <Group gap={0} justify="flex-end">
          <ActionIcon variant="subtle" color="gray">
            <IconPencil
              style={{ width: rem(18), height: rem(18) }}
              stroke={1.5}
            />
          </ActionIcon>
          <ActionIcon variant="subtle" color="red">
            <IconTrash
              style={{ width: rem(18), height: rem(18) }}
              stroke={1.5}
            />
          </ActionIcon>
        </Group>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <>
      <Flex justify="flex-end" align="center">
        <AddUser />
      </Flex>
      <div>
        <Table verticalSpacing="sm">
          <Table.Thead>
            <Table.Tr>
              <Table.Th>User ID</Table.Th>
              <Table.Th>Login ID</Table.Th>
              <Table.Th>Name</Table.Th>
              <Table.Th>Permission</Table.Th>
              <Table.Th>Status</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </div>
    </>
  );
}

export default UserTable;
