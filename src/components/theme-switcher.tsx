import { useCallback, useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { getNormalizedTheme } from "@/utils/theme";
import { cn } from "@/lib/utils";

interface ThemeSwitcherProps {
  className?: string;
  labelClassName?: string;
  switchClassName?: string;
  ariaLabel?: string;
}

export default function ThemeSwitcher({ className = "", labelClassName = "", switchClassName = "", ariaLabel = "切换暗黑模式" }: ThemeSwitcherProps) {
  const [isDark, setIsDark] = useState<boolean>(false);

  useEffect(() => {
    const isDarkNow = getNormalizedTheme() === "dark";
    setIsDark(isDarkNow);
  }, []);

  const setTheme = useCallback((nextIsDark: boolean) => {
    const root = document.documentElement;
    setIsDark(nextIsDark);
    if (nextIsDark) {
      localStorage.setItem("theme", "dark");
      root.classList.add("dark");
    } else {
      localStorage.setItem("theme", "light");
      root.classList.remove("dark");
    }
  }, []);

  return (
    <div className={cn("flex items-center", className)}>
      <div className={cn("flex items-center gap-2 text-sm text-muted-foreground", labelClassName)}>
        {isDark ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
        <span>{isDark ? "暗黑模式" : "亮色模式"}</span>
      </div>
      <Switch className={switchClassName} checked={isDark} onCheckedChange={setTheme} aria-label={ariaLabel} />
    </div>
  );
}


