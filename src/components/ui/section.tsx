import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionProps {
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  id?: string;
}

export function Section({ children, className, containerClassName, id }: SectionProps) {
  return (
    <section id={id} className={cn("py-12 md:py-16 lg:py-20", className)}>
      <div className={cn("container", containerClassName)}>
        {children}
      </div>
    </section>
  );
}

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeader({ 
  title, 
  subtitle, 
  description, 
  align = "center",
  className 
}: SectionHeaderProps) {
  return (
    <div className={cn(
      "mb-8 md:mb-12",
      align === "center" && "text-center max-w-3xl mx-auto",
      className
    )}>
      {subtitle && (
        <span className="inline-block text-sm font-medium text-primary mb-2 uppercase tracking-wider">
          {subtitle}
        </span>
      )}
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4">
        {title}
      </h2>
      {description && (
        <p className="text-muted-foreground text-lg">
          {description}
        </p>
      )}
    </div>
  );
}
