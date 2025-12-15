import { Link } from "react-router-dom";
import { 
  GraduationCap, 
  Users, 
  Award, 
  Globe, 
  Heart, 
  BookOpen, 
  Briefcase, 
  FlaskConical,
  ArrowRight,
  CheckCircle,
  Play,
  Stethoscope,
  Building2,
  BadgeCheck,
  TrendingUp,
  Wallet
} from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Section, SectionHeader } from "@/components/ui/section";
import { StatCard, StatsGrid } from "@/components/ui/stats";
import { CourseCard } from "@/components/cards/CourseCard";
import { TestimonialCard } from "@/components/cards/TestimonialCard";
import { BlogCard } from "@/components/cards/BlogCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { courses } from "@/data/courses";
import { testimonials } from "@/data/testimonials";
import { blogPosts } from "@/data/blogs";
import { faqs } from "@/data/faqs";
import { branding } from "@/data/contact";
import heroBg from "@/assets/hero-bg.jpg";

const specializations = [
  { 
    title: "Electro-Homeopathy",
    description: "Master the science of natural healing",
    degrees: ["B.E.M.S.", "M.D.", "D.E.M.S."],
    icon: FlaskConical
  },
  { 
    title: "Patient Care & OPD/IPD",
    description: "Hands-on clinical experience",
    degrees: ["B.E.M.S.", "M.D."],
    icon: Heart
  },
  { 
    title: "Health Awareness",
    description: "Community health programs",
    degrees: ["All Programs"],
    icon: Users
  },
  { 
    title: "Research & Innovation",
    description: "Contribute to medical science",
    degrees: ["M.D."],
    icon: BookOpen
  },
  { 
    title: "Digital Health",
    description: "Modern healthcare documentation",
    degrees: ["B.E.M.S.", "D.E.M.S."],
    icon: TrendingUp
  },
  { 
    title: "Clinical Practice",
    description: "Real-world treatment skills",
    degrees: ["All Programs"],
    icon: Stethoscope
  }
];

const features = [
  { title: "Caring & Qualified Faculty", icon: Users },
  { title: "Practical Training Focus", icon: Stethoscope },
  { title: "Comprehensive Curriculum", icon: BookOpen },
  { title: "Research & Innovation", icon: FlaskConical },
  { title: "OPD & IPD Practice", icon: Building2 },
  { title: "Scholarships & Stipends", icon: Wallet },
  { title: "100% Placement Assistance", icon: Briefcase },
  { title: "No-Cost EMI Options", icon: BadgeCheck }
];

export default function Home() {
  const featuredCourses = courses.filter(c => c.featured);
  const featuredTestimonials = testimonials.slice(0, 6);
  const featuredBlogs = blogPosts.filter(p => p.featured).slice(0, 3);
  const featuredFaqs = faqs.slice(0, 6);

  return (
    <Layout>
      {/* Hero Section - Online Manipal Style */}
      <section className="relative bg-background overflow-hidden">
        {/* Top announcement bar */}
        <div className="bg-primary text-primary-foreground py-2 text-center text-sm">
          <span>📚 Admissions Open for 2026 — </span>
          <Link to="/apply" className="underline font-medium hover:text-accent">Enroll Now until 05/03/2026!</Link>
        </div>

        <div className="container py-12 lg:py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              {/* Accreditation Badge */}
              <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-muted">
                <CheckCircle className="h-5 w-5 text-secondary" />
                <span className="text-sm font-medium text-foreground">UGC-Entitled • NAAC A+</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
                Education That Powers Your{" "}
                <span className="text-secondary border-b-4 border-accent pb-1">Ambition</span>
              </h1>

              <p className="text-xl text-muted-foreground mb-8">
                {branding.tagline} — <span className="text-secondary font-medium">Wadeh Medical College & Hospital</span>
              </p>

              {/* CTA */}
              <Button size="lg" asChild className="text-lg px-8 bg-accent hover:bg-accent/90">
                <Link to="/apply">Apply Now</Link>
              </Button>
            </div>

            {/* Hero Image Area */}
            <div className="relative hidden lg:block">
              <div 
                className="aspect-square rounded-3xl bg-cover bg-center"
                style={{ backgroundImage: `url(${heroBg})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-secondary/20 to-primary/20 rounded-3xl" />
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-accent/20 rounded-full blur-2xl" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-secondary/20 rounded-full blur-2xl" />
            </div>
          </div>
        </div>

        {/* Program Cards Carousel - Online Manipal Style */}
        <div className="bg-card border-t border-border py-8">
          <div className="container">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {courses.map((course) => (
                <Link
                  key={course.id}
                  to={`/program/${course.id}`}
                  className="group p-4 rounded-xl border border-border bg-background hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="h-20 rounded-lg bg-gradient-to-br from-secondary/20 to-primary/10 mb-3 flex items-center justify-center">
                    <GraduationCap className="h-8 w-8 text-secondary" />
                  </div>
                  <h3 className="font-semibold text-foreground group-hover:text-secondary transition-colors text-center">
                    {course.shortTitle}
                  </h3>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Band - Cleaner Style */}
      <Section className="bg-primary py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-primary-foreground text-center">
          <div>
            <div className="text-4xl md:text-5xl font-bold mb-1">5000+</div>
            <div className="text-sm opacity-80">Learners Empowered</div>
          </div>
          <div>
            <div className="text-4xl md:text-5xl font-bold mb-1">95%</div>
            <div className="text-sm opacity-80">Positive Program ROI</div>
          </div>
          <div>
            <div className="text-4xl md:text-5xl font-bold mb-1">98%</div>
            <div className="text-sm opacity-80">Student Satisfaction</div>
          </div>
          <div>
            <div className="text-4xl md:text-5xl font-bold mb-1">15+</div>
            <div className="text-sm opacity-80">States Reached</div>
          </div>
        </div>
      </Section>

      {/* Top Programs */}
      <Section>
        <SectionHeader
          subtitle="Our Programs"
          title="Top Programs at WMCH"
          description="Choose from our comprehensive range of Electro-Homeopathy programs designed to launch your healthcare career"
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {featuredCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
        <div className="text-center mt-8">
          <Button variant="outline" size="lg" asChild>
            <Link to="/courses">
              View All Programs
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </Section>

      {/* In-Demand Specializations */}
      <Section className="bg-muted/30">
        <SectionHeader
          subtitle="Specializations"
          title="In-Demand Specializations"
          description="Build expertise in high-growth areas of healthcare"
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {specializations.map((spec) => (
            <Card key={spec.title} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <spec.icon className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground mb-1">{spec.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{spec.description}</p>
                    <div className="flex flex-wrap gap-1">
                      {spec.degrees.map((deg) => (
                        <Badge key={deg} variant="secondary" className="text-xs">
                          {deg}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* Institutions */}
      <Section>
        <SectionHeader
          subtitle="Our Institutions"
          title="Two Pillars of Excellence"
          description="Education and clinical practice under one unified vision"
        />
        <div className="grid gap-8 md:grid-cols-2">
          <Card className="overflow-hidden group hover:shadow-xl transition-all duration-300">
            <div className="h-48 bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center">
              <GraduationCap className="h-20 w-20 text-primary group-hover:scale-110 transition-transform" />
            </div>
            <CardContent className="p-6">
              <h3 className="text-2xl font-bold mb-2">Wadeh Medical College</h3>
              <p className="text-muted-foreground mb-4">
                Our education wing provides comprehensive academic programs in Electro-Homeopathy, combining theoretical knowledge with practical training.
              </p>
              <Button variant="outline" asChild>
                <Link to="/courses?dept=College">
                  View Programs
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="overflow-hidden group hover:shadow-xl transition-all duration-300">
            <div className="h-48 bg-gradient-to-br from-accent/20 to-accent/40 flex items-center justify-center">
              <Building2 className="h-20 w-20 text-accent group-hover:scale-110 transition-transform" />
            </div>
            <CardContent className="p-6">
              <h3 className="text-2xl font-bold mb-2">Wadeh Hospital</h3>
              <p className="text-muted-foreground mb-4">
                Our clinical wing provides hands-on patient care experience, including OPD, IPD, and community health programs under expert supervision.
              </p>
              <Button variant="outline" asChild>
                <Link to="/courses?dept=Hospital">
                  Explore Services
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </Section>

      {/* Why Choose Wadeh */}
      <Section className="bg-secondary text-secondary-foreground">
        <SectionHeader
          subtitle="The Wadeh Advantage"
          title="Why Choose WMCH?"
          description="Experience excellence in medical education with our unique advantages"
          className="text-secondary-foreground [&>span]:text-accent [&>p]:text-secondary-foreground/80"
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div key={feature.title} className="flex items-center gap-3 p-4 rounded-lg bg-secondary-foreground/5 hover:bg-secondary-foreground/10 transition-colors">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/20 text-accent">
                <feature.icon className="h-5 w-5" />
              </div>
              <span className="font-medium">{feature.title}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* Placement Assistance */}
      <Section>
        <div className="grid gap-8 lg:grid-cols-2 items-center">
          <div>
            <Badge className="mb-4">100% Placement Assistance</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Experience 100% Placement Assistance For Your Career Success
            </h2>
            <p className="text-muted-foreground mb-6">
              Our dedicated placement cell works tirelessly to connect you with the best opportunities in healthcare. From resume building to interview preparation, we've got you covered.
            </p>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <div className="text-3xl font-bold text-primary">2000+</div>
                <div className="text-sm text-muted-foreground">Students Assisted</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">500+</div>
                <div className="text-sm text-muted-foreground">Job Opportunities</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">50+</div>
                <div className="text-sm text-muted-foreground">Hiring Partners</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">100+</div>
                <div className="text-sm text-muted-foreground">Mock Sessions</div>
              </div>
            </div>
            <Button size="lg" asChild>
              <Link to="/placements">
                Learn More About Placements
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="relative">
            <div className="aspect-video rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
              <div className="absolute inset-0 bg-secondary/80 rounded-lg flex items-center justify-center group cursor-pointer hover:bg-secondary/70 transition-colors">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground group-hover:scale-110 transition-transform">
                  <Play className="h-8 w-8 ml-1" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Testimonials */}
      <Section className="bg-muted/30">
        <SectionHeader
          subtitle="Real Stories"
          title="What Our Learners Say"
          description="Hear from our successful alumni about their transformative journey at WMCH"
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuredTestimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      </Section>

      {/* Stipend Program Banner */}
      <Section className="bg-gradient-to-r from-primary to-secondary text-primary-foreground">
        <div className="text-center max-w-3xl mx-auto">
          <Badge className="mb-4 bg-accent text-accent-foreground">After Degree Program</Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Get up to ₹20,000 Monthly Stipend
          </h2>
          <p className="text-lg opacity-90 mb-6">
            Join our Junior Medical Staff program after completing your degree. Gain hands-on experience while earning a stipend.
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link to="/stipend">
              Learn More About Stipend Program
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </Section>

      {/* FAQs */}
      <Section>
        <SectionHeader
          subtitle="Have Questions?"
          title="Frequently Asked Questions"
          description="Find answers to common questions about our programs and admissions"
        />
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {featuredFaqs.map((faq) => (
              <AccordionItem key={faq.id} value={faq.id}>
                <AccordionTrigger className="text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          <div className="text-center mt-8">
            <Button variant="outline" asChild>
              <Link to="/faqs">
                View All FAQs
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </Section>

      {/* Blogs */}
      <Section className="bg-muted/30">
        <SectionHeader
          subtitle="Latest Updates"
          title="From Our Blog"
          description="Stay informed with the latest news, insights, and stories from WMCH"
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuredBlogs.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
        <div className="text-center mt-8">
          <Button variant="outline" asChild>
            <Link to="/blogs">
              Read More Articles
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </Section>

      {/* CTA Section */}
      <Section className="bg-card">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Begin Your Healthcare Journey?
          </h2>
          <p className="text-lg text-muted-foreground mb-4">
            "Best for your future" — "A new system revolution!"
          </p>
          <p className="text-muted-foreground mb-8">
            Join thousands of successful healthcare practitioners who started their journey at Wadeh Medical College & Hospital.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" asChild>
              <Link to="/apply">Apply Now — Deadline: 05/03/2026</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/help">Talk to a Counselor</Link>
            </Button>
          </div>
        </div>
      </Section>
    </Layout>
  );
}
