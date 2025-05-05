
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "./ThemeProvider";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="outline"
      size="icon"
      className="bg-transparent/10 border border-white/40 text-white hover:bg-white/20 h-8 w-8 sm:h-9 sm:w-9 rounded-md"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      {theme === "light" ? (
        <Moon className="h-3 w-3 sm:h-4 sm:w-4" />
      ) : (
        <Sun className="h-3 w-3 sm:h-4 sm:w-4" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
