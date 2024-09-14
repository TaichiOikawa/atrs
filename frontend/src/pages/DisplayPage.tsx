import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import DisplayPageMain from "../features/DisplayPage/DisplayPageMain";

function DisplayPage() {
  return (
    <div className="wrapper">
      <Header />
      <DisplayPageMain />
      <Footer />
    </div>
  );
}

export default DisplayPage;
