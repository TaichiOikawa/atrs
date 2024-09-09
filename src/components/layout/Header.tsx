import styled from "styled-components";

const StyledHeader = styled.div`
  align-items: center;
  background-color: #d9d9d9;
  display: flex;
  height: 87px;
  justify-content: space-between;
  padding: 20px;
  position: relative;

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
  margin: 0;

  p {
    margin: 2px 0;
  }
`;

function Header() {
  const userName: string = "HogeHoge";
  const id: number = 123456;

  return (
    <StyledHeader>
      <div className="logo" />
      {/* 後でボタンにする　Logout */}
      <UserBox>
        <img
          className="account-icon"
          alt="Account Button"
          src="/account-icon.svg"
        />
        <UserInfo>
          <p>
            Logged in as <span>{userName}</span>
          </p>
          <p>ID: {id}</p>
        </UserInfo>
      </UserBox>
    </StyledHeader>
  );
}

export default Header;
