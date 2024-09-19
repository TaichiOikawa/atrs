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

const Title = styled.h1`
  font-size: 4rem;
  text-align: center;
  color: var(--logo-font-color);
  margin: 20px 0;
`;

const LoginButton = styled.button`
  background-color: var(--button-default-color);
  border: none;
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
        <Title>ATRS アトラス</Title>
        <LoginButton
          onClick={() => {
            window.location.href = "/login";
          }}
        >
          ログイン
        </LoginButton>
        <Credit className="credit" />
      </Container>
    </>
  );
}

export default Home;
