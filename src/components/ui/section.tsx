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
  variant?: "default" | "inverted";
}

export function SectionHeader({ 
  title, 
  subtitle, 
  description, 
  align = "center",
  className,
  variant = "default"
}: SectionHeaderProps) {
  return (
    <div className={cn(
      "mb-8 md:mb-12",
      align === "center" && "text-center max-w-3xl mx-auto",
      className
    )}>
      {subtitle && (
        <span className={cn(
          "inline-block text-sm font-medium mb-2 uppercase tracking-wider",
          variant === "inverted" ? "text-accent" : "text-primary"
        )}>
          {subtitle}
        </span>
      )}
      <h2 className={cn(
        "text-2xl md:text-3xl lg:text-4xl font-bold mb-4",
        variant === "inverted" ? "text-primary-foreground" : "text-foreground"
      )}>
        {title}
      </h2>
      {description && (
        <p className={cn(
          "text-lg",
          variant === "inverted" ? "text-primary-foreground/80" : "text-muted-foreground"
        )}>
          {description}
        </p>
      )}
    </div>
  );
}
