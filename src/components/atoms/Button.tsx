import styled from "styled-components";

const StyledButton = styled.button`
  align-items: center;
  border-radius: 12px;
  border: none;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 15px;
  justify-content: center;
  padding: 25px 15px;
  position: relative;
  cursor: pointer;
`;

type ButtonProps = {
  text: string;
  onClick: () => void;
  color?: string;
  textStyle?: object;
};

function Button(props: ButtonProps) {
  return (
    <StyledButton
      onClick={props.onClick}
      style={{ backgroundColor: props.color }}
    >
      <div style={props.textStyle}>{props.text}</div>
    </StyledButton>
  );
}

export default Button;
