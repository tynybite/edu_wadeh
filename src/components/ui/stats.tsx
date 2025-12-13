import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  value: string;
  label: string;
  icon?: ReactNode;
  className?: string;
}

export function StatCard({ value, label, icon, className }: StatCardProps) {
  return (
    <div className={cn(
      "flex flex-col items-center text-center p-6 rounded-lg bg-card border border-border",
      className
    )}>
      {icon && (
        <div className="mb-3 text-primary">
          {icon}
        </div>
      )}
      <span className="text-3xl md:text-4xl font-bold text-foreground mb-1">
        {value}
      </span>
      <span className="text-sm text-muted-foreground">
        {label}
      </span>
    </div>
  );
}

interface StatsGridProps {
  children: ReactNode;
  className?: string;
}

export function StatsGrid({ children, className }: StatsGridProps) {
  return (
    <div className={cn(
      "grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6",
      className
    )}>
      {children}
    </div>
  );
}
