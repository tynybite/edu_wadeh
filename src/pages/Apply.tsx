import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowRight, CheckCircle, ArrowLeft } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
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
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useToast } from "@/hooks/use-toast";
import { courses } from "@/data/courses";
import { branding } from "@/data/contact";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().min(10, "Please enter a valid 10-digit phone number").max(10),
  course: z.string().min(1, "Please select a program"),
  institution: z.string().min(1, "Please select an institution"),
  consent: z.boolean().refine(val => val === true, "You must agree to be contacted")
});

type FormData = z.infer<typeof formSchema>;

type Step = "form" | "otp" | "success";

export default function Apply() {
  const [step, setStep] = useState<Step>("form");
  const [otp, setOtp] = useState("");
  const [countdown, setCountdown] = useState(30);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData | null>(null);
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      course: "",
      institution: "",
      consent: false
    }
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setFormData(data);
    setStep("otp");
    setIsSubmitting(false);
    startCountdown();
  };

  const startCountdown = () => {
    setCountdown(30);
    const interval = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const verifyOtp = async () => {
    if (otp.length !== 4) return;
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setStep("success");
    setIsSubmitting(false);
    toast({
      title: "Application Submitted!",
      description: "We'll contact you shortly with next steps."
    });
  };

  const resendOtp = () => {
    startCountdown();
    toast({
      title: "OTP Resent",
      description: "A new OTP has been sent to your email."
    });
  };

  return (
    <Layout>
      <Section className="min-h-[80vh] flex items-center">
        <div className="max-w-lg mx-auto w-full">
          {step === "form" && (
            <Card>
              <CardHeader className="text-center">
                <Badge className="mx-auto mb-4">Admissions Open</Badge>
                <CardTitle className="text-2xl">Apply to {branding.shortName}</CardTitle>
                <CardDescription>
                  Fill in your details to start your application
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name *</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your full name" {...field} />
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
                          <FormLabel>Email Address *</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="Enter your email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Mobile Number *</FormLabel>
                          <FormControl>
                            <div className="flex">
                              <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-muted text-muted-foreground text-sm">
                                +91
                              </span>
                              <Input 
                                type="tel" 
                                placeholder="10-digit mobile number" 
                                className="rounded-l-none"
                                maxLength={10}
                                {...field} 
                              />
                            </div>
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
                          <FormLabel>Select Program *</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Choose a program" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {courses.map((course) => (
                                <SelectItem key={course.id} value={course.id}>
                                  {course.shortTitle} - {course.title}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="institution"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Select Institution *</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Choose institution" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="college">Wadeh Medical College</SelectItem>
                              <SelectItem value="hospital">Wadeh Hospital</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="consent"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel className="text-sm font-normal">
                              I agree to be contacted via phone, email, and SMS about my application. (DNC/NDNC regulations apply)
                            </FormLabel>
                            <FormMessage />
                          </div>
                        </FormItem>
                      )}
                    />

                    <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                      {isSubmitting ? "Submitting..." : "Continue"}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          )}

          {step === "otp" && formData && (
            <Card>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Verify Your Email</CardTitle>
                <CardDescription>
                  We've sent a 4-digit OTP to {formData.email}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex justify-center">
                  <InputOTP
                    maxLength={4}
                    value={otp}
                    onChange={setOtp}
                  >
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                    </InputOTPGroup>
                  </InputOTP>
                </div>

                <div className="text-center text-sm text-muted-foreground">
                  {countdown > 0 ? (
                    <span>Resend OTP in {countdown}s</span>
                  ) : (
                    <Button variant="link" onClick={resendOtp} className="p-0 h-auto">
                      Resend OTP
                    </Button>
                  )}
                </div>

                <div className="space-y-3">
                  <Button 
                    className="w-full" 
                    size="lg" 
                    onClick={verifyOtp}
                    disabled={otp.length !== 4 || isSubmitting}
                  >
                    {isSubmitting ? "Verifying..." : "Verify & Submit"}
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="w-full"
                    onClick={() => setStep("form")}
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Edit Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {step === "success" && (
            <Card className="text-center">
              <CardContent className="pt-8 pb-8 space-y-6">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mx-auto">
                  <CheckCircle className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-2">Application Submitted!</h2>
                  <p className="text-muted-foreground">
                    Thank you for applying to {branding.shortName}. Our admissions team will contact you within 24-48 hours.
                  </p>
                </div>
                <div className="space-y-3">
                  <Button asChild className="w-full">
                    <Link to="/">Return to Homepage</Link>
                  </Button>
                  <Button variant="outline" asChild className="w-full">
                    <Link to="/courses">Explore More Programs</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </Section>
    </Layout>
  );
}
