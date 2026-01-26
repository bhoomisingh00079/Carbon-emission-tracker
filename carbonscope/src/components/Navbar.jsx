import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav style={nav}>
      <h3 style={logo}>CarbonScope</h3>

      <div style={links}>
        <Link style={link} to="/dashboard">Dashboard</Link>
        <Link style={link} to="/input">Input</Link>
        <Link style={link} to="/analytics">Analytics</Link>
        <Link style={link} to="/recommendations">Recommendations</Link>
        <Link style={link} to="/profile">Profile</Link>
      </div>
    </nav>
  );
}

/* ---------- Styles ---------- */

const nav = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "14px 32px",
  background: "#ffffff",
  borderBottom: "1px solid #e5e7eb"
};

const logo = {
  margin: 0,
  fontWeight: 600
};

const links = {
  display: "flex",
  gap: "20px"
};

const link = {
  textDecoration: "none",
  color: "#374151",
  fontSize: "14px",
  fontWeight: 500
};

export default Navbar;
