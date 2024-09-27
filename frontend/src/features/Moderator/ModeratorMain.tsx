import styled from "styled-components";
import Organization from "../../components/parts/Organization";
import Members from "./components/Members";

const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 11px;
  margin: 0 0 25px;
  padding: 0 30px;
  position: relative;
`;

function ModeratorMain() {
  return (
    <Container>
      <Organization badgeTitle="Moderator Dashboard" badgeColor="orange" />
      <Members />
    </Container>
  );
}

export default ModeratorMain;
