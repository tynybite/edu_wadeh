import { Link } from "react-router-dom";
import { 
  CheckCircle, 
  Users, 
  Building2, 
  FileText, 
  Video, 
  Target,
  ArrowRight,
  Briefcase
} from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Section, SectionHeader } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const placementStats = [
  { value: "2000+", label: "Students Placed", icon: Users },
  { value: "500+", label: "Job Opportunities", icon: Briefcase },
  { value: "50+", label: "Hiring Partners", icon: Building2 },
  { value: "100+", label: "Mock Sessions Annually", icon: Video }
];

const placementSteps = [
  {
    step: "01",
    title: "Resume Building",
    description: "Expert guidance to create compelling resumes that highlight your skills and achievements"
  },
  {
    step: "02",
    title: "Skill Assessment",
    description: "Identify your strengths and areas for improvement through comprehensive assessments"
  },
  {
    step: "03",
    title: "Interview Preparation",
    description: "Mock interviews and coaching to help you ace your job interviews with confidence"
  },
  {
    step: "04",
    title: "Industry Connect",
    description: "Direct connections with healthcare employers and networking opportunities"
  },
  {
    step: "05",
    title: "Job Matching",
    description: "Personalized job recommendations based on your profile and preferences"
  },
  {
    step: "06",
    title: "Placement Support",
    description: "Continuous support until you secure your desired position"
  }
];

const partners = [
  "Leading Hospitals",
  "Private Clinics",
  "Wellness Centers",
  "Health NGOs",
  "Research Institutions",
  "Healthcare Startups"
];

export default function Placements() {
  return (
    <Layout>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary to-secondary py-16 md:py-24">
        <div className="container">
          <div className="max-w-3xl text-primary-foreground">
            <Badge className="mb-4 bg-accent text-accent-foreground">Career Support</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Experience 100% Placement Assistance For Your Career Success
            </h1>
            <p className="text-xl opacity-90 mb-8">
              Our dedicated placement cell works tirelessly to connect you with the best opportunities in healthcare.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" variant="secondary" asChild>
                <Link to="/apply">Apply Now</Link>
              </Button>
              <Button size="lg" variant="outline" className="bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10" asChild>
                <Link to="/help">Talk to Counselor</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <Section className="bg-card -mt-12 relative z-10 mx-4 md:mx-auto max-w-5xl rounded-xl shadow-lg">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {placementStats.map((stat) => (
            <div key={stat.label} className="text-center">
              <stat.icon className="h-8 w-8 mx-auto mb-2 text-primary" />
              <div className="text-3xl font-bold text-foreground">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* How It Works */}
      <Section>
        <SectionHeader
          subtitle="Our Process"
          title="How Our Placement Assistance Works"
          description="A comprehensive 6-step process designed to maximize your career success"
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {placementSteps.map((step) => (
            <Card key={step.step} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardContent className="pt-6">
                <div className="text-4xl font-bold text-primary/20 mb-4 group-hover:text-primary/40 transition-colors">
                  {step.step}
                </div>
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* Services */}
      <Section className="bg-muted/30">
        <SectionHeader
          subtitle="What We Offer"
          title="Placement Services"
          description="Comprehensive support to prepare you for your healthcare career"
        />
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Career Development</h3>
            <ul className="space-y-3">
              {[
                "Professional resume and cover letter writing",
                "LinkedIn profile optimization",
                "Personal branding workshops",
                "Communication skills training",
                "Soft skills development"
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Interview Preparation</h3>
            <ul className="space-y-3">
              {[
                "One-on-one mock interviews",
                "Group discussion practice",
                "Technical interview coaching",
                "HR interview preparation",
                "Video interview tips"
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* Partners */}
      <Section>
        <SectionHeader
          subtitle="Our Network"
          title="Hiring Partners"
          description="We connect you with leading healthcare organizations"
        />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {partners.map((partner) => (
            <div key={partner} className="p-6 text-center rounded-lg bg-muted hover:bg-muted/80 transition-colors">
              <Building2 className="h-8 w-8 mx-auto mb-2 text-primary" />
              <span className="text-sm font-medium">{partner}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section className="bg-secondary text-secondary-foreground">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Launch Your Healthcare Career?
          </h2>
          <p className="text-lg opacity-90 mb-8">
            Join WMCH and get access to our comprehensive placement assistance program
          </p>
          <Button size="lg" asChild>
            <Link to="/apply">
              Apply Now
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </Section>
    </Layout>
  );
}
