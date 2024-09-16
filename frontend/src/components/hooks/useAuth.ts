import { useEffect, useState } from "react";
import { checkJwt } from "../../api";

type userInfoType = {
  user_id: number;
  login_id: string;
  name: string;
  permission: string;
};

export const useAuth = () => {
  const [check, setCheck] = useState<{
    checked: boolean;
    isAuthenticated: boolean;
  }>({ checked: false, isAuthenticated: false });
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
        } else {
          sessionStorage.removeItem("userId");
          sessionStorage.removeItem("loginId");
          sessionStorage.removeItem("name");
          sessionStorage.removeItem("permission");
        }
        setCheck({
          checked: true,
          isAuthenticated: response.data.isAuthenticated,
        });
      } catch (error) {
        setCheck({ checked: true, isAuthenticated: false });
      }
    };
    handleCheckJwt();
  }, []);

  return check;
};
