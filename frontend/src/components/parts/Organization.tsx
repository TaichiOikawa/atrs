import { Badge } from "@mantine/core";
import styled from "styled-components";

const OrganizationContainer = styled.div`
  align-items: flex-end;
  align-self: stretch;
  display: flex;
  flex: 0 0 auto;
  gap: 30px;
  position: relative;
  width: 100%;

  & .title {
    margin: 5px 0;
  }
`;

type OrganizationProps = {
  badgeTitle?: string;
  badgeColor?: string | "blue";
};

function Organization({ badgeTitle, badgeColor }: OrganizationProps) {
  const organization =
    sessionStorage.getItem("organizationName") || "Organization";
  return (
    <OrganizationContainer>
      <h2>{organization}</h2>
      {badgeTitle ? (
        <Badge color={badgeColor} size="lg" variant="outline" className="title">
          {badgeTitle}
        </Badge>
      ) : null}
    </OrganizationContainer>
  );
}

export default Organization;
