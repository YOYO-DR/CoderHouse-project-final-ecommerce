import { useEffect } from "react";
import { Moon, Sun } from "lucide-react";
import { useThemeStore } from "../../../hooks/useThemeStore";
import { cn } from "../../../../utils/tailwind";

export function ThemeToggle() {
  const { theme, toggleTheme } = useThemeStore();

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
  }, [theme]);

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        "rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-800",
        "transition-colors duration-200"
      )}
      aria-label="Toggle theme"
    >
      {theme === "light" ? (
        <Moon className="h-5 w-5" />
      ) : (
        <Sun className="h-5 w-5" />
      )}
    </button>
  );
}
