import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Navbar({ name, username }) {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="navbar">
      <div>
        <div className="nav-name">{name}</div>
        <div className="nav-username">@{username}</div>
      </div>

      <Button
        variant="contained"
        size="small"
        color="error"
        onClick={logout}
      >
        Logout
      </Button>
    </div>
  );
}
