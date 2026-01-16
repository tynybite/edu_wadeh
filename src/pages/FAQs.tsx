import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, HelpCircle, GraduationCap, BookOpen, Wallet, Briefcase, Globe, Settings } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Section, SectionHeader } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqs, faqCategories } from "@/data/faqs";

const iconMap: Record<string, React.ElementType> = {
  HelpCircle,
  GraduationCap,
  BookOpen,
  Wallet,
  Briefcase,
  Globe,
  Settings
};

export default function FAQs() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredFaqs = faqs.filter((faq) => {
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const groupedFaqs = faqCategories.reduce((acc, category) => {
    acc[category.id] = filteredFaqs.filter(faq => faq.category === category.id);
    return acc;
  }, {} as Record<string, typeof faqs>);

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-secondary py-12 md:py-16">
        <div className="container">
          <div className="max-w-3xl">
            <Badge className="mb-4">Help Center</Badge>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-secondary-foreground mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-lg text-secondary-foreground/80 mb-6">
              Find answers to common questions about our programs, admissions, and more
            </p>
            <div className="relative max-w-lg">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search questions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-12 text-lg"
              />
            </div>
          </div>
        </div>
      </section>

      <Section>
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Categories Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-2">
              <Button
                variant={!selectedCategory ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setSelectedCategory(null)}
              >
                <HelpCircle className="mr-2 h-4 w-4" />
                All Categories
              </Button>
              {faqCategories.map((category) => {
                const Icon = iconMap[category.icon] || HelpCircle;
                const count = groupedFaqs[category.id]?.length || 0;
                return (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    <Icon className="mr-2 h-4 w-4" />
                    {category.label}
                    <Badge variant="secondary" className="ml-auto">
                      {count}
                    </Badge>
                  </Button>
                );
              })}
            </div>
          </div>

          {/* FAQs Content */}
          <div className="lg:col-span-3">
            {filteredFaqs.length > 0 ? (
              selectedCategory ? (
                <Accordion type="single" collapsible className="w-full">
                  {filteredFaqs.map((faq) => (
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
              ) : (
                <div className="space-y-8">
                  {faqCategories.map((category) => {
                    const categoryFaqs = groupedFaqs[category.id];
                    if (!categoryFaqs?.length) return null;
                    const Icon = iconMap[category.icon] || HelpCircle;
                    return (
                      <div key={category.id}>
                        <h2 className="flex items-center gap-2 text-xl font-bold mb-4">
                          <Icon className="h-5 w-5 text-primary" />
                          {category.label}
                        </h2>
                        <Accordion type="single" collapsible className="w-full">
                          {categoryFaqs.map((faq) => (
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
                      </div>
                    );
                  })}
                </div>
              )
            ) : (
              <div className="text-center py-12">
                <p className="text-lg text-muted-foreground mb-4">
                  No questions found matching your search
                </p>
                <Button variant="outline" onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory(null);
                }}>
                  Clear Search
                </Button>
              </div>
            )}
          </div>
        </div>
      </Section>

      {/* CTA */}
      <Section className="bg-muted/30">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">Still Have Questions?</h2>
          <p className="text-muted-foreground mb-6">
            Our team is here to help. Contact us for personalized assistance.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild>
              <Link to="/help">Talk to a Counselor</Link>
            </Button>
            <Button variant="outline" asChild>
              <a href="mailto:wadeh.mch@gmail.com">Email Us</a>
            </Button>
          </div>
        </div>
      </Section>
    </Layout>
  );
}
