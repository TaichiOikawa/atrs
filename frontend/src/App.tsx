import { Route, Routes } from "react-router-dom";
import {
  CheckRoute,
  DashboardRouter,
  GuestRoute,
  PermissionRoute,
} from "./AuthRouter";
import Admin from "./pages/Admin";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import { LoginPage } from "./pages/Login";
import Moderator from "./pages/Moderator";
import { NotFoundPage } from "./pages/NotFound";
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
        path="/dashboard"
        element={
          <DashboardRouter
            route={[
              { permission: PermissionEnum.ADMIN, navigate: "/admin" },
              { permission: PermissionEnum.TEACHER, navigate: "/moderator" },
            ]}
            children={<Dashboard />}
          />
        }
      />
      <Route
        path="/admin"
        element={
          <PermissionRoute
            children={<Admin />}
            permission={[PermissionEnum.ADMIN]}
            failNavigate="/dashboard"
          />
        }
      />
      <Route
        path="/moderator"
        element={
          <PermissionRoute
            children={<Moderator />}
            permission={[
              PermissionEnum.ADMIN,
              PermissionEnum.MODERATOR,
              PermissionEnum.TEACHER,
            ]}
            failNavigate="/dashboard"
          />
        }
      />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
