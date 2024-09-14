import styled from "styled-components";

const Container = styled.div`
  margin: auto;
  width: 700px;
  height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 4em;
  text-align: center;
  color: #65b4f4;
  margin: 0;
`;

const A = styled.a`
  display: block;
  text-align: center;
  font-size: 1.5em;
`;

function Home() {
  return (
    <Container>
      <div className="wrapper">
        <Title>ATRS アトラス</Title>
        <A href="/login">Login</A>
        <A href="/sign-up">Sign Up</A>
      </div>
    </Container>
  );
}

export default Home;
