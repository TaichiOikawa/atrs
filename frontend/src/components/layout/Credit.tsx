import styled from "styled-components";

const StyledCredit = styled.div`
  gap: 2px;
  position: relative;

  & p {
    font-size: 0.95rem;
    position: relative;
    white-space: nowrap;
    width: fit-content;
  }
  & .github-icon {
    display: block;
    height: 34px;
    width: 34px;
    position: relative;
  }
`;

function Credit({ className }: { className?: string }) {
  return (
    <StyledCredit className={className}>
      <p>ver. 0.0.0 (Develop)</p>
      <p>ATRS © 2024 TaichiOikawa</p>

      <a href="https://github.com/TaichiOikawa/atrs-frontend">
        <img className="github-icon" src="/github.svg" alt="Github Link" />
      </a>
    </StyledCredit>
  );
}

export default Credit;
