import { Avatar, Menu, rem, Text } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconLogout } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { logout } from "../../api/auth";

const StyledHeader = styled.header`
  align-items: center;
  background-color: var(--background-color);
  display: flex;
  justify-content: space-between;
  padding: 5px 25px;
  height: 62px;

  & .logo {
    display: flex;
    align-items: center;
    flex-direction: row;
    img {
      height: 2.5rem;
    }
  }
`;

function Header() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
    notifications.show({
      message: "ログアウトしました",
      color: "blue",
    });
  };

  const userName: string =
    sessionStorage.getItem("name")?.replace(" ", "") ?? "Guest";
  const LoginId: string = sessionStorage.getItem("loginId") ?? "Guest";

  const iconStyle = { width: rem(18), height: rem(18) };

  return (
    <StyledHeader>
      <a className="logo" href="/dashboard">
        <img src="/atrs.svg" alt="ATRS Logo" />
      </a>
      <div>
        <Menu shadow="md" width={200}>
          <Menu.Target>
            <Avatar name={userName} color="initials" w="40px" h="40px" />
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Label>
              <Text size="lg" c="dark">
                {userName}
              </Text>
              <Text size="sm" c="gray">
                LoginID: {LoginId}
              </Text>
            </Menu.Label>

            <Menu.Divider />

            <Menu.Item
              leftSection={<IconLogout style={iconStyle} />}
              onClick={() => handleLogout()}
            >
              ログアウト
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </div>
    </StyledHeader>
  );
}

export default Header;
