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
    Lightbulb,
    Star
} from "lucide-react";

export default function CemsProgram() {
    return (
        <Layout>
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground py-16 md:py-24">
                <div className="container">
                    <div className="max-w-4xl mx-auto text-center">
                        <Badge className="mb-4 bg-secondary text-secondary-foreground">Entry Level • No Experience Required</Badge>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                            Certificate in Electro-Homeopathy Medicine
                        </h1>
                        <p className="text-xl md:text-2xl mb-4 opacity-90">C.E.M.S.</p>
                        <p className="text-lg mb-8 opacity-80 max-w-2xl mx-auto">
                            Begin your journey in holistic healthcare with a 6-month certificate program
                            introducing the fundamentals of Electro-Homeopathy.
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
                            <div className="text-2xl font-bold">6 Months</div>
                            <p className="text-xs text-muted-foreground">Short-term program</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Tuition Fee</CardTitle>
                            <IndianRupee className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">₹30,000</div>
                            <p className="text-xs text-muted-foreground">Total program cost</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Student Rating</CardTitle>
                            <Award className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">4.4/5.0</div>
                            <p className="text-xs text-muted-foreground">Based on 312 reviews</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Level</CardTitle>
                            <TrendingUp className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">Entry Level</div>
                            <p className="text-xs text-muted-foreground">Beginner friendly</p>
                        </CardContent>
                    </Card>
                </div>
            </Section>

            {/* Program Overview */}
            <Section className="bg-secondary">
                <SectionHeader
                    title="Program Overview"
                    subtitle="Your first step into Electro-Homeopathy"
                />
                <div className="grid gap-8 lg:grid-cols-2">
                    <div>
                        <h3 className="text-2xl font-bold mb-4">About C.E.M.S.</h3>
                        <p className="text-muted-foreground mb-4">
                            The Certificate in Electro-Homeopathy Medicine (C.E.M.S.) is a 6-month foundation program
                            perfect for individuals exploring a career in holistic healthcare. This introductory course
                            requires no prior medical knowledge or experience.
                        </p>
                        <p className="text-muted-foreground mb-4">
                            Students learn the basic principles of Electro-Homeopathy, develop health awareness skills,
                            and gain foundational knowledge that can serve as a stepping stone to diploma and degree
                            programs. It's an ideal choice for those seeking to understand alternative medicine or
                            support community health initiatives.
                        </p>
                        <div className="flex flex-wrap gap-2 mt-6">
                            <Badge variant="secondary">Short Duration</Badge>
                            <Badge variant="secondary">Entry Level</Badge>
                            <Badge variant="secondary">Health Awareness</Badge>
                            <Badge variant="secondary">Foundation Course</Badge>
                        </div>
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold mb-4">What You'll Learn</h3>
                        <ul className="space-y-3">
                            {[
                                "Introduction to Electro-Homeopathy principles",
                                "Basic human anatomy and health",
                                "Common ailments and their recognition",
                                "Basic treatment awareness",
                                "Health and wellness fundamentals",
                                "Patient interaction basics",
                                "First aid essentials",
                                "Holistic healthcare concepts"
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

            {/* Why Choose C.E.M.S. */}
            <Section>
                <SectionHeader
                    title="Why Choose C.E.M.S.?"
                    subtitle="Perfect for beginners and career explorers"
                />
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {[
                        {
                            icon: Lightbulb,
                            title: "Explore the Field",
                            description: "Perfect for those wanting to explore holistic healthcare before committing to longer programs"
                        },
                        {
                            icon: Clock,
                            title: "Short Duration",
                            description: "Complete the program in just 6 months and gain valuable knowledge"
                        },
                        {
                            icon: IndianRupee,
                            title: "Highly Affordable",
                            description: "Most cost-effective way to enter the field of alternative medicine"
                        },
                        {
                            icon: Star,
                            title: "No Prerequisites",
                            description: "No prior medical knowledge or experience required - open to all"
                        },
                        {
                            icon: GraduationCap,
                            title: "Pathway to Higher Studies",
                            description: "Gateway to D.E.M.S. and B.E.M.S. programs"
                        },
                        {
                            icon: Users,
                            title: "Community Service",
                            description: "Learn to contribute to community health and wellness programs"
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
                    subtitle="Open to everyone interested in holistic healthcare"
                />
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <BookOpen className="h-5 w-5" />
                            Admission Requirements
                        </CardTitle>
                        <CardDescription>
                            C.E.M.S. has minimal entry requirements - we welcome all who are interested!
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-3">
                                <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                                <div>
                                    <strong>Educational Qualification:</strong> 10th pass or equivalent from any recognized board
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                                <div>
                                    <strong>Interest:</strong> Genuine interest in alternative medicine and holistic healthcare
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                                <div>
                                    <strong>Experience:</strong> No prior medical knowledge or experience required
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                                <div>
                                    <strong>Age:</strong> Open to all age groups - ideal for both young students and career changers
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
                    subtitle="What you can achieve after C.E.M.S."
                />
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {[
                        {
                            title: "Foundation Knowledge",
                            description: "Gain essential understanding of Electro-Homeopathy principles"
                        },
                        {
                            title: "Health Awareness",
                            description: "Develop skills to promote wellness in your community"
                        },
                        {
                            title: "Further Education",
                            description: "Pursue D.E.M.S., B.E.M.S., or other healthcare programs"
                        },
                        {
                            title: "Community Support",
                            description: "Contribute to community health initiatives and awareness"
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
                    subtitle="What you'll learn during the 6-month program"
                />
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="module1">
                        <AccordionTrigger className="text-lg font-semibold">
                            Module 1: Introduction to Electro-Homeopathy (Months 1-2)
                        </AccordionTrigger>
                        <AccordionContent>
                            <ul className="space-y-2 ml-4">
                                <li>• History and philosophy of Electro-Homeopathy</li>
                                <li>• Basic principles and concepts</li>
                                <li>• Understanding holistic healthcare</li>
                                <li>• Introduction to remedies</li>
                                <li>• Basic medical terminology</li>
                            </ul>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="module2">
                        <AccordionTrigger className="text-lg font-semibold">
                            Module 2: Health & Wellness (Months 3-4)
                        </AccordionTrigger>
                        <AccordionContent>
                            <ul className="space-y-2 ml-4">
                                <li>• Basic human anatomy and physiology</li>
                                <li>• Common health conditions</li>
                                <li>• Health and hygiene practices</li>
                                <li>• Nutrition and wellness</li>
                                <li>• Preventive healthcare basics</li>
                            </ul>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="module3">
                        <AccordionTrigger className="text-lg font-semibold">
                            Module 3: Practical Application (Months 5-6)
                        </AccordionTrigger>
                        <AccordionContent>
                            <ul className="space-y-2 ml-4">
                                <li>• Basic treatment awareness</li>
                                <li>• First aid essentials</li>
                                <li>• Patient interaction basics</li>
                                <li>• Community health awareness</li>
                                <li>• Professional ethics and conduct</li>
                                <li>• Final assessment and certification</li>
                            </ul>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </Section>

            {/* Who Should Apply */}
            <Section>
                <SectionHeader
                    title="Who Should Apply?"
                    subtitle="C.E.M.S. is ideal for"
                />
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {[
                        {
                            title: "Career Explorers",
                            description: "Those wanting to explore holistic healthcare before committing to longer programs"
                        },
                        {
                            title: "Alternative Medicine Enthusiasts",
                            description: "Individuals passionate about natural and holistic healing methods"
                        },
                        {
                            title: "Career Changers",
                            description: "Professionals looking to transition into the healthcare field"
                        },
                        {
                            title: "Health Workers",
                            description: "Community health workers seeking to expand their knowledge"
                        },
                        {
                            title: "Family Caregivers",
                            description: "Those who want to better care for their family's health"
                        },
                        {
                            title: "Young Students",
                            description: "Recent 10th pass students exploring career options"
                        }
                    ].map((persona, index) => (
                        <Card key={index}>
                            <CardHeader>
                                <CardTitle className="text-lg">{persona.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground">{persona.description}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </Section>

            {/* FAQs */}
            <Section className="bg-secondary">
                <SectionHeader
                    title="Frequently Asked Questions"
                    subtitle="Common questions about C.E.M.S. program"
                />
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="faq1">
                        <AccordionTrigger>Can I practice after completing C.E.M.S.?</AccordionTrigger>
                        <AccordionContent>
                            C.E.M.S. provides foundational knowledge and awareness but does not qualify you as a
                            licensed practitioner. To practice professionally, you would need to pursue D.E.M.S. or B.E.M.S.
                            However, you can use your knowledge for community health awareness and personal wellness.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="faq2">
                        <AccordionTrigger>Can I pursue higher studies after C.E.M.S.?</AccordionTrigger>
                        <AccordionContent>
                            Absolutely! C.E.M.S. serves as an excellent foundation for pursuing D.E.M.S. (Diploma)
                            or B.E.M.S. (Bachelor's) programs. It helps you understand if this field is right for you
                            before committing to longer programs.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="faq3">
                        <AccordionTrigger>Is the program suitable for working professionals?</AccordionTrigger>
                        <AccordionContent>
                            Yes! The 6-month duration and flexible learning options make C.E.M.S. suitable for working
                            professionals. We offer weekend batches and flexible scheduling to accommodate your needs.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="faq4">
                        <AccordionTrigger>Will I receive a certificate after completion?</AccordionTrigger>
                        <AccordionContent>
                            Yes, upon successful completion of the program and passing the final assessment, you will
                            receive an official Certificate in Electro-Homeopathy Medicine from Wadeh Medical College.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="faq5">
                        <AccordionTrigger>What is the class schedule like?</AccordionTrigger>
                        <AccordionContent>
                            We offer flexible batches including weekday and weekend options. Classes typically run
                            2-3 hours per session, 3-4 days per week. Exact schedules are shared during admission counseling.
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </Section>

            {/* CTA Section */}
            <Section className="bg-primary text-primary-foreground">
                <div className="text-center max-w-3xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Begin Your Journey in Holistic Healthcare
                    </h2>
                    <p className="text-lg opacity-90 mb-8">
                        Explore Electro-Homeopathy with our affordable 6-month certificate program.
                        No experience needed - just bring your curiosity and passion for wellness!
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center">
                        <Button size="lg" variant="secondary" asChild>
                            <Link to="/apply">Apply for C.E.M.S.</Link>
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
