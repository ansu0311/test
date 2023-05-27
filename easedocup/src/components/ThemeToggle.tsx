// components/ThemeToggle.tsx
import { useEffect, useState } from "react";

const ThemeToggle = () => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
      applyTheme(savedTheme);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    applyTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  const applyTheme = (selectedTheme: string) => {
    const root = window.document.documentElement;
    root.classList.remove(selectedTheme === "light" ? "dark" : "light");
    root.classList.add(selectedTheme);
  };

  return (
    <button
      onClick={toggleTheme}
      className={`bg-slate-300 dark:bg-zinc-900 text-zinc-900 dark:text-slate-300 py-2 px-4 rounded-lg`}
    >
      {theme === "light" ? "🌙" : "☀️"}
    </button>
  );
};

export default ThemeToggle;
