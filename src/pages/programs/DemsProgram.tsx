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
    Zap,
    Target
} from "lucide-react";

export default function DemsProgram() {
    return (
        <Layout>
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground py-16 md:py-24">
                <div className="container">
                    <div className="max-w-4xl mx-auto text-center">
                        <Badge className="mb-4 bg-secondary text-secondary-foreground">Recognized Diploma • Quick Start</Badge>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                            Diploma in Electro-Homeopathy Medicine & Surgery
                        </h1>
                        <p className="text-xl md:text-2xl mb-4 opacity-90">D.E.M.S.</p>
                        <p className="text-lg mb-8 opacity-80 max-w-2xl mx-auto">
                            Start your healthcare career faster with a 2-year diploma program focused on
                            practical skills and foundational knowledge in Electro-Homeopathy.
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
                            <div className="text-2xl font-bold">₹80,000</div>
                            <p className="text-xs text-muted-foreground">Total program cost</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Student Rating</CardTitle>
                            <Award className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">4.5/5.0</div>
                            <p className="text-xs text-muted-foreground">Based on 156 reviews</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Focus</CardTitle>
                            <TrendingUp className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">Practical</div>
                            <p className="text-xs text-muted-foreground">Hands-on training</p>
                        </CardContent>
                    </Card>
                </div>
            </Section>

            {/* Program Overview */}
            <Section className="bg-secondary">
                <SectionHeader
                    title="Program Overview"
                    subtitle="Fast-track your career with practical training"
                />
                <div className="grid gap-8 lg:grid-cols-2">
                    <div>
                        <h3 className="text-2xl font-bold mb-4">About D.E.M.S.</h3>
                        <p className="text-muted-foreground mb-4">
                            The Diploma in Electro-Homeopathy Medicine & Surgery (D.E.M.S.) is a 2-year professional
                            program designed for students who want to enter the healthcare field quickly. This diploma
                            provides foundational knowledge and practical skills needed to become a certified practitioner.
                        </p>
                        <p className="text-muted-foreground mb-4">
                            With a strong emphasis on practical training and patient interaction, D.E.M.S. graduates
                            are well-prepared to manage OPD clinics, provide patient counseling, and deliver basic
                            clinical care. The program also serves as a pathway to advanced degree programs.
                        </p>
                        <div className="flex flex-wrap gap-2 mt-6">
                            <Badge variant="secondary">Quick Start</Badge>
                            <Badge variant="secondary">Practical Focus</Badge>
                            <Badge variant="secondary">Patient Interaction</Badge>
                            <Badge variant="secondary">Affordable</Badge>
                        </div>
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold mb-4">What You'll Learn</h3>
                        <ul className="space-y-3">
                            {[
                                "Basic principles of Electro-Homeopathy",
                                "Patient examination and diagnosis",
                                "OPD management and clinic operations",
                                "Basic treatment protocols",
                                "Patient counseling techniques",
                                "Medical documentation",
                                "Health hygiene and first aid",
                                "Professional ethics and practice"
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

            {/* Why Choose D.E.M.S. */}
            <Section>
                <SectionHeader
                    title="Why Choose D.E.M.S.?"
                    subtitle="Advantages of the diploma program"
                />
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {[
                        {
                            icon: Zap,
                            title: "Faster Entry",
                            description: "Start practicing sooner with a 2-year program instead of 4 years"
                        },
                        {
                            icon: Target,
                            title: "Practical Focus",
                            description: "More hands-on training and less theoretical coursework"
                        },
                        {
                            icon: IndianRupee,
                            title: "Affordable",
                            description: "Lower tuition fee makes quality education accessible"
                        },
                        {
                            icon: Briefcase,
                            title: "Career Ready",
                            description: "Graduates can start their own practice or work in clinics"
                        },
                        {
                            icon: GraduationCap,
                            title: "Pathway to B.E.M.S.",
                            description: "Can pursue B.E.M.S. with credit transfer opportunities"
                        },
                        {
                            icon: Users,
                            title: "Community Impact",
                            description: "Serve your community with accessible healthcare"
                        }
                    ].map((benefit, index) => (
                        <Card key={index}>
                            <CardHeader>
                                <benefit.icon className="h-10 w-10 text-primary mb-2" />
                                <CardTitle className="text-lg">{benefit.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground">{benefit.description}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </Section>

            {/* Eligibility Criteria */}
            <Section className="bg-secondary">
                <SectionHeader
                    title="Eligibility Criteria"
                    subtitle="Who can apply for D.E.M.S."
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
                                    <strong>Educational Qualification:</strong> 10+2 or equivalent from a recognized board
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                                <div>
                                    <strong>Preferred Background:</strong> Science background preferred but not mandatory
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
                                    <strong>Age Requirement:</strong> Minimum 17 years of age at the time of admission
                                </div>
                            </li>
                        </ul>
                    </CardContent>
                </Card>
            </Section>

            {/* Career Outcomes */}
            <Section>
                <SectionHeader
                    title="Career Outcomes"
                    subtitle="What you can achieve after D.E.M.S."
                />
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {[
                        {
                            title: "Certified Practitioner",
                            description: "Start your own Electro-Homeopathy clinic or dispensary"
                        },
                        {
                            title: "OPD Management",
                            description: "Work in outpatient departments of hospitals and clinics"
                        },
                        {
                            title: "Patient Counseling",
                            description: "Provide health counseling and wellness guidance"
                        },
                        {
                            title: "Further Studies",
                            description: "Pursue B.E.M.S. or other advanced programs"
                        }
                    ].map((outcome, index) => (
                        <Card key={index}>
                            <CardHeader>
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
            <Section className="bg-secondary">
                <SectionHeader
                    title="Curriculum Highlights"
                    subtitle="Comprehensive 2-year diploma structure"
                />
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="year1">
                        <AccordionTrigger className="text-lg font-semibold">
                            Year 1: Foundation & Basic Sciences
                        </AccordionTrigger>
                        <AccordionContent>
                            <ul className="space-y-2 ml-4">
                                <li>• Introduction to Electro-Homeopathy</li>
                                <li>• Basic Anatomy & Physiology</li>
                                <li>• Principles of Medicine</li>
                                <li>• Basic Materia Medica</li>
                                <li>• Health & Hygiene</li>
                                <li>• Patient Communication Skills</li>
                                <li>• First Aid & Emergency Care</li>
                            </ul>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="year2">
                        <AccordionTrigger className="text-lg font-semibold">
                            Year 2: Clinical Practice & Application
                        </AccordionTrigger>
                        <AccordionContent>
                            <ul className="space-y-2 ml-4">
                                <li>• Clinical Methods & Diagnosis</li>
                                <li>• Basic Therapeutics</li>
                                <li>• OPD Management</li>
                                <li>• Patient Care & Counseling</li>
                                <li>• Clinical Internship</li>
                                <li>• Practice Management</li>
                                <li>• Professional Ethics</li>
                            </ul>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="practical">
                        <AccordionTrigger className="text-lg font-semibold">
                            Practical Training
                        </AccordionTrigger>
                        <AccordionContent>
                            <ul className="space-y-2 ml-4">
                                <li>• Hands-on clinical sessions</li>
                                <li>• Patient interaction under supervision</li>
                                <li>• OPD observation and practice</li>
                                <li>• Case study analysis</li>
                                <li>• 6-month clinical internship</li>
                                <li>• Real-world clinic management</li>
                            </ul>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </Section>

            {/* FAQs */}
            <Section>
                <SectionHeader
                    title="Frequently Asked Questions"
                    subtitle="Common questions about D.E.M.S. program"
                />
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="faq1">
                        <AccordionTrigger>Is D.E.M.S. recognized for practice?</AccordionTrigger>
                        <AccordionContent>
                            Yes, D.E.M.S. is a recognized diploma that qualifies you to practice as a certified
                            Electro-Homeopathy practitioner. Graduates can open their own clinics or work in healthcare facilities.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="faq2">
                        <AccordionTrigger>Can I pursue B.E.M.S. after D.E.M.S.?</AccordionTrigger>
                        <AccordionContent>
                            Absolutely! D.E.M.S. graduates can pursue B.E.M.S. Many institutions offer credit transfer
                            or lateral entry options for diploma holders, potentially reducing the duration of the degree program.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="faq3">
                        <AccordionTrigger>Do I need a science background?</AccordionTrigger>
                        <AccordionContent>
                            While a science background is preferred, it is not mandatory. Students from any stream
                            who have completed 10+2 can apply. We provide foundational courses to help all students succeed.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="faq4">
                        <AccordionTrigger>What is the difference between D.E.M.S. and B.E.M.S.?</AccordionTrigger>
                        <AccordionContent>
                            D.E.M.S. is a 2-year diploma with practical focus, while B.E.M.S. is a 4-year degree with
                            more comprehensive theoretical and clinical training. D.E.M.S. is ideal for faster entry into
                            practice, while B.E.M.S. provides deeper expertise and more career opportunities.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="faq5">
                        <AccordionTrigger>Are there internship opportunities?</AccordionTrigger>
                        <AccordionContent>
                            Yes! The program includes a 6-month clinical internship where you'll gain hands-on experience
                            in our affiliated hospitals and clinics under expert supervision.
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </Section>

            {/* CTA Section */}
            <Section className="bg-primary text-primary-foreground">
                <div className="text-center max-w-3xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Start Your Healthcare Career in Just 2 Years
                    </h2>
                    <p className="text-lg opacity-90 mb-8">
                        Join D.E.M.S. and fast-track your journey to becoming a certified Electro-Homeopathy practitioner.
                        Admissions for 2026 are now open!
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center">
                        <Button size="lg" variant="secondary" asChild>
                            <Link to="/apply">Apply for D.E.M.S.</Link>
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
