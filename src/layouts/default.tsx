import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import { deleteCookie, getCookie } from "../helpers/cookies";
import { authVerifyAccessToken } from "../services/auth";
import Header from "@/components/Header";

function LayoutDefault() {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      // Check access token
      try {
        const accessToken = getCookie("accessToken");

        await authVerifyAccessToken({
          accessToken,
        });
      } catch {
        deleteCookie("accessToken");

        navigate("/login");
      }
    };
    checkAuth();
  }, [navigate]);

  return (
    <>
      <Header />

      <Outlet />
    </>
  );
}

export default LayoutDefault;
