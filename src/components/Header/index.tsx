import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";

import { deleteCookie } from "@/helpers/cookies";

function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    deleteCookie("accessToken");

    navigate("/login");
  };

  return (
    <header className="w-full bg-white shadow-sm py-3 px-6 flex justify-between items-center">
      <h1 className="text-xl font-semibold">Pharma Inventory Manager</h1>

      <Button variant="destructive" onClick={handleLogout}>
        Logout
      </Button>
    </header>
  );
}

export default Header;
