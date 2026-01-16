import { Link } from "react-router-dom";
import { Star, Clock, ArrowRight } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Course } from "@/data/courses";
import { cn } from "@/lib/utils";

interface CourseCardProps {
  course: Course;
  variant?: "default" | "featured";
}

export function CourseCard({ course, variant = "default" }: CourseCardProps) {
  const isFeatured = variant === "featured" || course.featured;

  return (
    <Card className={cn(
      "group h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1",
      isFeatured && "ring-2 ring-primary/20"
    )}>
      <CardHeader className="pb-3">
        <div className="flex flex-wrap gap-2 mb-3">
          {course.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
        <h3 className="font-bold text-lg leading-tight text-foreground group-hover:text-primary transition-colors">
          {course.shortTitle}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {course.title}
        </p>
      </CardHeader>
      
      <CardContent className="pb-3">
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-1 text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>{course.durationDisplay || `${course.durationMonths} months`}</span>
            </div>
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-accent text-accent" />
              <span className="font-medium">{course.rating}</span>
              <span className="text-muted-foreground">({course.reviewCount})</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-1">
            {course.specializations.slice(0, 2).map((spec) => (
              <span key={spec} className="text-xs bg-muted px-2 py-1 rounded">
                {spec}
              </span>
            ))}
            {course.specializations.length > 2 && (
              <span className="text-xs bg-muted px-2 py-1 rounded">
                +{course.specializations.length - 2} more
              </span>
            )}
          </div>

          <div className="pt-2 border-t border-border">
            <div className="flex items-baseline justify-between">
              <span className="text-sm text-muted-foreground">Starting from</span>
              <span className="text-lg font-bold text-foreground">
                {course.tuitionDisplay ? (course.tuitionDisplay.includes("Lakhs") || course.tuitionDisplay.includes("*") ? `₹ ${course.tuitionDisplay}` : `₹${course.tuitionDisplay}`) : `₹${course.tuitionINR.toLocaleString("en-IN")}`}
              </span>
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter>
        <Button asChild className="w-full group/btn">
          <Link to={`/program/${course.id}`}>
            {course.ctaLabel}
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
