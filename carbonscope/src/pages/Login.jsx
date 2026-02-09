import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../services/firebase";
import { Link } from "react-router-dom";


function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setError("");
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (err) {
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-sm bg-white rounded-xl shadow-md p-6">
        {/* Branding */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-semibold text-green-700">
            CarbonScope
          </h1>
          <p className="text-sm text-gray-500">
            Track and reduce your carbon footprint
          </p>
        </div>

        {/* Form */}
        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm
                       focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm
                       focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
          />

          {/* Error */}
          {error && (
            <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-md px-3 py-2">
              {error}
            </p>
          )}

          {/* Button */}
          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700
                       text-white text-sm font-medium py-2.5 rounded-md
                       transition disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Continue"}
          </button>
          <p className="text-sm text-gray-400 mt-5 text-center">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-green-500 hover:underline">
              Sign up
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
}

export default Login;
