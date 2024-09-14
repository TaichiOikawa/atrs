import { Route, Routes } from "react-router-dom";
import { GuestRoute, PrivateRoute } from "./AuthRouter";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import { LoginPage } from "./pages/Login";
import { NotFoundPage } from "./pages/NotFound";
import { SignUpPage } from "./pages/SignUp";

const Api_URL = "http://localhost:3000";

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={<GuestRoute children={<Home />}></GuestRoute>}
        />
        <Route
          path="/login"
          element={<GuestRoute children={<LoginPage />}></GuestRoute>}
        />
        <Route
          path="/sign-up"
          element={<GuestRoute children={<SignUpPage />}></GuestRoute>}
        />
        <Route
          path="/dashboard"
          element={<PrivateRoute children={<Dashboard />}></PrivateRoute>}
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
export { Api_URL };
