import { useEffect, useState } from "react";
import { checkJwt } from "../../api/auth";
import { PermissionEnum } from "../../types/user";

type userInfoType = {
  user_id: number;
  login_id: string;
  name: string;
  permission: PermissionEnum;
  organization: {
    organization_id: string;
    name: string;
  };
};

export const useAuth = () => {
  const [check, setCheck] = useState<{
    checked: boolean;
    isAuthenticated: boolean;
    permission: PermissionEnum;
  }>({
    checked: false,
    isAuthenticated: false,
    permission: PermissionEnum.USER,
  });
  useEffect(() => {
    const handleCheckJwt = async () => {
      try {
        const response = await checkJwt();
        if (response.data.isAuthenticated) {
          const userInfo = response.data.userInfo as userInfoType;
          const { user_id, login_id, permission, name } = userInfo;
          sessionStorage.setItem("userId", user_id.toString());
          sessionStorage.setItem("loginId", login_id);
          sessionStorage.setItem("name", name);
          sessionStorage.setItem("permission", permission);
          sessionStorage.setItem(
            "organizationId",
            userInfo.organization?.organization_id
          );
          sessionStorage.setItem(
            "organizationName",
            userInfo.organization?.name
          );
        } else {
          sessionStorage.removeItem("userId");
          sessionStorage.removeItem("loginId");
          sessionStorage.removeItem("name");
          sessionStorage.removeItem("permission");
          sessionStorage.removeItem("organizationId");
          sessionStorage.removeItem("organizationName");
        }
        setCheck({
          checked: true,
          isAuthenticated: response.data.isAuthenticated,
          permission: response.data.userInfo.permission as PermissionEnum,
        });
      } catch (error) {
        setCheck({
          checked: true,
          isAuthenticated: false,
          permission: PermissionEnum.USER,
        });
      }
    };
    handleCheckJwt();
  }, []);

  return check;
};
