
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";

function Navbar({ user, logout }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    setMenuOpen(false);
    navigate("/");
  }

  return (
    <header className="navbar">
      <Link to="/" className="brand">
        <span className="brand-icon">✚</span>
        Medi<span>Connect</span>
      </Link>

      <nav className="nav-links">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/doctors">Find Doctors</NavLink>
        {user && <NavLink to="/dashboard">Dashboard</NavLink>}
      </nav>

      <div className="nav-actions">
        {user ? (
          <div className="profile-wrapper">
            <button
              className="profile-button"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <span className="avatar">
                {(user.name || "U").charAt(0).toUpperCase()}
              </span>
              <span>{user.name?.split(" ")[0] || "Profile"}</span>
              <span>⌄</span>
            </button>

            {menuOpen && (
              <div className="profile-menu">
                <div className="profile-menu-info">
                  <strong>{user.name}</strong>
                  <small>{user.email}</small>
                </div>
                <Link to="/dashboard" onClick={() => setMenuOpen(false)}>
                  My Dashboard
                </Link>
                <button onClick={handleLogout}>Logout ↗</button>
              </div>
            )}
          </div>
        ) : (
          <>
            <Link className="login-link" to="/login">Login</Link>
            <Link className="button button-primary nav-signup" to="/signup">
              Get Started
            </Link>
          </>
        )}
      </div>
    </header>
  );
}

export default Navbar;
