import {
  ActionIcon,
  Badge,
  Container,
  Flex,
  Group,
  rem,
  Table,
} from "@mantine/core";
import { IconPencil, IconTrash } from "@tabler/icons-react";
import AddUser from "./AddUser";

const data = [
  {
    user_id: 1,
    login_id: "0001",
    name: "John Doe",
    permission: "admin",
  },
  {
    user_id: 2,
    login_id: "0002",
    name: "John Smith",
    permission: "moderator",
  },
  {
    user_id: 3,
    login_id: "0003",
    name: "Sara Johnson",
    permission: "user",
  },
];

function UserTable() {
  const rows = data.map((user) => (
    <Table.Tr key={user.user_id}>
      <Table.Td>{user.user_id}</Table.Td>
      <Table.Td>{user.login_id}</Table.Td>
      <Table.Td>{user.name}</Table.Td>
      <Table.Td>
        {user.permission === "admin" ? (
          <Badge variant="outline" color="pink" size="lg">
            ADMIN
          </Badge>
        ) : user.permission === "moderator" ? (
          <Badge variant="outline" color="orange" size="lg">
            MODERATOR
          </Badge>
        ) : (
          <Badge variant="outline" color="blue" size="lg">
            USER
          </Badge>
        )}
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
      <Container size="lg">
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
