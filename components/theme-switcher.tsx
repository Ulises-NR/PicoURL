"use client";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";

const ThemeSwitcher = () => {
  const { systemTheme, theme, setTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;

  return (
    <div className="flex items-center">
      <button
        onClick={() => setTheme(currentTheme === "dark" ? "light" : "dark")}
        className={`relative h-8 w-14 rounded-full p-1 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 ${
          theme === "dark" ? "bg-slate-700" : "bg-slate-200"
        }`}
      >
        <motion.div
          className="absolute left-1 top-1 h-6 w-6 rounded-full bg-white shadow-sm"
          animate={{
            x: theme === "dark" ? 24 : 0,
          }}
          transition={{
            type: "spring",
            stiffness: 700,
            damping: 30,
          }}
        >
          {theme === "dark" ? (
            <Moon className="h-4 w-4 text-slate-700 m-1" />
          ) : (
            <Sun className="h-4 w-4 text-yellow-500 m-1" />
          )}
        </motion.div>
      </button>
    </div>
  );
};
export default ThemeSwitcher;
