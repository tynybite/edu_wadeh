import { Link } from "react-router-dom";
import { 
  Stethoscope, 
  Users, 
  Heart, 
  FlaskConical, 
  ClipboardList,
  ArrowRight,
  CheckCircle,
  IndianRupee,
  Clock,
  Calendar
} from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Section, SectionHeader } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { stipendProgram, requirements } from "@/data/stipend";

const iconMap: Record<string, React.ElementType> = {
  Stethoscope,
  Users,
  Heart,
  FlaskConical,
  ClipboardList
};

export default function Stipend() {
  return (
    <Layout>
      {/* Hero */}
      <section className="bg-gradient-to-br from-accent/90 to-primary py-16 md:py-24">
        <div className="container">
          <div className="max-w-3xl text-primary-foreground">
            <Badge className="mb-4 bg-secondary text-secondary-foreground">After Degree Program</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {stipendProgram.subtitle}
            </h1>
            <p className="text-xl opacity-90 mb-6">
              {stipendProgram.title}
            </p>
            <p className="text-lg opacity-80 mb-8">
              {stipendProgram.description}
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" variant="secondary" asChild>
                <Link to="/apply">Apply for Stipend Program</Link>
              </Button>
              <Button size="lg" variant="outline" className="bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10" asChild>
                <Link to="/help">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <Section className="bg-card -mt-12 relative z-10 mx-4 md:mx-auto max-w-4xl rounded-xl shadow-lg">
        <div className="grid grid-cols-3 gap-6 text-center">
          <div>
            <IndianRupee className="h-8 w-8 mx-auto mb-2 text-accent" />
            <div className="text-3xl font-bold">₹{stipendProgram.stipendMaxINR.toLocaleString("en-IN")}</div>
            <div className="text-sm text-muted-foreground">Monthly Stipend</div>
          </div>
          <div>
            <Clock className="h-8 w-8 mx-auto mb-2 text-primary" />
            <div className="text-3xl font-bold">8 Hours</div>
            <div className="text-sm text-muted-foreground">Daily Working</div>
          </div>
          <div>
            <Calendar className="h-8 w-8 mx-auto mb-2 text-secondary" />
            <div className="text-3xl font-bold">6-12</div>
            <div className="text-sm text-muted-foreground">Months Duration</div>
          </div>
        </div>
      </Section>

      {/* Activities */}
      <Section>
        <SectionHeader
          subtitle="What You'll Do"
          title="Program Activities"
          description="Gain hands-on experience in various healthcare activities"
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stipendProgram.activities.map((activity) => {
            const Icon = iconMap[activity.icon] || Stethoscope;
            return (
              <Card key={activity.title} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardContent className="pt-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">{activity.title}</h3>
                  <p className="text-muted-foreground text-sm">{activity.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </Section>

      {/* Eligibility & Benefits */}
      <Section className="bg-muted/30">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold mb-6">Eligibility Criteria</h2>
            <ul className="space-y-4">
              {stipendProgram.eligibility.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-6">Program Benefits</h2>
            <ul className="space-y-4">
              {stipendProgram.benefits.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* Requirements */}
      <Section>
        <SectionHeader
          subtitle="Get Started"
          title="Admission Requirements"
          description="Documents and qualifications needed to apply"
        />
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardContent className="pt-6">
              <ul className="space-y-4">
                {requirements.map((req) => (
                  <li key={req} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </Section>

      {/* CTA */}
      <Section className="bg-gradient-to-r from-primary to-secondary text-primary-foreground">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            "Best for your future" — "A new system revolution!"
          </h2>
          <p className="text-lg opacity-90 mb-8">
            Start earning while learning with our Junior Medical Staff program
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" variant="secondary" asChild>
              <Link to="/apply">
                Apply Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10" asChild>
              <Link to="/help">Contact: 9564400943</Link>
            </Button>
          </div>
        </div>
      </Section>
    </Layout>
  );
}
