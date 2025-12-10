import { cn } from "@/lib/utils";

interface StatusIndicatorProps {
  status: "operational" | "warning" | "critical" | "offline";
  label?: string;
  size?: "sm" | "md" | "lg";
  pulse?: boolean;
}

const statusConfig = {
  operational: {
    color: "bg-success",
    glow: "shadow-[0_0_10px_hsl(var(--success)/0.5)]",
    text: "text-success",
    label: "ОПЕРАТИВНА",
  },
  warning: {
    color: "bg-warning",
    glow: "shadow-[0_0_10px_hsl(var(--warning)/0.5)]",
    text: "text-warning",
    label: "ВНИМАНИЕ",
  },
  critical: {
    color: "bg-destructive",
    glow: "shadow-[0_0_10px_hsl(var(--destructive)/0.5)]",
    text: "text-destructive",
    label: "КРИТИЧНА",
  },
  offline: {
    color: "bg-muted-foreground",
    glow: "",
    text: "text-muted-foreground",
    label: "ОФЛАЙН",
  },
};

const sizeConfig = {
  sm: "w-2 h-2",
  md: "w-3 h-3",
  lg: "w-4 h-4",
};

export function StatusIndicator({ 
  status, 
  label, 
  size = "md",
  pulse = true 
}: StatusIndicatorProps) {
  const config = statusConfig[status];
  
  return (
    <div className="flex items-center gap-2">
      <div
        className={cn(
          "rounded-full",
          sizeConfig[size],
          config.color,
          config.glow,
          pulse && status !== "offline" && "animate-pulse"
        )}
      />
      {label !== undefined && (
        <span className={cn("text-xs font-display tracking-wider", config.text)}>
          {label || config.label}
        </span>
      )}
    </div>
  );
}
