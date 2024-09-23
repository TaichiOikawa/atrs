import { Badge, Table } from "@mantine/core";
import { organizationStatusType, StatusEnum } from "../../types/status";

type MemberStatusModalProps = {
  status: organizationStatusType;
};

function MemberStatusModal(props: MemberStatusModalProps) {
  const rows = props.status?.map((item) => (
    <Table.Tr key={item.login_id}>
      <Table.Td>{item.login_id}</Table.Td>
      <Table.Td>{item.name}</Table.Td>
      <Table.Td>
        {item.status === StatusEnum.ACTIVE ? (
          <Badge fullWidth variant="light" color="blue" size="lg">
            ACTIVE
          </Badge>
        ) : item.status === StatusEnum.LEAVE ? (
          <Badge fullWidth variant="light" color="orange" size="lg">
            LEAVED
          </Badge>
        ) : item.status === StatusEnum.AUTO_LEAVE ? (
          <Badge fullWidth variant="light" color="grape" size="lg">
            AUTO LEAVED
          </Badge>
        ) : (
          <></>
        )}
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Table>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>ID</Table.Th>
          <Table.Th>Name</Table.Th>
          <Table.Th>Status</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  );
}

export default MemberStatusModal;
