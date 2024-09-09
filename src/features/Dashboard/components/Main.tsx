import styled from "styled-components";
import Button from "../../../components/parts/Button";

const MainContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 11px;
  padding: 0 30px;
  position: relative;

  & Button {
    width: 100%;
  }
`;

const Organization = styled.div`
  align-items: center;
  align-self: stretch;
  display: flex;
  flex: 0 0 auto;
  gap: 10px;
  position: relative;
  width: 100%;

  & h2 {
    font-size: 2em;
  }
`;

function Main() {
  return (
    <MainContainer>
      <Organization>
        <h2>北見北斗生徒会執行部</h2>
      </Organization>
      <Button
        text="出席を記録する"
        onClick={() => console.log("ボタンが押されたよ！！")}
        color="#cad1f7"
        textStyle={{ fontSize: "1.4em" }}
      />
    </MainContainer>
  );
}

export default Main;
