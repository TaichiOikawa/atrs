import { HoverCard, Text } from "@mantine/core";
import styled from "styled-components";
import Credit from "./Credit";

const StyledFooter = styled.footer`
  align-items: center;
  background-color: var(--background-color);
  display: flex;
  justify-content: space-between;
  padding: 12px 15px 20px;
  width: 100%;
`;

const StyledLeftBox = styled.div`
  display: inline-flex;
  flex: 0 0 auto;
  flex-direction: column;
  gap: 2px;
  position: relative;

  & p {
    font-size: 0.95rem;
    position: relative;
    white-space: nowrap;
    width: fit-content;
  }
`;

const StyledRightBox = styled.div`
  align-items: flex-end;
  display: inline-flex;
  flex: 0 0 auto;
  flex-direction: column;
  gap: 5px;
  justify-content: center;
  padding: 5px 10px;
  position: relative;

  & a {
    font-size: 1.1rem;
    position: relative;
    white-space: nowrap;
    width: fit-content;
  }
`;

function Footer() {
  const building = (
    <Text size="sm" c="red">
      工事中⛔
    </Text>
  );

  return (
    <StyledFooter>
      <StyledLeftBox>
        <Credit />
      </StyledLeftBox>
      <StyledRightBox>
        <a href="https://forms.gle/JELHgY6ttFEUQQ8q9">問題を報告</a>
        <HoverCard width="auto" shadow="md" position="top">
          <HoverCard.Target>
            <a href="">ステータス</a>
          </HoverCard.Target>

          <HoverCard.Dropdown>{building}</HoverCard.Dropdown>
        </HoverCard>
        <HoverCard width="auto" shadow="md" position="top">
          <HoverCard.Target>
            <a href="">ATRS について</a>
          </HoverCard.Target>

          <HoverCard.Dropdown>{building}</HoverCard.Dropdown>
        </HoverCard>
      </StyledRightBox>
    </StyledFooter>
  );
}

export default Footer;
