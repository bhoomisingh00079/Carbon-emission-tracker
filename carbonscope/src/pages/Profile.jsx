import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Profile() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div style={container}>
      <h2>Profile</h2>
      <p style={subtitle}>Account information</p>

      <div style={card}>
        <p>
          <strong>Email:</strong>
          <br />
          {user?.email}
        </p>

        <button style={logoutBtn} onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}

/* ---------- Styles ---------- */

const container = {
  maxWidth: "600px",
  margin: "40px auto",
  padding: "0 16px"
};

const subtitle = {
  color: "#6b7280",
  marginBottom: "16px"
};

const card = {
  background: "#ffffff",
  padding: "24px",
  borderRadius: "12px",
  boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
};

const logoutBtn = {
  marginTop: "20px",
  padding: "10px 14px",
  background: "#dc2626",
  color: "#ffffff",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer"
};

export default Profile;
