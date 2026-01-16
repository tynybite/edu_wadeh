import { useParams, Link } from "react-router-dom";
import { 
  Clock, 
  Star, 
  ArrowLeft, 
  CheckCircle, 
  Download, 
  Phone,
  Calendar,
  Award,
  BookOpen,
  Users,
  Briefcase
} from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { courses } from "@/data/courses";

export default function Program() {
  const { id } = useParams();
  const course = courses.find((c) => c.id === id);

  if (!course) {
    return (
      <Layout>
        <Section>
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold mb-4">Program Not Found</h1>
            <Button asChild>
              <Link to="/courses">Back to Courses</Link>
            </Button>
          </div>
        </Section>
      </Layout>
    );
  }

  const semesters = [
    { name: "Semester 1", subjects: ["Fundamentals of Electro-Homeopathy", "Anatomy & Physiology", "Basic Pathology", "Health Education"] },
    { name: "Semester 2", subjects: ["Pharmacology I", "Clinical Diagnosis", "Patient Communication", "Research Methods"] },
    { name: "Semester 3", subjects: ["Pharmacology II", "Advanced Therapeutics", "Community Health", "Clinical Practice I"] },
    { name: "Semester 4", subjects: ["Specialization Electives", "Hospital Internship", "Case Studies", "Final Project"] },
  ];

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-secondary py-8 md:py-12">
        <div className="container">
          <Link to="/courses" className="inline-flex items-center text-secondary-foreground/70 hover:text-secondary-foreground mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to All Programs
          </Link>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="flex flex-wrap gap-2 mb-4">
                {course.tags.map((tag) => (
                  <Badge key={tag}>{tag}</Badge>
                ))}
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold text-secondary-foreground mb-4">
                {course.title}
              </h1>
              
              <p className="text-lg text-secondary-foreground/80 mb-6">
                {course.description}
              </p>

              <div className="flex flex-wrap gap-6 text-secondary-foreground">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  <span>{course.durationDisplay || `${course.durationMonths} months`}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 fill-accent text-accent" />
                  <span>{course.rating} ({course.reviewCount} reviews)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  <span>{course.degreeType} Degree</span>
                </div>
              </div>
            </div>

            {/* Sidebar Card */}
            <div className="lg:row-span-2">
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle>Program Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center pb-4 border-b">
                    <span className="text-muted-foreground">Tuition Fee</span>
                    <span className="text-2xl font-bold">{course.tuitionDisplay ? `₹ ${course.tuitionDisplay}` : `₹${course.tuitionINR.toLocaleString("en-IN")}`}</span>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Duration</span>
                      <span>{course.durationDisplay || `${course.durationMonths} months`}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Department</span>
                      <span>{course.department}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Next Cohort</span>
                      <span>January 2026</span>
                    </div>
                  </div>

                  <div className="pt-4 space-y-3">
                    <Button className="w-full" size="lg" asChild>
                      <Link to="/apply">Apply Now</Link>
                    </Button>
                    <Button variant="outline" className="w-full" asChild>
                      <Link to="/help">
                        <Phone className="mr-2 h-4 w-4" />
                        Talk to Counselor
                      </Link>
                    </Button>
                    <Button variant="ghost" className="w-full">
                      <Download className="mr-2 h-4 w-4" />
                      Download Brochure
                    </Button>
                  </div>

                  <div className="pt-4 border-t">
                    <div className="flex flex-wrap gap-2">
                      {course.badges.map((badge) => (
                        <Badge key={badge} variant="outline" className="text-xs">
                          {badge}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Section>
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="w-full justify-start flex-wrap h-auto gap-2 bg-transparent p-0 mb-8">
            <TabsTrigger value="overview" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Overview
            </TabsTrigger>
            <TabsTrigger value="curriculum" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Curriculum
            </TabsTrigger>
            <TabsTrigger value="eligibility" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Eligibility
            </TabsTrigger>
            <TabsTrigger value="career" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Career Support
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4">Program Outcomes</h3>
                <ul className="space-y-3">
                  {course.outcomes.map((outcome) => (
                    <li key={outcome} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>{outcome}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-bold mb-4">Specializations</h3>
                <div className="flex flex-wrap gap-2">
                  {course.specializations.map((spec) => (
                    <Badge key={spec} variant="secondary" className="text-sm">
                      {spec}
                    </Badge>
                  ))}
                </div>

                <h3 className="text-xl font-bold mt-8 mb-4">Program Highlights</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-muted">
                    <BookOpen className="h-5 w-5 text-primary" />
                    <span className="text-sm">Comprehensive Curriculum</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-muted">
                    <Users className="h-5 w-5 text-primary" />
                    <span className="text-sm">Expert Faculty</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-muted">
                    <Briefcase className="h-5 w-5 text-primary" />
                    <span className="text-sm">Clinical Practice</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-muted">
                    <Calendar className="h-5 w-5 text-primary" />
                    <span className="text-sm">Flexible Schedule</span>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="curriculum">
            <h3 className="text-xl font-bold mb-6">Semester-wise Curriculum</h3>
            <Accordion type="single" collapsible className="w-full">
              {semesters.slice(0, Math.ceil(course.durationMonths / 12) * 2).map((semester, index) => (
                <AccordionItem key={index} value={`semester-${index}`}>
                  <AccordionTrigger>{semester.name}</AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-2">
                      {semester.subjects.map((subject) => (
                        <li key={subject} className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-primary" />
                          {subject}
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </TabsContent>

          <TabsContent value="eligibility">
            <div className="max-w-2xl">
              <h3 className="text-xl font-bold mb-6">Eligibility Requirements</h3>
              <ul className="space-y-4">
                {course.eligibility.map((req) => (
                  <li key={req} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>

              <h3 className="text-xl font-bold mt-8 mb-6">Required Documents</h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  10th Admit Card & Marksheet
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  12th Marksheet (if applicable)
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  Aadhar Card or Voter ID
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  Passport-size photographs (4 copies)
                </li>
              </ul>
            </div>
          </TabsContent>

          <TabsContent value="career">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4">Career Opportunities</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <Briefcase className="h-5 w-5 text-primary mt-0.5" />
                    <span>Private Practice / Own Clinic</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Briefcase className="h-5 w-5 text-primary mt-0.5" />
                    <span>Hospital Practitioner</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Briefcase className="h-5 w-5 text-primary mt-0.5" />
                    <span>Community Health Worker</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Briefcase className="h-5 w-5 text-primary mt-0.5" />
                    <span>Health Educator</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Briefcase className="h-5 w-5 text-primary mt-0.5" />
                    <span>Research Associate</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-bold mb-4">Placement Support</h3>
                <p className="text-muted-foreground mb-4">
                  Our dedicated placement cell provides 100% placement assistance including:
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    Resume Building Workshops
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    Mock Interview Sessions
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    Industry Connect Programs
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    Job Portal Access
                  </li>
                </ul>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </Section>

      {/* Sticky CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border p-4 lg:hidden z-40">
        <div className="container flex gap-3">
          <Button className="flex-1" asChild>
            <Link to="/apply">Apply Now</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/help">
              <Phone className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </Layout>
  );
}
