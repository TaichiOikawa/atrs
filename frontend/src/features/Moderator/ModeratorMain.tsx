import styled from "styled-components";
import Organization from "../../components/parts/Organization";
import { PermissionEnum } from "../../types/user";
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
  const permission = sessionStorage.getItem("permission") as PermissionEnum;
  return (
    <Container>
      {permission === PermissionEnum.ADMIN ||
      permission === PermissionEnum.MODERATOR ? (
        <Organization badgeTitle="Moderator Dashboard" badgeColor="orange" />
      ) : permission === PermissionEnum.TEACHER ? (
        <Organization badgeTitle="Teacher Dashboard" badgeColor="purple" />
      ) : (
        <>ERROR</>
      )}

      <Members />
    </Container>
  );
}

export default ModeratorMain;
