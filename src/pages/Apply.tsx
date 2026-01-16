import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { 
  ArrowRight, 
  CheckCircle2, 
  Upload, 
  GraduationCap, 
  Quote, 
  Star 
} from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { useToast } from "@/hooks/use-toast";
import { courses } from "@/data/courses";
import { branding } from "@/data/contact";
import heroBg from "@/assets/hero-bg.jpg";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().min(10, "Please enter a valid 10-digit phone number").max(10),
  course: z.string().min(1, "Please select a program"),
  consent: z.boolean().refine(val => val === true, "You must agree to be contacted")
});

type FormData = z.infer<typeof formSchema>;
type Step = "form" | "success";

// Map keys to readable labels
const FILE_FIELDS = {
  marksheet: "10th/12th Marksheet",
  aadhar: "Aadhar Card",
  signature: "Signature",
  photo: "Passport Size Photo"
} as const;

type FileKeys = keyof typeof FILE_FIELDS;

// Google Apps Script URL
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyGrmF4odxmTwvTTJv-MjUkQjOroV6GY11zL4Y2lvJoitVrPMak04sTjM9jBQyJIhmTFg/exec";

export default function Apply() {
  const [step, setStep] = useState<Step>("form");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // State for multiple files
  const [files, setFiles] = useState<Record<FileKeys, File | null>>({
    marksheet: null,
    aadhar: null,
    signature: null,
    photo: null
  });

  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      course: "",
      consent: false
    }
  });

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const result = reader.result as string;
        const base64 = result.split(',')[1];
        resolve(base64);
      };
      reader.onerror = error => reject(error);
    });
  };

  const handleFileChange = (key: FileKeys) => (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 2 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: `Please upload a ${FILE_FIELDS[key]} smaller than 2MB`,
          variant: "destructive"
        });
        e.target.value = ""; // Reset input
        return;
      }
      setFiles(prev => ({ ...prev, [key]: file }));
    } else {
      setFiles(prev => ({ ...prev, [key]: null }));
    }
  };

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    
    try {
      // Validate all files are present
      const missingFiles = (Object.keys(FILE_FIELDS) as FileKeys[]).filter(key => !files[key]);
      
      if (missingFiles.length > 0) {
        toast({
          title: "Documents Required",
          description: `Please upload: ${missingFiles.map(k => FILE_FIELDS[k]).join(", ")}`,
          variant: "destructive"
        });
        setIsSubmitting(false);
        return;
      }

      // Process all files
      const processedFiles = await Promise.all(
        (Object.entries(files) as [FileKeys, File][]).map(async ([key, file]) => ({
          fieldName: FILE_FIELDS[key],
          name: file.name,
          type: file.type,
          data: await convertToBase64(file)
        }))
      );

      const payload = {
        ...data,
        institution: "Wadeh Medical college and hospital", // Hardcoded per requirement
        files: processedFiles
      };

      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        body: JSON.stringify(payload),
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
        },
      });

      setStep("success");
      toast({
        title: "Application Submitted!",
        description: "We've received your application and documents."
      });

    } catch (error) {
      console.error("Submission error:", error);
      toast({
        title: "Submission Failed",
        description: "Please try again later or contact support.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="flex min-h-screen bg-background">
        {/* Left Side - Inspirational Content */}
        <div className="hidden lg:flex w-1/2 relative flex-col justify-between p-12 text-white">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${heroBg})` }}
          />
          <div className="absolute inset-0 bg-primary/90 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          
          <div className="relative z-10">
            <Link to="/" className="flex items-center gap-2 text-white mb-8">
              <GraduationCap className="h-8 w-8" />
              <span className="text-xl font-bold tracking-tight">Wadeh Medical</span>
            </Link>
            <h1 className="text-5xl font-bold leading-tight mb-6">
              Start Your Journey<br />to Medical Excellence
            </h1>
            <p className="text-lg text-white/80 max-w-md">
              Join a community of dedicated healthcare professionals. Apply now for the 2026 academic session.
            </p>
          </div>

          <div className="relative z-10 space-y-8">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
              <Quote className="h-8 w-8 text-accent mb-4 opacity-80" />
              <p className="text-lg italic mb-4">
                "Wadeh Medical College gave me not just a degree, but the confidence and skills to treat patients effectively. The practical exposure is potential-defining."
              </p>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-accent/20 flex items-center justify-center font-bold text-accent border border-accent/40">
                  DR
                </div>
                <div>
                  <div className="font-semibold">Dr. Rajesh Kumar</div>
                  <div className="text-sm text-white/60">Alumni, Batch of 2022</div>
                </div>
              </div>
            </div>

            <div className="flex gap-8">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Star className="h-5 w-5 text-accent" fill="currentColor" />
                  <span className="font-bold text-xl">100%</span>
                </div>
                <div className="text-sm text-white/70">Placement Assistance</div>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <CheckCircle2 className="h-5 w-5 text-accent" />
                  <span className="font-bold text-xl">UGC</span>
                </div>
                <div className="text-sm text-white/70">Entitled Programs</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-12 overflow-y-auto">
          <div className="max-w-md w-full">
            {step === "form" ? (
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-bold tracking-tight text-foreground">Application Form</h2>
                  <p className="text-muted-foreground mt-2">
                    Fill in your details to apply for the upcoming session.
                  </p>
                </div>

                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Rahul Sharma" className="h-11" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="rahul@example.com" className="h-11" {...field} />
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
                            <FormLabel>Mobile Number</FormLabel>
                            <FormControl>
                              <Input 
                                type="tel" 
                                placeholder="9876543210" 
                                className="h-11" 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="course"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Program Applied For</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="h-11">
                                <SelectValue placeholder="Select a program" />
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

                    {/* File Uploads Section */}
                    <div className="space-y-4 p-5 rounded-xl bg-muted/40 border border-border/60">
                      <h3 className="font-semibold flex items-center gap-2 text-foreground/80">
                        <Upload className="h-4 w-4" />
                        Mandatory Documents
                      </h3>
                      
                      {(Object.keys(FILE_FIELDS) as FileKeys[]).map((key) => (
                        <div key={key} className="space-y-2">
                          <FormLabel className="text-xs font-medium uppercase text-muted-foreground">
                            {FILE_FIELDS[key]} <span className="text-destructive">*</span>
                          </FormLabel>
                          <Input 
                            type="file" 
                            accept={key === 'photo' ? "image/*" : ".pdf,.jpg,.jpeg,.png"}
                            onChange={handleFileChange(key)}
                            className="bg-background h-10 text-sm"
                          />
                        </div>
                      ))}
                      <p className="text-[10px] text-muted-foreground text-center pt-2">
                        Max file size: 2MB per document. Supported: PDF, JPG, PNG.
                      </p>
                    </div>

                    <FormField
                      control={form.control}
                      name="consent"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 py-2">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel className="text-sm font-normal text-muted-foreground">
                              I hereby confirm that the information provided is true and I agree to be contacted for admission purposes.
                            </FormLabel>
                            <FormMessage />
                          </div>
                        </FormItem>
                      )}
                    />

                    <Button type="submit" className="w-full h-12 text-lg shadow-lg hover:shadow-xl transition-all" disabled={isSubmitting}>
                      {isSubmitting ? "Submitting Application..." : "Submit Application"}
                      {!isSubmitting && <ArrowRight className="ml-2 h-4 w-4" />}
                    </Button>
                  </form>
                </Form>
              </div>
            ) : (
              <div className="text-center space-y-6 animate-in fade-in zoom-in duration-300">
                <div className="mx-auto h-24 w-24 bg-primary/10 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="h-12 w-12 text-primary" />
                </div>
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold">Application Received!</h2>
                  <p className="text-muted-foreground max-w-xs mx-auto">
                    Thank you for applying to {branding.shortName}. Our admissions team has witnessed your potential and will contact you within 24-48 hours.
                  </p>
                </div>
                <div className="space-y-3 pt-4">
                  <Button asChild className="w-full h-11" variant="outline">
                    <Link to="/">Return to Home</Link>
                  </Button>
                  <Button asChild className="w-full h-11">
                    <Link to="/courses">Explore More Programs</Link>
                  </Button>
                </div>
              </div>
            )}
            
            <div className="mt-8 text-center text-sm text-muted-foreground">
              <p>© {new Date().getFullYear()} {branding.name}. All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
