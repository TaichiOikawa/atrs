import { ActionIcon, Container, Flex, Group, rem, Table } from "@mantine/core";
import { IconPencil, IconTrash } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { getUsers } from "../../../api/users";
import PermissionBadge from "../../../components/parts/PermissionBadge";
import { PermissionEnum, UsersType } from "../../../types/user";
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
        <PermissionBadge permission={user.permission as PermissionEnum} />
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
      <Container size="lg" mt="md">
        <Table horizontalSpacing="md" verticalSpacing="sm">
          <Table.Thead>
            <Table.Tr>
              <Table.Th>User ID</Table.Th>
              <Table.Th>Login ID</Table.Th>
              <Table.Th>Name</Table.Th>
              <Table.Th>Permission</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </Container>
    </>
  );
}

export default UserTable;
