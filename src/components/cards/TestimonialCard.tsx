import { Star, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Testimonial } from "@/data/testimonials";

interface TestimonialCardProps {
  testimonial: Testimonial;
}

const categoryLabels = {
  "working-professional": "Working Professional",
  "international": "International Student",
  "career-switcher": "Career Switcher",
  "fresh-graduate": "Fresh Graduate"
};

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <Card className="h-full transition-all duration-300 hover:shadow-lg">
      <CardContent className="pt-6">
        <div className="flex flex-col h-full">
          <Quote className="h-8 w-8 text-primary/20 mb-4" />
          
          <p className="text-muted-foreground flex-1 mb-6 leading-relaxed">
            "{testimonial.quote}"
          </p>

          <div className="border-t border-border pt-4">
            <div className="flex items-center gap-3">
              <Avatar className="h-12 w-12">
                <AvatarImage src={testimonial.image} alt={testimonial.name} />
                <AvatarFallback className="bg-primary text-primary-foreground">
                  {testimonial.name.split(" ").map(n => n[0]).join("")}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-foreground truncate">
                  {testimonial.name}
                </h4>
                <p className="text-sm text-muted-foreground truncate">
                  {testimonial.role} • {testimonial.program} '{testimonial.batch}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between mt-3">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < testimonial.rating
                        ? "fill-accent text-accent"
                        : "text-muted"
                    }`}
                  />
                ))}
              </div>
              <Badge variant="outline" className="text-xs">
                {categoryLabels[testimonial.category]}
              </Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
