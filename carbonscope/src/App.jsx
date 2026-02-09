import { Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

import Navbar from "./components/Navbar";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import ActivityInput from "./pages/ActivityInput";
import Analytics from "./pages/Analytics";
import Recommendations from "./pages/Recommendations";
import Profile from "./pages/Profile";
import Chatbot from "./pages/Chatbot";

function App() {
  const { user } = useContext(AuthContext);

  // 🔒 NOT LOGGED IN
  if (!user) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    );
  }

  // ✅ LOGGED IN
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <Navbar />

      {/* IMPORTANT: NO max-width here */}
      <main className="pt-16 min-h-screen w-full">
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/input" element={<ActivityInput />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/recommendations" element={<Recommendations />} />
          <Route path="/chat" element={<Chatbot />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
