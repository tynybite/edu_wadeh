import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Calendar, Clock, ArrowRight } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Section, SectionHeader } from "@/components/ui/section";
import { BlogCard } from "@/components/cards/BlogCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { blogPosts, blogCategories } from "@/data/blogs";

export default function Blogs() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredPost = blogPosts.find(p => p.featured);

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-secondary py-12 md:py-16">
        <div className="container">
          <div className="max-w-3xl">
            <Badge className="mb-4">Our Blog</Badge>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-secondary-foreground mb-4">
              Insights & Updates
            </h1>
            <p className="text-lg text-secondary-foreground/80">
              Stay informed with the latest news, insights, and stories from Wadeh Medical College & Hospital
            </p>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <Section>
          <BlogCard post={featuredPost} variant="featured" />
        </Section>
      )}

      <Section className="pt-0">
        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {blogCategories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Results */}
        <div className="mb-4">
          <p className="text-muted-foreground">
            Showing {filteredPosts.length} articles
          </p>
        </div>

        {filteredPosts.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground mb-4">
              No articles found matching your criteria
            </p>
            <Button variant="outline" onClick={() => {
              setSearchQuery("");
              setSelectedCategory("All");
            }}>
              Clear Filters
            </Button>
          </div>
        )}
      </Section>

      {/* CTA */}
      <Section className="bg-primary text-primary-foreground">
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Want to Contribute?
          </h2>
          <p className="text-lg opacity-90 mb-6">
            Share your insights and experiences with our community
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link to="/help">Contact Us</Link>
          </Button>
        </div>
      </Section>
    </Layout>
  );
}
