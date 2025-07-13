import { Link } from "react-router-dom";
import LogoutButton from "./LogoutButton";

const Navbar = ({ user, setUser }) => (
  <nav className="navbar">
    <div className="nav-left">
      <Link to="/">Home</Link>
      {user && <Link to="/upload">Upload</Link>}
    </div>
    <div className="nav-right">
      {user && (
        <>
          <span style={{ marginRight: "10px" }}>
            {user.user?.displayName || user.user?.email}
          </span>
          <LogoutButton setUser={setUser} />
        </>
      )}
    </div>
  </nav>
);

export default Navbar;
