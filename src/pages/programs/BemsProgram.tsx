import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Section, SectionHeader } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
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
    HeartPulse
} from "lucide-react";

export default function BemsProgram() {
    return (
        <Layout>
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground py-16 md:py-24">
                <div className="container">
                    <div className="max-w-4xl mx-auto text-center">
                        <Badge className="mb-4 bg-secondary text-secondary-foreground">UGC-entitled • NAAC A+ Accredited</Badge>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                            Bachelor of Electro-Homeopathy Medicine & Surgery
                        </h1>
                        <p className="text-xl md:text-2xl mb-4 opacity-90">B.E.M.S.</p>
                        <p className="text-lg mb-8 opacity-80 max-w-2xl mx-auto">
                            Launch your healthcare career with a comprehensive 4-year undergraduate program that combines
                            traditional Electro-Homeopathy principles with modern medical knowledge.
                        </p>
                        <div className="flex flex-wrap gap-4 justify-center">
                            <Button size="lg" variant="secondary" asChild>
                                <Link to="/apply">Apply Now</Link>
                            </Button>
                            <Button size="lg" variant="outline" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary" asChild>
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
                            <div className="text-2xl font-bold">4 Years</div>
                            <p className="text-xs text-muted-foreground">48 months full-time</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Tuition Fee</CardTitle>
                            <IndianRupee className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">₹1,50,000</div>
                            <p className="text-xs text-muted-foreground">Total program cost</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Student Rating</CardTitle>
                            <Award className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">4.7/5.0</div>
                            <p className="text-xs text-muted-foreground">Based on 245 reviews</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Popularity</CardTitle>
                            <TrendingUp className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">Most Popular</div>
                            <p className="text-xs text-muted-foreground">In-demand program</p>
                        </CardContent>
                    </Card>
                </div>
            </Section>

            {/* Program Overview */}
            <Section className="bg-secondary">
                <SectionHeader
                    title="Program Overview"
                    subtitle="A comprehensive foundation in Electro-Homeopathy medicine"
                />
                <div className="grid gap-8 lg:grid-cols-2">
                    <div>
                        <h3 className="text-2xl font-bold mb-4">About B.E.M.S.</h3>
                        <p className="text-muted-foreground mb-4">
                            The Bachelor of Electro-Homeopathy Medicine & Surgery (B.E.M.S.) is a comprehensive
                            4-year undergraduate program designed to train students in the principles and practice
                            of Electro-Homeopathy, a holistic healthcare system that combines traditional healing
                            methods with modern medical knowledge.
                        </p>
                        <p className="text-muted-foreground mb-4">
                            This program provides students with theoretical knowledge and hands-on clinical experience,
                            preparing them to become licensed Electro-Homeopathy practitioners capable of providing
                            effective patient care and contributing to community health.
                        </p>
                        <div className="flex flex-wrap gap-2 mt-6">
                            <Badge variant="secondary">Electro-Homeopathy</Badge>
                            <Badge variant="secondary">Patient Care</Badge>
                            <Badge variant="secondary">Community Health</Badge>
                            <Badge variant="secondary">Clinical Practice</Badge>
                        </div>
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold mb-4">What You'll Learn</h3>
                        <ul className="space-y-3">
                            {[
                                "Fundamental principles of Electro-Homeopathy",
                                "Anatomy, Physiology & Pathology",
                                "Materia Medica & Therapeutics",
                                "Clinical diagnosis and examination",
                                "Patient care management",
                                "Research methodology & documentation",
                                "Community health awareness",
                                "Professional ethics & practice management"
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

            {/* Eligibility Criteria */}
            <Section>
                <SectionHeader
                    title="Eligibility Criteria"
                    subtitle="Who can apply for this program"
                />
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <BookOpen className="h-5 w-5" />
                            Admission Requirements
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-3">
                                <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                                <div>
                                    <strong>Educational Qualification:</strong> 10+2 with PCB (Physics, Chemistry, Biology)
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                                <div>
                                    <strong>Minimum Marks:</strong> Minimum 50% aggregate marks in qualifying examination
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                                <div>
                                    <strong>Identity Proof:</strong> Valid ID proof (Aadhar Card, Voter Card, or Passport)
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                                <div>
                                    <strong>Age Limit:</strong> Minimum 17 years of age at the time of admission
                                </div>
                            </li>
                        </ul>
                    </CardContent>
                </Card>
            </Section>

            {/* Career Outcomes */}
            <Section className="bg-secondary">
                <SectionHeader
                    title="Career Outcomes"
                    subtitle="What you can achieve after completing B.E.M.S."
                />
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {[
                        {
                            icon: HeartPulse,
                            title: "Licensed Practitioner",
                            description: "Become a certified Electro-Homeopathy practitioner with the authority to practice independently"
                        },
                        {
                            icon: Briefcase,
                            title: "Clinical Expertise",
                            description: "Master clinical treatment methods and patient care management skills"
                        },
                        {
                            icon: Users,
                            title: "Community Health",
                            description: "Contribute to community health initiatives and public wellness programs"
                        },
                        {
                            icon: GraduationCap,
                            title: "Advanced Studies",
                            description: "Pursue M.D. in Electro-Homeopathy or other advanced specializations"
                        }
                    ].map((outcome, index) => (
                        <Card key={index}>
                            <CardHeader>
                                <outcome.icon className="h-10 w-10 text-primary mb-2" />
                                <CardTitle className="text-lg">{outcome.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground">{outcome.description}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </Section>

            {/* Curriculum Highlights */}
            <Section>
                <SectionHeader
                    title="Curriculum Highlights"
                    subtitle="Comprehensive 4-year course structure"
                />
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="year1">
                        <AccordionTrigger className="text-lg font-semibold">
                            Year 1: Foundation Studies
                        </AccordionTrigger>
                        <AccordionContent>
                            <ul className="space-y-2 ml-4">
                                <li>• Introduction to Electro-Homeopathy</li>
                                <li>• Human Anatomy & Physiology</li>
                                <li>• Basic Medical Sciences</li>
                                <li>• Health & Hygiene</li>
                                <li>• Communication Skills</li>
                            </ul>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="year2">
                        <AccordionTrigger className="text-lg font-semibold">
                            Year 2: Core Medical Sciences
                        </AccordionTrigger>
                        <AccordionContent>
                            <ul className="space-y-2 ml-4">
                                <li>• Pathology & Microbiology</li>
                                <li>• Materia Medica - Part I</li>
                                <li>• Clinical Methods & Diagnosis</li>
                                <li>• Pharmacy & Pharmacology</li>
                                <li>• First Aid & Emergency Care</li>
                            </ul>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="year3">
                        <AccordionTrigger className="text-lg font-semibold">
                            Year 3: Clinical Training
                        </AccordionTrigger>
                        <AccordionContent>
                            <ul className="space-y-2 ml-4">
                                <li>• Materia Medica - Part II</li>
                                <li>• Clinical Practice & Case Studies</li>
                                <li>• Therapeutics & Repertory</li>
                                <li>• Hospital Internship - Phase I</li>
                                <li>• Research Methodology</li>
                            </ul>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="year4">
                        <AccordionTrigger className="text-lg font-semibold">
                            Year 4: Advanced Practice & Internship
                        </AccordionTrigger>
                        <AccordionContent>
                            <ul className="space-y-2 ml-4">
                                <li>• Advanced Clinical Practice</li>
                                <li>• Community Medicine & Public Health</li>
                                <li>• Practice Management & Ethics</li>
                                <li>• Hospital Internship - Phase II (Full-time)</li>
                                <li>• Dissertation/Research Project</li>
                            </ul>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </Section>

            {/* FAQs */}
            <Section className="bg-secondary">
                <SectionHeader
                    title="Frequently Asked Questions"
                    subtitle="Common questions about B.E.M.S. program"
                />
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="faq1">
                        <AccordionTrigger>Is B.E.M.S. a recognized degree?</AccordionTrigger>
                        <AccordionContent>
                            Yes, B.E.M.S. is a UGC-entitled degree program accredited by NAAC with A+ grade.
                            Graduates are eligible to practice as licensed Electro-Homeopathy practitioners.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="faq2">
                        <AccordionTrigger>What is the admission process?</AccordionTrigger>
                        <AccordionContent>
                            Admissions are based on merit in the qualifying examination (10+2 with PCB).
                            Candidates need to fill out the online application form and submit required documents.
                            Shortlisted candidates may be called for counseling.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="faq3">
                        <AccordionTrigger>Are there any scholarships available?</AccordionTrigger>
                        <AccordionContent>
                            Yes, we offer merit-based scholarships and also have a stipend program for eligible students.
                            Please visit our Stipend Program page for more details.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="faq4">
                        <AccordionTrigger>Can I pursue M.D. after B.E.M.S.?</AccordionTrigger>
                        <AccordionContent>
                            Absolutely! B.E.M.S. graduates are eligible to pursue M.D. in Electro-Homeopathy
                            or other postgraduate programs in allied health sciences.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="faq5">
                        <AccordionTrigger>What are the career opportunities after B.E.M.S.?</AccordionTrigger>
                        <AccordionContent>
                            Graduates can start their own clinic, work in hospitals, join research organizations,
                            pursue teaching positions, or work in community health programs. The demand for
                            holistic healthcare practitioners is growing rapidly.
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </Section>

            {/* CTA Section */}
            <Section className="bg-primary text-primary-foreground">
                <div className="text-center max-w-3xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Ready to Start Your Healthcare Journey?
                    </h2>
                    <p className="text-lg opacity-90 mb-8">
                        Join hundreds of students who have chosen B.E.M.S. at Wadeh Medical College.
                        Admissions for 2026 are now open!
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center">
                        <Button size="lg" variant="secondary" asChild>
                            <Link to="/apply">Apply for B.E.M.S.</Link>
                        </Button>
                        <Button
                            size="lg"
                            variant="outline"
                            className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
                            asChild
                        >
                            <Link to="/help">Talk to a Counselor</Link>
                        </Button>
                    </div>
                </div>
            </Section>
        </Layout>
    );
}
