import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ProgressBarProps {
  value: number;
  max?: number;
  label?: string;
  showValue?: boolean;
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "success" | "warning" | "destructive";
  animated?: boolean;
}

const sizeConfig = {
  sm: "h-1",
  md: "h-2",
  lg: "h-3",
};

const variantConfig = {
  primary: {
    bg: "bg-primary",
    glow: "shadow-[0_0_10px_hsl(var(--primary)/0.5)]",
  },
  success: {
    bg: "bg-success",
    glow: "shadow-[0_0_10px_hsl(var(--success)/0.5)]",
  },
  warning: {
    bg: "bg-warning",
    glow: "shadow-[0_0_10px_hsl(var(--warning)/0.5)]",
  },
  destructive: {
    bg: "bg-destructive",
    glow: "shadow-[0_0_10px_hsl(var(--destructive)/0.5)]",
  },
};

function getVariantFromValue(value: number): "success" | "warning" | "destructive" {
  if (value >= 70) return "success";
  if (value >= 40) return "warning";
  return "destructive";
}

export function ProgressBar({
  value,
  max = 100,
  label,
  showValue = true,
  size = "md",
  variant,
  animated = true,
}: ProgressBarProps) {
  const percentage = Math.min((value / max) * 100, 100);
  const autoVariant = variant || getVariantFromValue(percentage);
  const config = variantConfig[autoVariant];

  return (
    <div className="space-y-1.5">
      {(label || showValue) && (
        <div className="flex items-center justify-between">
          {label && (
            <span className="text-xs font-display text-muted-foreground tracking-wider">
              {label}
            </span>
          )}
          {showValue && (
            <span className="text-xs font-display text-foreground tracking-wider">
              {Math.round(percentage)}%
            </span>
          )}
        </div>
      )}
      <div className={cn("w-full rounded-full bg-muted/50 overflow-hidden", sizeConfig[size])}>
        <motion.div
          className={cn("h-full rounded-full", config.bg, config.glow)}
          initial={animated ? { width: 0 } : { width: `${percentage}%` }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}
