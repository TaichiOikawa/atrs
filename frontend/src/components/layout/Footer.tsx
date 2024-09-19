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
  padding: 3px 10px;
  position: relative;

  & a {
    font-size: 1.1rem;
    position: relative;
    white-space: nowrap;
    width: fit-content;
  }
`;

function Footer() {
  return (
    <StyledFooter>
      <StyledLeftBox>
        <Credit />
      </StyledLeftBox>
      <StyledRightBox>
        <a href="https://forms.gle/JELHgY6ttFEUQQ8q9">問題を報告</a>
        <a href="">ステータス</a>
        <a href="">ATRS について</a>
      </StyledRightBox>
    </StyledFooter>
  );
}

export default Footer;
