import styled from "styled-components";
import Credit from "../components/layout/Credit";

const Container = styled.div`
  background-color: var(--pale-background-color);
  margin: auto;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  & .credit {
    position: absolute;
    bottom: 10px;
    display: flex !important;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 5px;
    margin-bottom: 10px;
  }
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-bottom: 30px;
  img {
    width: 100%;
  }
  h1 {
    letter-spacing: 0.18em;
    color: var(--logo-font-color);
  }
`;

const LoginButton = styled.button`
  background-color: var(--button-default-color);
  border-radius: 12px;
  color: #fff;
  font-size: 1.4rem;
  margin: 0 10px;
  padding: 10px 40px;
  cursor: pointer;
`;

function Home() {
  return (
    <>
      <Container>
        <Logo>
          <img src="/atrs.svg" alt="ATRS Logo" />
          <h1>アトラス</h1>
        </Logo>
        <LoginButton
          onClick={() => {
            window.location.href = "/login";
          }}
          className="button-hover"
        >
          ログイン
        </LoginButton>
        <Credit className="credit" />
      </Container>
    </>
  );
}

export default Home;
