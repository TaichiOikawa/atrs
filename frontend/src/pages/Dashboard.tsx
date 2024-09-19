import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import DashboardMain from "../features/Dashboard/DashboardMain";

function Dashboard() {
  return (
    <>
      <Header />
      <main>
        <DashboardMain />
      </main>
      <Footer />
    </>
  );
}

export default Dashboard;
