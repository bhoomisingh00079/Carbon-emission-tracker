import { Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

import Navbar from "./components/Navbar";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ActivityInput from "./pages/ActivityInput";
import Analytics from "./pages/Analytics";
import Recommendations from "./pages/Recommendations";
import Profile from "./pages/Profile";

function App() {
  const { user } = useContext(AuthContext);

  // 🔒 NOT LOGGED IN → ONLY LOGIN PAGE
  if (!user) {
    return (
      <Routes>
        <Route path="*" element={<Login />} />
      </Routes>
    );
  }

  // ✅ LOGGED IN → FULL APP
  return (
    <>
      <Navbar />

      <div style={{ padding: "24px" }}>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/input" element={<ActivityInput />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/recommendations" element={<Recommendations />} />
          <Route path="/profile" element={<Profile />} />

          {/* default fallback */}
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Routes>
      </div>
    </>
  );
}

export default App;