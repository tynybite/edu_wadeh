import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Clock, MessageSquare } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Layout } from "@/components/layout/Layout";
import { Section, SectionHeader } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { contactInfo } from "@/data/contact";
import { courses } from "@/data/courses";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().min(10, "Please enter a valid phone number").max(15),
  course: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters").max(1000)
});

type FormData = z.infer<typeof formSchema>;

const WHATSAPP_NUMBER = "919564400943";

export default function Help() {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      course: "",
      message: ""
    }
  });

  const onSubmit = (data: FormData) => {
    const courseName = courses.find(c => c.id === data.course)?.shortTitle || data.course || "Not specified";
    const message = `Hi, I'm interested in WMCH programs.

*Name:* ${data.name}
*Email:* ${data.email}
*Phone:* ${data.phone}
*Interested Program:* ${courseName}
*Message:* ${data.message}`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`, "_blank");
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-secondary py-12 md:py-16">
        <div className="container">
          <div className="max-w-3xl">
            <Badge className="mb-4">Help Center</Badge>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-secondary-foreground mb-4">
              We're Here to Help
            </h1>
            <p className="text-lg text-secondary-foreground/80">
              Have questions? Our dedicated counselors are ready to assist you on your educational journey.
            </p>
          </div>
        </div>
      </section>

      <Section>
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="h-5 w-5 text-primary" />
                  Call Us
                </CardTitle>
              </CardHeader>
              <CardContent>
                <a href={`tel:${contactInfo.phone}`} className="text-lg font-medium hover:text-primary transition-colors">
                  +91 {contactInfo.phone}
                </a>
                <p className="text-sm text-muted-foreground mt-1">
                  {contactInfo.workingHours.weekdays}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5 text-primary" />
                  Email Us
                </CardTitle>
              </CardHeader>
              <CardContent>
                <a href={`mailto:${contactInfo.email}`} className="text-lg font-medium hover:text-primary transition-colors break-all">
                  {contactInfo.email}
                </a>
                <p className="text-sm text-muted-foreground mt-1">
                  We respond within 24 hours
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  Visit Us
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-medium">{contactInfo.address.line1}</p>
                <p className="text-muted-foreground">
                  {contactInfo.address.city}, {contactInfo.address.district}
                </p>
                <p className="text-muted-foreground">
                  {contactInfo.address.state} - {contactInfo.address.pincode}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  Working Hours
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-1">
                <div className="flex justify-between">
                  <span>Monday - Friday</span>
                  <span className="font-medium">{contactInfo.workingHours.weekdays}</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday</span>
                  <span className="font-medium">{contactInfo.workingHours.saturday}</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span className="font-medium">{contactInfo.workingHours.sunday}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-primary" />
                  Request a Callback
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name *</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter your name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email *</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="Enter your email" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number *</FormLabel>
                            <FormControl>
                              <Input type="tel" placeholder="Enter your phone number" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="course"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Interested Program</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select a program" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {courses.map((course) => (
                                  <SelectItem key={course.id} value={course.id}>
                                    {course.shortTitle}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Your Message *</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="How can we help you?"
                              className="min-h-[120px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button type="submit" size="lg" className="bg-[#25D366] hover:bg-[#20BA5C]">
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Continue in WhatsApp
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </div>
      </Section>

      {/* Quick Links */}
      <Section className="bg-muted/30">
        <SectionHeader
          title="Quick Links"
          description="Find what you're looking for"
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "View All Programs", href: "/courses" },
            { label: "FAQs", href: "/faqs" },
            { label: "Placements", href: "/placements" },
            { label: "Stipend Program", href: "/stipend" }
          ].map((link) => (
            <Button key={link.label} variant="outline" asChild className="h-auto py-4">
              <Link to={link.href}>{link.label}</Link>
            </Button>
          ))}
        </div>
      </Section>
    </Layout>
  );
}
