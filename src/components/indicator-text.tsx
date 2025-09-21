import { cn } from "../lib/utils";

interface IndicatorTextProps {
  children: string;
  active?: boolean;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";

  interactiveIndicator?: boolean;
}

function IndicatorText({
  children,
  active = false,
  className,
  size = "lg",
  interactiveIndicator: interactive = false,
}: IndicatorTextProps) {
  const sizeClasses = {
    sm: "text-base",
    md: "text-lg",
    lg: "text-xl",
    xl: "text-2xl",
  };

  const indicatorNormalHeightClasses = {
    sm: "h-[3px] max-sm:h-[3px]",
    md: "h-[5px] max-sm:h-[3px]",
    lg: "h-[5px] max-sm:h-[3px]",
    xl: "h-[6px] max-sm:h-[4px]",
  };

  const indicatorActiveHeightClasses = {
    sm: [interactive ? "h-[6px]" : "h-[11px]", "group-hover:h-[11px]"],
    md: [interactive ? "h-[8px]" : "h-[13px]", "group-hover:h-[13px]"],
    lg: [interactive ? "h-[10px]" : "h-[15px]", "group-hover:h-[15px]"],
    xl: [interactive ? "h-[12px]" : "h-[19px]", "group-hover:h-[19px]"],
  };

  return (
    <div
      className={cn(
        // Base styles
        "inline-block group relative",
        className,
      )}
    >
      <span
        className={cn(
          sizeClasses[size],
          "font-bold select-none transition-all duration-150 ease-out z-10 relative",
          // Default state colors (light mode)
          "text-zinc-600",
          // Dark mode colors
          "dark:text-white/60",
          // Hover state
          "group-hover:text-black",
          "dark:group-hover:text-white",
          // Active state
          active && "text-black",
          active && "dark:text-white",
          interactive && "cursor-pointer",
        )}
      >
        {children}
      </span>

      <span
        className={cn(
          // Base indicator styles
          indicatorNormalHeightClasses[size],
          "absolute bottom-0 left-0 right-0 z-0",
          "block transition-all duration-150 ease-out",
          // Hover state
          indicatorActiveHeightClasses[size][1],
          // Active state
          active && indicatorActiveHeightClasses[size][0],
          // Active state colors (light mode)
          active && "bg-primary",
        )}
      ></span>
    </div>
  );
}

export default IndicatorText;
