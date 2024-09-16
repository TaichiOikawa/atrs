import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./components/hooks/useAuth";

type Props = {
  children: React.ReactNode;
};

type CheckProps = {
  authedNavigate: string;
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

  return <Navigate to="/" />;
};

export const GuestRoute = (props: Props) => {
  const { children } = props;
  const check = useAuth();
  console.log(check);

  if (!check.checked) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};

export const CheckRoute = ({ authedNavigate, children }: CheckProps) => {
  const check = useAuth();

  if (!check.checked) {
    return <div>Loading...</div>;
  }
  if (check.isAuthenticated) {
    return <Navigate to={authedNavigate} />;
  }
  return <>{children}</>;
};
