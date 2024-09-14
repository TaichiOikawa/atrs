import { useEffect, useState } from "react";
import { checkJwt } from "../../api";

export const useAuth = () => {
  const [check, setCheck] = useState<{
    checked: boolean;
    isAuthenticated: boolean;
  }>({ checked: false, isAuthenticated: false });
  useEffect(() => {
    const handleCheckJwt = async () => {
      try {
        const response = await checkJwt();
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
