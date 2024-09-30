import { Route, Routes } from "react-router-dom";
import {
  CheckRoute,
  GuestRoute,
  PermissionRoute,
  PrivateRoute,
} from "./AuthRouter";
import Admin from "./pages/Admin";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import { LoginPage } from "./pages/Login";
import Moderator from "./pages/Moderator";
import { NotFoundPage } from "./pages/NotFound";
import { SignUpPage } from "./pages/SignUp";
import Test from "./pages/test";
import { PermissionEnum } from "./types/user";

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
      <Route
        path="/admin"
        element={
          <PermissionRoute
            children={<Admin />}
            permission={[PermissionEnum.ADMIN]}
          />
        }
      />
      <Route
        path="/moderator"
        element={
          <PermissionRoute
            children={<Moderator />}
            permission={[PermissionEnum.ADMIN, PermissionEnum.MODERATOR]}
          />
        }
      />
      <Route path="*" element={<NotFoundPage />} />
      <Route path="/test" element={<Test />} />
    </Routes>
  );
}

export default App;
