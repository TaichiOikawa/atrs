import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import AdminMain from "../features/Admin/AdminMain";

function Admin() {
  return (
    <>
      <Header />
      <main>
        <AdminMain />
      </main>
      <Footer />
    </>
  );
}

export default Admin;
