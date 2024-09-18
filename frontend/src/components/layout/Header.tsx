import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { logout } from "../../api/auth";

const StyledHeader = styled.header`
  align-items: center;
  background-color: #d9d9d9;
  display: flex;
  height: 87px;
  justify-content: space-between;
  padding: 20px;

  & .logo {
    background-color: #a110ae;
    height: 63px;
    margin-bottom: -8px;
    margin-top: -8px;
    position: relative;
    width: 100px;
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

function Header() {
  const navigate = useNavigate();
  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const userName: string = sessionStorage.getItem("name") || "Guest";
  const LoginId: string = sessionStorage.getItem("loginId") || "Guest";

  return (
    <StyledHeader>
      <div className="logo" />
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
        <button onClick={() => handleLogout()}>Logout</button>
      </UserBox>
    </StyledHeader>
  );
}

export default Header;
