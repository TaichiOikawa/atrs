import { Flex, Loader, Text } from "@mantine/core";
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./components/hooks/useAuth";
import { PermissionEnum } from "./types/user";

type Props = {
  children: React.ReactNode;
};

type CheckProps = {
  authedNavigate: string;
  children: React.ReactNode;
};

type PermissionRouteProps = Props & {
  permission: Array<PermissionEnum>;
};

export const PermissionRoute = (props: PermissionRouteProps) => {
  const check = useAuth();

  if (!check.checked) {
    return loadingPage;
  }
  if (check.isAuthenticated) {
    const permission = check.permission;
    if (permission) {
      return <>{props.children}</>;
    }
    return <Navigate to="/dashboard" />;
  }
  return <Navigate to="/" />;
};

export const PrivateRoute = ({ children }: Props) => {
  const check = useAuth();

  if (!check.checked) {
    return loadingPage;
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
    return loadingPage;
  }

  return <>{children}</>;
};

export const CheckRoute = ({ authedNavigate, children }: CheckProps) => {
  const check = useAuth();

  if (!check.checked) {
    return loadingPage;
  }
  if (check.isAuthenticated) {
    return <Navigate to={authedNavigate} />;
  }
  return <>{children}</>;
};

const loadingPage = (
  <Flex h="100vh" justify="center" align="center" direction="column" gap="md">
    <Loader color="blue" size="xl" />
    <Text size="xl">Page Loading ...</Text>
  </Flex>
);
