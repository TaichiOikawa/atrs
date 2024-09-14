import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./components/hooks/useAuth";

type Props = {
  children: React.ReactNode;
};

export const PrivateRoute = ({ children }: Props) => {
  const check = useAuth();

  if (!check.checked) {
    return <div>Loading...</div>;
  }
  if (check.isAuthenticated) {
    return <>{children}</>;
  }

  return <Navigate to="/404" />;
};

export const GuestRoute = (props: Props) => {
  const { children } = props;
  const check = useAuth();
  console.log(check);

  if (!check.checked) {
    return <div>Loading...</div>;
  }

  if (check.isAuthenticated) {
    return <Navigate to="/home" />;
  }

  return <>{children}</>;
};
