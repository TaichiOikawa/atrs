import { Table } from "@mantine/core";
import StatusBadge from "../../../components/parts/StatusBadge";
import { organizationStatusType } from "../../../types/status";

type MemberStatusModalProps = {
  status: organizationStatusType;
};

function MemberStatusModal(props: MemberStatusModalProps) {
  const rows = props.status?.map((item) => (
    <Table.Tr key={item.login_id}>
      <Table.Td>{item.login_id}</Table.Td>
      <Table.Td>{item.name}</Table.Td>
      <Table.Td>
        <StatusBadge status={item.status} />
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
