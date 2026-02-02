import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Section, SectionHeader } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  GraduationCap,
  Clock,
  IndianRupee,
  Award,
  BookOpen,
  Users,
  Briefcase,
  CheckCircle2,
  TrendingUp,
  Microscope,
  FlaskConical,
} from "lucide-react";

export default function PhdProgram() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-primary to-primary/90 text-primary-foreground py-16 md:py-24">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-secondary text-secondary-foreground">
              Research Excellence • Doctorate Level
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Ph.D. in Electro-Homeopathy
            </h1>
            <p className="text-xl md:text-2xl mb-4 opacity-90">Doctor of Philosophy</p>
            <p className="text-lg mb-8 opacity-80 max-w-2xl mx-auto">
              Contribute to the advancement of Electro-Homeopathy through rigorous research and scholarly inquiry.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link to="/apply">Apply Now</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
                asChild
              >
                <Link to="/courses">View All Programs</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <Section>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Duration</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3 Years</div>
              <p className="text-xs text-muted-foreground">Minimum duration</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tuition Fee</CardTitle>
              <IndianRupee className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Ask for Details</div>
              <p className="text-xs text-muted-foreground">Contact admissions</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Eligibility</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">M.D.</div>
              <p className="text-xs text-muted-foreground">Masters in Electro-Homeopathy</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Focus</CardTitle>
              <Microscope className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Research</div>
              <p className="text-xs text-muted-foreground">Thesis & Publication</p>
            </CardContent>
          </Card>
        </div>
      </Section>

      {/* Program Overview */}
      <Section className="bg-secondary">
        <SectionHeader
          title="Program Overview"
          subtitle="Pioneering research in Electro-Homeopathy"
        />
        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <h3 className="text-2xl font-bold mb-4">About Ph.D. Program</h3>
            <p className="text-muted-foreground mb-4">
              The Doctor of Philosophy (Ph.D.) in Electro-Homeopathy is a premier research-based program designed for
              scholars and practitioners who wish to contribute original knowledge to the field.
            </p>
            <p className="text-muted-foreground mb-4">
              Candidates will engage in advanced study and research under the guidance of experienced guides, working
              towards a dissertation that addresses key challenges or explores new frontiers in Electro-Homeopathy medicine.
            </p>
            <div className="flex flex-wrap gap-2 mt-6">
              <Badge variant="secondary">Research</Badge>
              <Badge variant="secondary">Innovation</Badge>
              <Badge variant="secondary">Publication</Badge>
              <Badge variant="secondary">Academic Leadership</Badge>
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-4">Research Areas</h3>
            <ul className="space-y-3">
              {[
                "Clinical Efficacy Studies",
                "New Remedy Development",
                "Historical Analysis of Spagyric Medicine",
                "Comparative Medical Systems",
                "Public Health Applications",
                "Standardization of Protocols",
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* FAQs */}
      <Section>
        <SectionHeader
          title="Frequently Asked Questions"
          subtitle="Common questions about the Ph.D. program"
        />
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="faq1">
            <AccordionTrigger>What is the duration of the Ph.D. program?</AccordionTrigger>
            <AccordionContent>
              The minimum duration is 3 years, including coursework and research. It can be extended based on the progress of your research work.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="faq2">
            <AccordionTrigger>What is the fee structure?</AccordionTrigger>
            <AccordionContent>
              The fee structure varies based on the research area and duration. Please contact our admissions office for detailed fee information.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="faq3">
            <AccordionTrigger>Is there an entrance exam?</AccordionTrigger>
            <AccordionContent>
              Yes, admission is subject to qualifying in the entrance examination followed by an interview and research proposal presentation.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </Section>
    </Layout>
  );
}
