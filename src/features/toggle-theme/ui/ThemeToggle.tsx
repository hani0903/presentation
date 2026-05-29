import { Moon, Sun } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { useTheme } from "@/shared/lib/theme";

export const ThemeToggle = () => {
  const { isDark, toggle } = useTheme();

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? "라이트 모드로 전환" : "다크 모드로 전환"}
      className={cn(
        "rounded-full p-2",
        "text-on-surface-variant",
        "hover:bg-surface-hover cursor-pointer transition-colors duration-300",
        "focus-visible:outline-primary focus-visible:outline-2 focus-visible:outline-offset-2",
      )}
    >
      {isDark ? <Sun size={16} aria-hidden /> : <Moon size={16} aria-hidden />}
    </button>
  );
};
