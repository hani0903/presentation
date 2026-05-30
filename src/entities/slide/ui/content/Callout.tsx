import { AlertCircle, CheckCircle, AlertTriangle } from "lucide-react";
import { cn } from "@/shared/lib/utils";

interface CalloutProps {
  variant: "info" | "success" | "warning";
  text: string;
}

const VARIANT_STYLES = {
  info: {
    container: "bg-primary-100 border-primary-300",
    icon: "text-primary-700",
    text: "text-primary-700",
    Icon: AlertCircle,
  },
  success: {
    container: "bg-green-100 border-green-300",
    icon: "text-green-700",
    text: "text-green-700",
    Icon: CheckCircle,
  },
  warning: {
    container: "bg-orange-100 border-orange-300",
    icon: "text-orange-700",
    text: "text-orange-700",
    Icon: AlertTriangle,
  },
} as const;

export const Callout = ({ variant, text }: CalloutProps) => {
  const { container, icon, text: textStyle, Icon } = VARIANT_STYLES[variant];
  return (
    <div
      className={cn(
        "flex items-start gap-3 rounded-2xl border px-5 py-4",
        container,
      )}
    >
      <Icon size={20} className={cn("mt-0.5 shrink-0", icon)} />
      <p className={cn("text-body-2", textStyle)}>{text}</p>
    </div>
  );
};
