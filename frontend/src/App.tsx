import { Route, Routes } from "react-router-dom";
import { CheckRoute, GuestRoute, PrivateRoute } from "./AuthRouter";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import { LoginPage } from "./pages/Login";
import { NotFoundPage } from "./pages/NotFound";
import { SignUpPage } from "./pages/SignUp";

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
          element={
            <CheckRoute
              children={<LoginPage />}
              authedNavigate="/dashboard"
            ></CheckRoute>
          }
        />
        <Route
          path="/sign-up"
          element={
            <CheckRoute
              children={<SignUpPage />}
              authedNavigate="/dashboard"
            ></CheckRoute>
          }
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
