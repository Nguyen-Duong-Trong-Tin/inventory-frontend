import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import Header from "@/components/Header";
import MyMenu from "@/components/MyMenu";

import { authVerifyAccessToken } from "../services/auth";
import { deleteCookie, getCookie } from "../helpers/cookies";

import "./layouts.css";

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
      <div className="layout-admin">
        <div className="layout-left">
          <MyMenu />
        </div>

        <div className="layout-right">
          <Header />

          <main className="main">
            <Outlet />
          </main>

          {/* <Footer /> */}
        </div>
      </div>
    </>
  );
}

export default LayoutDefault;
