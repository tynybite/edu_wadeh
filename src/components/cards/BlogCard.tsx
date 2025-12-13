import { Link } from "react-router-dom";
import { Calendar, Clock, ArrowRight, User } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BlogPost } from "@/data/blogs";

interface BlogCardProps {
  post: BlogPost;
  variant?: "default" | "featured";
}

export function BlogCard({ post, variant = "default" }: BlogCardProps) {
  const isFeatured = variant === "featured";

  return (
    <Card className={`group h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${isFeatured ? "md:flex md:flex-row" : ""}`}>
      <div className={`relative overflow-hidden ${isFeatured ? "md:w-2/5" : ""}`}>
        <div className={`bg-gradient-to-br from-primary/20 to-secondary/20 ${isFeatured ? "h-full min-h-[200px]" : "h-48"}`}>
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        </div>
        {post.featured && (
          <Badge className="absolute top-3 left-3">Featured</Badge>
        )}
      </div>

      <div className={`flex flex-col ${isFeatured ? "md:w-3/5" : ""}`}>
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
            <Badge variant="outline">{post.category}</Badge>
            <span className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {new Date(post.publishedAt).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "short",
                year: "numeric"
              })}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {post.readTime} min read
            </span>
          </div>
          <h3 className="font-bold text-lg leading-tight text-foreground group-hover:text-primary transition-colors line-clamp-2">
            {post.title}
          </h3>
        </CardHeader>

        <CardContent className="pb-3 flex-1">
          <p className="text-sm text-muted-foreground line-clamp-3">
            {post.excerpt}
          </p>
        </CardContent>

        <CardFooter className="pt-0">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <User className="h-4 w-4" />
              <span>{post.author}</span>
            </div>
            <Link
              to={`/blog/${post.slug}`}
              className="flex items-center gap-1 text-sm font-medium text-primary hover:underline"
            >
              Read More
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </CardFooter>
      </div>
    </Card>
  );
}
