import { motion } from "framer-motion";
import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  change?: number;
  changeLabel?: string;
  icon: LucideIcon;
  variant?: "default" | "primary" | "success" | "warning" | "accent";
  delay?: number;
}

const variantStyles = {
  default: "from-muted to-muted/50",
  primary: "from-primary/20 to-primary/5",
  success: "from-success/20 to-success/5",
  warning: "from-warning/20 to-warning/5",
  accent: "from-accent/20 to-accent/5",
};

const iconStyles = {
  default: "text-muted-foreground",
  primary: "text-primary",
  success: "text-success",
  warning: "text-warning",
  accent: "text-accent",
};

export function StatCard({
  title,
  value,
  change,
  changeLabel,
  icon: Icon,
  variant = "default",
  delay = 0,
}: StatCardProps) {
  const isPositive = change && change > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="stat-card group"
    >
      <div className="flex items-start justify-between mb-4">
        <div className={cn(
          "p-3 rounded-xl bg-gradient-to-br",
          variantStyles[variant]
        )}>
          <Icon className={cn("w-6 h-6", iconStyles[variant])} />
        </div>
        {change !== undefined && (
          <div className={cn(
            "flex items-center gap-1 text-sm font-medium",
            isPositive ? "text-success" : "text-destructive"
          )}>
            {isPositive ? (
              <TrendingUp className="w-4 h-4" />
            ) : (
              <TrendingDown className="w-4 h-4" />
            )}
            <span>{Math.abs(change)}%</span>
          </div>
        )}
      </div>

      <h3 className="text-sm text-muted-foreground font-medium mb-1">{title}</h3>
      
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: delay + 0.2 }}
        className="text-3xl font-display font-bold text-foreground"
      >
        {value}
      </motion.p>

      {changeLabel && (
        <p className="text-xs text-muted-foreground mt-2">{changeLabel}</p>
      )}
    </motion.div>
  );
}
