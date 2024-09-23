import { Container, rem, Space, Tabs } from "@mantine/core";
import { IconHome, IconSettings, IconUser } from "@tabler/icons-react";
import UserTable from "./components/UserTable";

function AdminMain() {
  const iconStyle = { width: rem(20), height: rem(20) };
  return (
    <Container size="xl">
      <h1>Admin Page</h1>
      <Tabs defaultValue="home">
        <Tabs.List>
          <Tabs.Tab value="home" leftSection={<IconHome style={iconStyle} />}>
            Home
          </Tabs.Tab>
          <Tabs.Tab value="users" leftSection={<IconUser style={iconStyle} />}>
            Users
          </Tabs.Tab>
          <Tabs.Tab
            value="settings"
            leftSection={<IconSettings style={iconStyle} />}
          >
            Settings
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="home">⛔Building</Tabs.Panel>

        <Tabs.Panel value="users">
          <Space h="md" />
          <Container size="lg">
            <UserTable />
          </Container>
        </Tabs.Panel>

        <Tabs.Panel value="settings">⛔Building</Tabs.Panel>
      </Tabs>
    </Container>
  );
}

export default AdminMain;
