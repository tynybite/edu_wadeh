import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Search, Filter, ArrowUpDown, X } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Section, SectionHeader } from "@/components/ui/section";
import { CourseCard } from "@/components/cards/CourseCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Checkbox } from "@/components/ui/checkbox";
import { courses, degreeTypes, departments } from "@/data/courses";

export default function Courses() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("popularity");
  
  const selectedDegree = searchParams.get("degree") || "";
  const selectedDept = searchParams.get("dept") || "";

  const filteredCourses = courses.filter((course) => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.shortTitle.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDegree = !selectedDegree || course.degreeType === selectedDegree;
    const matchesDept = !selectedDept || course.department === selectedDept;
    return matchesSearch && matchesDegree && matchesDept;
  });

  const sortedCourses = [...filteredCourses].sort((a, b) => {
    switch (sortBy) {
      case "rating":
        return b.rating - a.rating;
      case "duration":
        return a.durationMonths - b.durationMonths;
      case "price-low":
        return a.tuitionINR - b.tuitionINR;
      case "price-high":
        return b.tuitionINR - a.tuitionINR;
      default:
        return b.reviewCount - a.reviewCount;
    }
  });

  const clearFilters = () => {
    setSearchParams({});
    setSearchQuery("");
  };

  const hasActiveFilters = selectedDegree || selectedDept || searchQuery;

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-secondary py-12 md:py-16">
        <div className="container">
          <div className="max-w-3xl">
            <Badge className="mb-4">Explore Our Programs</Badge>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-secondary-foreground mb-4">
              Find Your Perfect Program
            </h1>
            <p className="text-lg text-secondary-foreground/80">
              Discover comprehensive Electro-Homeopathy programs designed to launch your healthcare career
            </p>
          </div>
        </div>
      </section>

      <Section>
        {/* Search and Filters */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search programs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex gap-2">
            <Select value={selectedDegree} onValueChange={(value) => {
              const params = new URLSearchParams(searchParams);
              if (value) params.set("degree", value);
              else params.delete("degree");
              setSearchParams(params);
            }}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Degree Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Degrees</SelectItem>
                {degreeTypes.map((type) => (
                  <SelectItem key={type.id} value={type.id}>{type.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedDept} onValueChange={(value) => {
              const params = new URLSearchParams(searchParams);
              if (value) params.set("dept", value);
              else params.delete("dept");
              setSearchParams(params);
            }}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Departments</SelectItem>
                {departments.map((dept) => (
                  <SelectItem key={dept.id} value={dept.id}>{dept.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-40">
                <ArrowUpDown className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popularity">Most Popular</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="duration">Duration (Short to Long)</SelectItem>
                <SelectItem value="price-low">Price (Low to High)</SelectItem>
                <SelectItem value="price-high">Price (High to Low)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Active Filters */}
        {hasActiveFilters && (
          <div className="flex flex-wrap items-center gap-2 mb-6">
            <span className="text-sm text-muted-foreground">Active filters:</span>
            {selectedDegree && (
              <Badge variant="secondary" className="gap-1">
                {degreeTypes.find(t => t.id === selectedDegree)?.label}
                <X 
                  className="h-3 w-3 cursor-pointer" 
                  onClick={() => {
                    const params = new URLSearchParams(searchParams);
                    params.delete("degree");
                    setSearchParams(params);
                  }}
                />
              </Badge>
            )}
            {selectedDept && (
              <Badge variant="secondary" className="gap-1">
                {departments.find(d => d.id === selectedDept)?.name}
                <X 
                  className="h-3 w-3 cursor-pointer" 
                  onClick={() => {
                    const params = new URLSearchParams(searchParams);
                    params.delete("dept");
                    setSearchParams(params);
                  }}
                />
              </Badge>
            )}
            {searchQuery && (
              <Badge variant="secondary" className="gap-1">
                "{searchQuery}"
                <X className="h-3 w-3 cursor-pointer" onClick={() => setSearchQuery("")} />
              </Badge>
            )}
            <Button variant="ghost" size="sm" onClick={clearFilters}>
              Clear all
            </Button>
          </div>
        )}

        {/* Results */}
        <div className="mb-4">
          <p className="text-muted-foreground">
            Showing {sortedCourses.length} of {courses.length} programs
          </p>
        </div>

        {sortedCourses.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {sortedCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground mb-4">
              No programs found matching your criteria
            </p>
            <Button variant="outline" onClick={clearFilters}>
              Clear Filters
            </Button>
          </div>
        )}
      </Section>

      {/* CTA */}
      <Section className="bg-primary text-primary-foreground">
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Need Help Choosing the Right Program?
          </h2>
          <p className="text-lg opacity-90 mb-6">
            Our counselors are here to guide you through your educational journey
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link to="/help">Talk to a Counselor</Link>
          </Button>
        </div>
      </Section>
    </Layout>
  );
}
