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
        "cursor-pointer rounded-md px-4 py-2 text-sm font-medium transition-colors",
        variant === "primary" && "bg-black text-white hover:bg-neutral-800",
        variant === "ghost" && "text-neutral-700 hover:bg-neutral-100",
        className,
      )}
      {...props}
    />
  );
}
