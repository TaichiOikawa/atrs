import { Route, Routes } from "react-router-dom";
import { AdminRoute, CheckRoute, GuestRoute, PrivateRoute } from "./AuthRouter";
import Admin from "./pages/Admin";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import { LoginPage } from "./pages/Login";
import { NotFoundPage } from "./pages/NotFound";
import { SignUpPage } from "./pages/SignUp";

function App() {
  return (
    <Routes>
      <Route path="/" element={<GuestRoute children={<Home />} />} />
      <Route
        path="/login"
        element={
          <CheckRoute children={<LoginPage />} authedNavigate="/dashboard" />
        }
      />
      <Route
        path="/sign-up"
        element={
          <CheckRoute children={<SignUpPage />} authedNavigate="/dashboard" />
        }
      />
      <Route
        path="/dashboard"
        element={<PrivateRoute children={<Dashboard />} />}
      />
      <Route path="/admin" element={<AdminRoute children={<Admin />} />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
