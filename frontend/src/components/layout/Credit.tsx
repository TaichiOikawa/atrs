import styled from "styled-components";

const StyledCredit = styled.div`
  gap: 2px;
  position: relative;

  & p {
    font-size: 0.98rem;
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
      <p>ver. 1.0.2</p>
      <p>ATRS © 2024 TaichiOikawa</p>

      <a href="https://github.com/TaichiOikawa/atrs">
        <img className="github-icon" src="/github.svg" alt="Github Link" />
      </a>
    </StyledCredit>
  );
}

export default Credit;
