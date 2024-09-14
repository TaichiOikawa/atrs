import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import DashboardMain from "../features/Dashboard/DashboardMain";

function Dashboard() {
  return (
    <div className="wrapper">
      <Header />
      <main>
        <DashboardMain />
      </main>
      <Footer />
    </div>
  );
}

export default Dashboard;
