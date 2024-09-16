import styled from "styled-components";
import Button from "../../components/atoms/Button";
import Cards from "./components/Cards";

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
    margin: 0;
  }
`;

const attendButton = () => {
  fetch(`/api/attend`, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ attendTime: new Date() }),
  }).then((data) => console.log(data));
};

function DashboardMain() {
  const organization = "Organization Name";
  return (
    <MainContainer>
      <Organization>
        <h2>{organization}</h2>
      </Organization>
      <Button
        text="出席を記録する"
        onClick={attendButton}
        color="#cad1f7"
        textStyle={{ fontSize: "1.6em", color: "#000" }}
      />
      <Cards />
    </MainContainer>
  );
}

export default DashboardMain;
