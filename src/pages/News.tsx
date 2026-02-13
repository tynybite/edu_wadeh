import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, ArrowRight, Loader2, AlertCircle } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Section } from "@/components/ui/section";
import { BlogCard } from "@/components/cards/BlogCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { BlogPost } from "@/data/blogs";

export default function Blogs() {
  const [news, setNews] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Fetch News from API
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch('http://localhost:8080/news');
        if (!response.ok) {
          throw new Error('Failed to fetch news');
        }
        const data = await response.json();
        
        // Map API response to BlogPost interface
        const mappedNews: BlogPost[] = data.map((item: any) => ({
            id: item.id,
            title: item.title,
            slug: item.slug || item.id, // Fallback slug
            excerpt: item.excerpt || item.content?.substring(0, 150) + "...",
            content: item.content || "",
            author: item.author?.name || "Wadeh Team", 
            authorRole: item.author?.role || "Contributor",
            authorImage: item.author?.avatar || "/placeholder.svg",
            category: item.category || "General",
            tags: item.tags || ["News"],
            publishedAt: item.date || new Date().toISOString(),
            readTime: item.readTime || 5,
            image: item.image || "/placeholder.svg",
            featured: item.featured || false
        }));

        setNews(mappedNews);
      } catch (err) {
        console.error("News fetch error:", err);
        setError("Failed to load news articles. Please try again later.");
        toast.error("Could not fetch latest news");
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  // Filter Logic
  const filteredPosts = news.filter((post) => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Extract Categories dynamically
  const categories = ["All", ...Array.from(new Set(news.map(item => item.category)))];
  
  const featuredPost = news.find(p => p.featured) || news[0]; // Fallback to first if no featured

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

      {/* Loading State */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-24 text-muted-foreground">
          <Loader2 className="h-10 w-10 animate-spin mb-4" />
          <p>Loading latest updates...</p>
        </div>
      )}

      {/* Error State */}
      {!loading && error && (
        <div className="flex flex-col items-center justify-center py-24 text-destructive">
          <AlertCircle className="h-10 w-10 mb-4" />
          <p className="text-lg font-medium">{error}</p>
          <Button variant="outline" className="mt-4" onClick={() => window.location.reload()}>Retry</Button>
        </div>
      )}

      {/* Content */}
      {!loading && !error && (
        <>
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
                {categories.map((category) => (
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
        </>
      )}

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
