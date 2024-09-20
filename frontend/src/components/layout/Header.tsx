import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { logout } from "../../api/auth";

const StyledHeader = styled.header`
  align-items: center;
  background-color: var(--background-color);
  display: flex;
  justify-content: space-between;
  padding: 5px 30px;

  & .logo {
    display: flex;
    align-items: center;
    flex-direction: column;
    color: var(--logo-font-color);
    & p {
      margin-top: -6px;
      font-size: 1rem;
    }
  }

  & .account-icon {
    height: 43px;
    position: relative;
    width: 43px;
    margin: 16px 12px 11px;
  }
`;

const UserBox = styled.div`
  display: flex;
  align-items: center;
`;

const UserInfo = styled.div`
  .userName {
    font-size: 1.25rem;
  }
  p {
    margin: 0 0;
    font-size: 0.85rem;
  }
`;

const LogoutButton = styled.button`
  background-color: var(--button-default-color);
  border-radius: 5px;
  color: #fff;
  font-size: 0.85rem;
  margin-left: 10px;
  padding: 10px 15px;
  cursor: pointer;
`;

function Header() {
  const navigate = useNavigate();
  const toast = useToast();
  const handleLogout = async () => {
    await logout();
    navigate("/");
    toast({
      title: "ログアウトしました",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  const userName: string = sessionStorage.getItem("name") || "Guest";
  const LoginId: string = sessionStorage.getItem("loginId") || "Guest";

  return (
    <StyledHeader>
      <div className="logo">
        <h1>ATRS</h1>
        <p>アトラス</p>
      </div>
      <UserBox>
        <img
          className="account-icon"
          alt="Account Button"
          src="/account-icon.svg"
        />
        <UserInfo>
          <p className="userName">{userName}</p>
          <p>Login ID: {LoginId}</p>
        </UserInfo>
        <LogoutButton onClick={() => handleLogout()}>ログアウト</LogoutButton>
      </UserBox>
    </StyledHeader>
  );
}

export default Header;
