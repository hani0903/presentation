import { cn } from "@/shared/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "ghost";
}

export function Button({
  className,
  variant = "primary",
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "text-body-3 cursor-pointer rounded-xl px-4 py-2 font-medium transition-colors",
        variant === "primary" &&
          "bg-primary text-on-primary hover:bg-primary/90",
        variant === "ghost" &&
          "text-on-surface-variant hover:bg-surface-container",
        className,
      )}
      {...props}
    />
  );
}
