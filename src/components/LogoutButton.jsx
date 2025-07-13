import axios from "axios";
import { useNavigate } from "react-router-dom";

const LogoutButton = ({ setUser }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const result = await axios.get(
        "https://google-authenication-backend.vercel.app/auth/logout",
        { withCredentials: true }
      );
      if (result.data.success) {
        setUser(null);
        navigate("/");
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="logout-button"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
