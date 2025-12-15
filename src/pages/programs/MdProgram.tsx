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
    Microscope,
    FlaskConical
} from "lucide-react";

export default function MdProgram() {
    return (
        <Layout>
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-primary via-primary to-primary/90 text-primary-foreground py-16 md:py-24">
                <div className="container">
                    <div className="max-w-4xl mx-auto text-center">
                        <Badge className="mb-4 bg-secondary text-secondary-foreground">UGC-entitled • NAAC A+ • Research-Focused</Badge>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                            Master of Electro-Homeopathy Medicine
                        </h1>
                        <p className="text-xl md:text-2xl mb-4 opacity-90">M.D.</p>
                        <p className="text-lg mb-8 opacity-80 max-w-2xl mx-auto">
                            Advance your expertise with a 2-year postgraduate program focused on research,
                            advanced therapeutics, and clinical leadership in Electro-Homeopathy.
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
                            <div className="text-2xl font-bold">2 Years</div>
                            <p className="text-xs text-muted-foreground">24 months full-time</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Tuition Fee</CardTitle>
                            <IndianRupee className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">₹2,00,000</div>
                            <p className="text-xs text-muted-foreground">Total program cost</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Student Rating</CardTitle>
                            <Award className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">4.8/5.0</div>
                            <p className="text-xs text-muted-foreground">Based on 89 reviews</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Focus</CardTitle>
                            <TrendingUp className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">Advanced</div>
                            <p className="text-xs text-muted-foreground">Research & Specialization</p>
                        </CardContent>
                    </Card>
                </div>
            </Section>

            {/* Program Overview */}
            <Section className="bg-secondary">
                <SectionHeader
                    title="Program Overview"
                    subtitle="Advanced specialization in Electro-Homeopathy"
                />
                <div className="grid gap-8 lg:grid-cols-2">
                    <div>
                        <h3 className="text-2xl font-bold mb-4">About M.D. Program</h3>
                        <p className="text-muted-foreground mb-4">
                            The Master of Electro-Homeopathy Medicine (M.D.) is an advanced 2-year postgraduate
                            program designed for qualified practitioners seeking deeper specialization in
                            Electro-Homeopathy. This program emphasizes research methodology, advanced therapeutics,
                            and clinical leadership.
                        </p>
                        <p className="text-muted-foreground mb-4">
                            Students engage in cutting-edge research, develop advanced clinical skills, and prepare
                            for leadership roles in healthcare, academia, and research institutions. The program
                            combines rigorous academic study with practical clinical experience and independent research.
                        </p>
                        <div className="flex flex-wrap gap-2 mt-6">
                            <Badge variant="secondary">Advanced Therapeutics</Badge>
                            <Badge variant="secondary">Research Methodology</Badge>
                            <Badge variant="secondary">Clinical Leadership</Badge>
                            <Badge variant="secondary">Academic Excellence</Badge>
                        </div>
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold mb-4">What You'll Master</h3>
                        <ul className="space-y-3">
                            {[
                                "Advanced Electro-Homeopathy therapeutics",
                                "Research design and methodology",
                                "Statistical analysis and data interpretation",
                                "Clinical trials and evidence-based practice",
                                "Academic writing and publications",
                                "Teaching and mentorship skills",
                                "Healthcare policy and administration",
                                "Specialized treatment protocols"
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
                    subtitle="Requirements for M.D. admissions"
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
                                    <strong>Educational Qualification:</strong> B.E.M.S. or equivalent degree in Electro-Homeopathy or allied health sciences
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                                <div>
                                    <strong>Minimum Marks:</strong> Minimum 55% aggregate marks in undergraduate degree
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                                <div>
                                    <strong>Experience:</strong> Clinical experience preferred but not mandatory
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                                <div>
                                    <strong>Research Interest:</strong> Statement of purpose outlining research interests and career goals
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
                    subtitle="Leadership opportunities after M.D."
                />
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {[
                        {
                            icon: Microscope,
                            title: "Research Leadership",
                            description: "Lead cutting-edge research projects and contribute to medical literature"
                        },
                        {
                            icon: GraduationCap,
                            title: "Academic Positions",
                            description: "Become a faculty member at medical colleges and training institutions"
                        },
                        {
                            icon: Briefcase,
                            title: "Specialist Practitioner",
                            description: "Establish yourself as an advanced specialist in Electro-Homeopathy"
                        },
                        {
                            icon: FlaskConical,
                            title: "Healthcare Innovation",
                            description: "Develop new treatment protocols and advance the field"
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
                    subtitle="Comprehensive 2-year postgraduate structure"
                />
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="year1">
                        <AccordionTrigger className="text-lg font-semibold">
                            Year 1: Advanced Theory & Research Foundation
                        </AccordionTrigger>
                        <AccordionContent>
                            <ul className="space-y-2 ml-4">
                                <li>• Advanced Materia Medica & Therapeutics</li>
                                <li>• Research Methodology & Biostatistics</li>
                                <li>• Advanced Clinical Practice</li>
                                <li>• Specialized Treatment Protocols</li>
                                <li>• Literature Review & Evidence-Based Practice</li>
                                <li>• Teaching Methodology</li>
                            </ul>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="year2">
                        <AccordionTrigger className="text-lg font-semibold">
                            Year 2: Research & Dissertation
                        </AccordionTrigger>
                        <AccordionContent>
                            <ul className="space-y-2 ml-4">
                                <li>• Independent Research Project</li>
                                <li>• Clinical Trials & Case Studies</li>
                                <li>• Data Analysis & Interpretation</li>
                                <li>• Thesis Writing & Defense</li>
                                <li>• Advanced Seminars & Presentations</li>
                                <li>• Publication Preparation</li>
                            </ul>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="specializations">
                        <AccordionTrigger className="text-lg font-semibold">
                            Specialization Tracks
                        </AccordionTrigger>
                        <AccordionContent>
                            <ul className="space-y-2 ml-4">
                                <li>• Clinical Research & Trials</li>
                                <li>• Advanced Therapeutics</li>
                                <li>• Pediatric Electro-Homeopathy</li>
                                <li>• Geriatric Care Specialization</li>
                                <li>• Chronic Disease Management</li>
                                <li>• Public Health & Epidemiology</li>
                            </ul>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </Section>

            {/* Research Facilities */}
            <Section className="bg-secondary">
                <SectionHeader
                    title="Research Facilities"
                    subtitle="State-of-the-art infrastructure for advanced research"
                />
                <div className="grid gap-6 md:grid-cols-3">
                    {[
                        {
                            title: "Modern Research Lab",
                            description: "Equipped with latest instruments for clinical research and analysis"
                        },
                        {
                            title: "Digital Library",
                            description: "Access to international journals, databases, and research publications"
                        },
                        {
                            title: "Clinical Research Center",
                            description: "Dedicated facility for conducting clinical trials and case studies"
                        },
                        {
                            title: "Expert Mentorship",
                            description: "Guidance from experienced researchers and clinicians"
                        },
                        {
                            title: "Collaboration Network",
                            description: "Partnerships with research institutions and hospitals"
                        },
                        {
                            title: "Publication Support",
                            description: "Assistance with writing and publishing research papers"
                        }
                    ].map((facility, index) => (
                        <Card key={index}>
                            <CardHeader>
                                <CardTitle className="text-lg">{facility.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground">{facility.description}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </Section>

            {/* FAQs */}
            <Section>
                <SectionHeader
                    title="Frequently Asked Questions"
                    subtitle="Common questions about M.D. program"
                />
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="faq1">
                        <AccordionTrigger>Who should pursue M.D. in Electro-Homeopathy?</AccordionTrigger>
                        <AccordionContent>
                            M.D. is ideal for B.E.M.S. graduates who want to specialize, engage in research,
                            pursue academic careers, or become advanced specialists in clinical practice.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="faq2">
                        <AccordionTrigger>Is clinical experience required for admission?</AccordionTrigger>
                        <AccordionContent>
                            While clinical experience is preferred and valued, it is not mandatory. However,
                            candidates with practical experience may have an advantage during the selection process.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="faq3">
                        <AccordionTrigger>What research opportunities are available?</AccordionTrigger>
                        <AccordionContent>
                            Students can engage in clinical trials, epidemiological studies, therapeutic research,
                            and collaborative projects with hospitals and research institutions. Publication support
                            is also provided.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="faq4">
                        <AccordionTrigger>Can I practice while pursuing M.D.?</AccordionTrigger>
                        <AccordionContent>
                            The M.D. program is full-time and requires dedicated commitment to coursework and research.
                            However, students gain extensive clinical experience through the program's practical components.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="faq5">
                        <AccordionTrigger>Are there teaching opportunities after M.D.?</AccordionTrigger>
                        <AccordionContent>
                            Yes! M.D. graduates are qualified to teach at medical colleges and institutions.
                            We also provide teaching methodology training as part of the curriculum.
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </Section>

            {/* CTA Section */}
            <Section className="bg-primary text-primary-foreground">
                <div className="text-center max-w-3xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Advance Your Expertise with M.D.
                    </h2>
                    <p className="text-lg opacity-90 mb-8">
                        Join our research-focused postgraduate program and become a leader in
                        Electro-Homeopathy. Admissions for 2026 are now open!
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center">
                        <Button size="lg" variant="secondary" asChild>
                            <Link to="/apply">Apply for M.D.</Link>
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
