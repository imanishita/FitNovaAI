// src/components/Navbar.jsx
import { useContext } from "react";
import { ThemeContext } from "./ThemeContext";
import { MoonIcon, SunIcon } from "lucide-react";

const Navbar = () => {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);

  return (
    <nav className="w-full flex justify-between items-center px-6 py-4 bg-transparent backdrop-blur-md">
      <h1 className="text-2xl font-bold text-black dark:text-white">FitNovaAI</h1>
      <button
        onClick={toggleTheme}
        className="text-black dark:text-white bg-white/10 p-2 rounded-full hover:bg-white/20 transition"
      >
        {isDarkMode ? <SunIcon size={20} /> : <MoonIcon size={20} />}
      </button>
    </nav>
  );
};

export default Navbar;
