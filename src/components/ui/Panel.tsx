import { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface PanelProps {
  children: ReactNode;
  className?: string;
  variant?: "default" | "highlighted" | "accent";
  animate?: boolean;
  delay?: number;
  id?: string;
}

const variantStyles = {
  default: "border-border/50",
  highlighted: "border-primary/30 shadow-[0_0_30px_hsl(var(--primary)/0.1)]",
  accent: "border-accent/30 shadow-[0_0_30px_hsl(var(--accent)/0.1)]",
};

export function Panel({ 
  children, 
  className, 
  variant = "default",
  animate = true,
  delay = 0,
  id
}: PanelProps) {
  const content = (
    <div
      id={id}
      className={cn(
        "panel relative overflow-hidden rounded-xl border p-6",
        "bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-md",
        variantStyles[variant],
        className
      )}
    >
      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-primary/30 rounded-tl-xl" />
      <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-primary/30 rounded-tr-xl" />
      <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-primary/30 rounded-bl-xl" />
      <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-primary/30 rounded-br-xl" />
      
      {children}
    </div>
  );

  if (!animate) return content;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      {content}
    </motion.div>
  );
}

interface PanelHeaderProps {
  title: string;
  subtitle?: string;
  icon?: ReactNode;
  status?: ReactNode;
}

export function PanelHeader({ title, subtitle, icon, status }: PanelHeaderProps) {
  return (
    <div className="flex items-start justify-between mb-4">
      <div className="flex items-center gap-3">
        {icon && (
          <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center text-primary">
            {icon}
          </div>
        )}
        <div>
          <h3 className="font-display text-sm tracking-wider text-foreground">
            {title}
          </h3>
          {subtitle && (
            <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>
          )}
        </div>
      </div>
      {status}
    </div>
  );
}
