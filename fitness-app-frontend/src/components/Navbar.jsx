// src/components/Navbar.jsx
import { useContext } from "react";
import { ThemeContext } from "./ThemeContext";
import { MoonIcon, SunIcon, Zap, Activity } from "lucide-react";

const Navbar = () => {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);

  return (
    <nav className="w-full flex justify-between items-center px-6 py-4 bg-transparent backdrop-blur-md border-b border-white/10">
      <div className="flex items-center space-x-3">
        {/* Logo with gradient background */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg blur-sm opacity-75"></div>
          <div className="relative bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-lg">
            <Zap className="text-white" size={24} />
          </div>
        </div>
        
        {/* App name with gradient text */}
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
          FitNovaAI
        </h1>
        
        {/* Optional pulse animation for the activity icon */}
        <Activity className="text-blue-500 animate-pulse" size={20} />
      </div>

      {/* Theme toggle button with enhanced styling */}
      <button
        onClick={toggleTheme}
        className="text-black dark:text-white bg-white/10 p-3 rounded-full hover:bg-white/20 transition-all duration-300 hover:scale-110 border border-white/20"
      >
        {isDarkMode ? <SunIcon size={20} /> : <MoonIcon size={20} />}
      </button>
    </nav>
  );
};

export default Navbar;