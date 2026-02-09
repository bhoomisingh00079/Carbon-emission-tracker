import { Link, NavLink } from "react-router-dom";
import logo from "../assets/logo.png";

function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50
                    bg-gray-950 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-6 h-16
                      flex items-center justify-between">

        {/* Logo + Brand */}
        <div className="flex items-center gap-3">
          <img src={logo} alt="CarbonScope logo" className="w-7 h-7" />
          <span className="text-lg font-semibold text-white">
            CarbonScope
          </span>
        </div>

        {/* Links */}
        <div className="flex gap-6 text-sm font-medium">
          {[
            ["Dashboard", "/dashboard"],
            ["Input", "/input"],
            ["Analytics", "/analytics"],
            ["Tips", "/recommendations"],
            ["Chatbot", "/chat"],
            ["Profile", "/profile"],
          ].map(([label, path]) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                isActive
                  ? "text-green-400"
                  : "text-gray-400 hover:text-white"
              }
            >
              {label}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
