import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowRight,
  ArrowLeft,
  CheckCircle2, 
  Upload, 
  GraduationCap, 
  Quote, 
  Star,
  User,
  Mail,
  Phone,
  FileText,
  CreditCard,
  Shield,
  Sparkles,
  Check
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
import {
  Reveal,
  Stagger,
  StaggerItem,
  MorphingBlob,
  GradientText,
  MagneticButton,
  Floating,
} from "@/hooks/useAnimations";
import { supabase } from "@/lib/supabase";
import { useApplicationForm } from "@/hooks/useApplicationForm";

declare global {
  interface Window {
    Razorpay: any;
  }
}

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().min(10, "Please enter a valid 10-digit phone number").max(10),
  course: z.string().min(1, "Please select a program"),
  consent: z.boolean().refine(val => val === true, "You must agree to be contacted")
});

type FormData = z.infer<typeof formSchema>;
type Step = 1 | 2 | 3 | 4;

const FILE_FIELDS = {
  marksheet: "10th/12th Marksheet",
  aadhar: "Aadhar Card",
  signature: "Signature",
  photo: "Passport Size Photo"
} as const;

type FileKeys = keyof typeof FILE_FIELDS;

const GOOGLE_SCRIPT_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL;
const RAZORPAY_KEY = import.meta.env.VITE_RAZORPAY_KEY;
const APPLICATION_FEE = Number(import.meta.env.VITE_APPLICATION_FEE) || 500;

const steps = [
  { number: 1, title: "Personal Info", icon: User },
  { number: 2, title: "Documents", icon: FileText },
  { number: 3, title: "Payment", icon: CreditCard },
  { number: 4, title: "Complete", icon: CheckCircle2 },
];



// ... imports

export default function Apply() {
  const { applicationId, saveProgress, updateStatus } = useApplicationForm();
  
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentComplete, setPaymentComplete] = useState(false);
  const [paymentId, setPaymentId] = useState<string>("");
  
  const [files, setFiles] = useState<Record<FileKeys, File | null>>({
    marksheet: null,
    aadhar: null,
    signature: null,
    photo: null
  });

  const [applicationFee, setApplicationFee] = useState<number>(500);
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [couponError, setCouponError] = useState("");
  const [couponSuccess, setCouponSuccess] = useState("");

  const finalFee = Math.max(0, applicationFee - discount);

  // Fetch dynamic fee
  useEffect(() => {
    const fetchFee = async () => {
      const { data } = await supabase
        .from('app_settings')
        .select('value')
        .eq('key', 'application_fee')
        .single();
      
      if (data?.value) {
        setApplicationFee(Number(data.value));
      }
    };
    fetchFee();
  }, []);

  const [availableCoupons, setAvailableCoupons] = useState<any[]>([]);

  // Fetch active coupons
  useEffect(() => {
    const fetchCoupons = async () => {
      const { data } = await supabase
        .from('coupons')
        .select('*')
        .eq('active', true);
      
      if (data) {
        setAvailableCoupons(data);
      }
    };
    fetchCoupons();
  }, []);

  const applyCouponCode = (code: string) => {
    setCouponCode(code);
    applyCoupon(code);
  };
   
  // Modified applyCoupon to accept an optional code argument
  const applyCoupon = async (codeOverride?: string) => {
    const codeToApply = typeof codeOverride === 'string' ? codeOverride : couponCode;
    
    setCouponError("");
    setCouponSuccess("");
    setDiscount(0);

    if (!codeToApply) return;


    try {
      const { data, error } = await supabase
        .from('coupons')
        .select('*')
        .eq('code', codeToApply.toUpperCase())
        .eq('active', true)
        .single();

      if (error || !data) {
        setCouponError("Invalid or expired coupon code");
        return;
      }

      let discountAmount = 0;
      if (data.discount_type === 'percentage') {
        discountAmount = (applicationFee * data.discount_value) / 100;
      } else {
        discountAmount = data.discount_value;
      }

      setDiscount(discountAmount);
      setCouponSuccess(`Coupon applied! You saved ₹${discountAmount}`);
      toast({
        title: "Coupon Applied",
        description: `You saved ₹${discountAmount}`,
      });
      
      // Update the input field if applied via click
      if (codeOverride) {
          setCouponCode(codeOverride);
      }

    } catch (error) {
      setCouponError("Failed to apply coupon");
    }
  };

  const { toast } = useToast();

  // Load Razorpay script
  const [isRazorpayLoaded, setIsRazorpayLoaded] = useState(false);
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => setIsRazorpayLoaded(true);
    script.onerror = () => {
      toast({
        title: "Error",
        description: "Failed to load payment system. Please verify your connection.",
        variant: "destructive"
      });
    };
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, [toast]);

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

  // Auto-save form data
  useEffect(() => {
    const subscription = form.watch((value) => {
      const timeoutId = setTimeout(() => {
        if (applicationId) {
          saveProgress(currentStep, value);
        }
      }, 1000);
      return () => clearTimeout(timeoutId);
    });
    return () => subscription.unsubscribe();
  }, [form.watch, currentStep, applicationId, saveProgress]);

  // Save current step whenever it changes
  useEffect(() => {
    if (applicationId) {
      saveProgress(currentStep, form.getValues());
    }
  }, [currentStep, applicationId, saveProgress, form]);

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
        e.target.value = "";
        return;
      }
      setFiles(prev => ({ ...prev, [key]: file }));
    } else {
      setFiles(prev => ({ ...prev, [key]: null }));
    }
  };

  const validateStep1 = async () => {
    const result = await form.trigger(["name", "email", "phone", "course", "consent"]);
    if (result) {
      setCurrentStep(2);
    }
  };

  const validateStep2 = () => {
    const missingFiles = (Object.keys(FILE_FIELDS) as FileKeys[]).filter(key => !files[key]);
    if (missingFiles.length > 0) {
      toast({
        title: "Documents Required",
        description: `Please upload: ${missingFiles.map(k => FILE_FIELDS[k]).join(", ")}`,
        variant: "destructive"
      });
      return;
    }
    setCurrentStep(3);
  };

      // ... existing code ...

  const handlePayment = () => {
    const formData = form.getValues();
    
    if (!RAZORPAY_KEY) {
      toast({
        title: "Configuration Error",
        description: "Payment gateway is not configured (Missing Key). Please contact support.",
        variant: "destructive"
      });
      return;
    }

    if (!isRazorpayLoaded || !window.Razorpay) {
      toast({
        title: "Loading",
        description: "Payment system is initializing. Please try again in a moment.",
        variant: "default"
      });
      return;
    }

    try {
      const options = {
        key: RAZORPAY_KEY,
        amount: finalFee * 100, // Razorpay expects paise
        currency: "INR",
        name: branding.name,
        description: "Application Fee",
        image: "/logo.png",
        handler: function (response: any) {
          setPaymentId(response.razorpay_payment_id);
          setPaymentComplete(true);
          submitApplication(response.razorpay_payment_id);
        },
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone,
        },
        theme: {
          color: "#059669", // Emerald-600 to match theme
        },
        modal: {
          ondismiss: function() {
            toast({
              title: "Payment Cancelled",
              description: "Your application has not been submitted. Please complete payment to proceed.",
              variant: "destructive"
            });
          }
        }
      };

      const razorpay = new window.Razorpay(options);
      razorpay.on("payment.failed", function (response: any) {
        toast({
          title: "Payment Failed",
          description: response.error.description || "Transaction failed",
          variant: "destructive"
        });
      });
      razorpay.open();
    } catch (error) {
      console.error("Payment initialization error:", error);
      toast({
        title: "Error",
        description: "Could not initialize payment. Please disable ad-blockers and try again.",
        variant: "destructive"
      });
    }
  };

  const submitApplication = async (paymentId: string) => {
    setIsSubmitting(true);
    const data = form.getValues();
    
    try {
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
        institution: "Wadeh Medical college and hospital",
        paymentId: paymentId,
        applicationFee: finalFee,
        files: processedFiles
      };

      await updateStatus('submitted');

      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        body: JSON.stringify(payload),
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Insert into Supabase (Leads)
      const { data: leadData, error: leadError } = await supabase
        .from('leads')
        .insert([{
          name: data.name,
          email: data.email,
          phone: data.phone,
          program: data.course,
          status: 'new'
        }])
        .select()
        .single();
      
      if (leadError) console.error("Supabase Lead Error:", leadError);

      // Insert into Supabase (Payments)
      if (leadData && paymentId) {
          const { error: paymentError } = await supabase
            .from('payments')
            .insert([{
                lead_id: leadData.id,
                amount: finalFee,
                status: 'success',
                transaction_id: paymentId,
                payment_method: 'razorpay'
            }]);
          if (paymentError) console.error("Supabase Payment Error:", paymentError);
      }

      setCurrentStep(4);
      toast({
        title: "Application Submitted!",
        description: "We've received your application and payment."
      });

    } catch (error) {
      console.error("Submission error:", error);
      toast({
        title: "Submission Failed",
        description: "Payment successful but submission failed. Please contact support with Payment ID: " + paymentId,
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
    }),
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/30 relative overflow-hidden">
        {/* Background Blobs */}
        <MorphingBlob 
          className="w-[600px] h-[600px] -top-[200px] -right-[200px] opacity-30"
          color="hsl(38 90% 55% / 0.15)"
        />
        <MorphingBlob 
          className="w-[500px] h-[500px] -bottom-[150px] -left-[150px] opacity-25"
          color="hsl(155 45% 30% / 0.15)"
        />

        {/* Grain */}
        <div className="absolute inset-0 grain pointer-events-none opacity-50" />

        <div className="container relative z-10 py-12 md:py-20">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <Reveal>
              <div className="text-center mb-12">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", duration: 0.6 }}
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-secondary/10 border border-secondary/20 mb-6"
                >
                  <Sparkles className="h-4 w-4 text-secondary" />
                  <span className="text-sm font-semibold text-secondary">Admissions Open 2026</span>
                </motion.div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-black text-foreground mb-4">
                  Start Your <GradientText>Journey</GradientText>
                </h1>
                <p className="text-lg text-muted-foreground max-w-xl mx-auto">
                  Complete your application in a few simple steps. Application fee: ₹{applicationFee}
                </p>
              </div>
            </Reveal>

            {/* Progress Steps */}
            <Reveal delay={0.1}>
              <div className="mb-12">
                <div className="flex items-center justify-between max-w-2xl mx-auto">
                  {steps.map((step, index) => (
                    <div key={step.number} className="flex items-center">
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex flex-col items-center"
                      >
                        <motion.div
                          animate={{
                            scale: currentStep === step.number ? 1.1 : 1,
                            backgroundColor: currentStep >= step.number 
                              ? "hsl(var(--secondary))" 
                              : "hsl(var(--muted))"
                          }}
                          className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-colors ${
                            currentStep >= step.number 
                              ? "text-secondary-foreground shadow-lg shadow-secondary/30" 
                              : "text-muted-foreground"
                          }`}
                        >
                          {currentStep > step.number ? (
                            <Check className="h-5 w-5" />
                          ) : (
                            <step.icon className="h-5 w-5" />
                          )}
                        </motion.div>
                        <span className={`text-xs font-medium hidden sm:block ${
                          currentStep >= step.number ? "text-secondary" : "text-muted-foreground"
                        }`}>
                          {step.title}
                        </span>
                      </motion.div>
                      
                      {index < steps.length - 1 && (
                        <motion.div 
                          className="w-16 md:w-24 h-1 mx-2 rounded-full bg-muted overflow-hidden"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.3 + index * 0.1 }}
                        >
                          <motion.div
                            animate={{ 
                              width: currentStep > step.number ? "100%" : "0%" 
                            }}
                            transition={{ duration: 0.5 }}
                            className="h-full bg-secondary rounded-full"
                          />
                        </motion.div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* Form Card */}
            <motion.div
              layout
              className="bg-card/80 backdrop-blur-xl rounded-3xl border border-border/50 shadow-2xl overflow-hidden"
            >
              <AnimatePresence mode="wait" custom={currentStep}>
                {/* Step 1: Personal Information */}
                {currentStep === 1 && (
                  <motion.div
                    key="step1"
                    custom={1}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                    className="p-8 md:p-12"
                  >
                    <div className="flex items-center gap-3 mb-8">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                        <User className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-display font-bold text-foreground">Personal Information</h2>
                        <p className="text-muted-foreground">Tell us about yourself</p>
                      </div>
                    </div>

                    <Form {...form}>
                      <form className="space-y-6">
                        <Stagger stagger={0.05} className="space-y-6">
                          <StaggerItem>
                            <FormField
                              control={form.control}
                              name="name"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-foreground font-semibold">Full Name</FormLabel>
                                  <FormControl>
                                    <div className="relative">
                                      <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                      <Input 
                                        placeholder="Enter your full name" 
                                        className="h-14 pl-12 text-lg rounded-xl border-2 focus:border-secondary transition-colors" 
                                        {...field} 
                                      />
                                    </div>
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </StaggerItem>

                          <StaggerItem>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel className="text-foreground font-semibold">Email Address</FormLabel>
                                    <FormControl>
                                      <div className="relative">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                        <Input 
                                          type="email" 
                                          placeholder="your@email.com" 
                                          className="h-14 pl-12 text-lg rounded-xl border-2 focus:border-secondary transition-colors" 
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
                                name="phone"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel className="text-foreground font-semibold">Phone Number</FormLabel>
                                    <FormControl>
                                      <div className="relative">
                                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                        <Input 
                                          type="tel" 
                                          placeholder="9876543210" 
                                          className="h-14 pl-12 text-lg rounded-xl border-2 focus:border-secondary transition-colors" 
                                          {...field} 
                                        />
                                      </div>
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
                          </StaggerItem>

                          <StaggerItem>
                            <FormField
                              control={form.control}
                              name="course"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-foreground font-semibold">Program Applied For</FormLabel>
                                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                      <SelectTrigger className="h-14 text-lg rounded-xl border-2">
                                        <div className="flex items-center gap-3">
                                          <GraduationCap className="h-5 w-5 text-muted-foreground" />
                                          <SelectValue placeholder="Select a program" />
                                        </div>
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      {courses.map((course) => (
                                        <SelectItem 
                                          key={course.id} 
                                          value={course.id}
                                          className="py-3"
                                        >
                                          <span className="font-semibold">{course.shortTitle}</span>
                                          <span className="text-muted-foreground ml-2">- {course.title}</span>
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </StaggerItem>

                          <StaggerItem>
                            <FormField
                              control={form.control}
                              name="consent"
                              render={({ field }) => (
                                <FormItem className="flex flex-row items-start space-x-4 space-y-0 p-5 rounded-xl bg-muted/50 border border-border/50">
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value}
                                      onCheckedChange={field.onChange}
                                      className="mt-1"
                                    />
                                  </FormControl>
                                  <div className="space-y-1 leading-none">
                                    <FormLabel className="text-sm text-muted-foreground leading-relaxed">
                                      I confirm that the information provided is accurate and I agree to be contacted for admission purposes. I understand that the application fee of ₹{finalFee} is non-refundable.
                                    </FormLabel>
                                    <FormMessage />
                                  </div>
                                </FormItem>
                              )}
                            />
                          </StaggerItem>
                        </Stagger>

                        <div className="pt-6">
                          <MagneticButton className="w-full">
                            <Button 
                              type="button" 
                              onClick={validateStep1}
                              className="w-full h-14 text-lg font-semibold rounded-xl bg-primary hover:bg-primary/90 shadow-lg"
                            >
                              Continue to Documents
                              <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                          </MagneticButton>
                        </div>
                      </form>
                    </Form>
                  </motion.div>
                )}

                {/* Step 2: Documents */}
                {currentStep === 2 && (
                  <motion.div
                    key="step2"
                    custom={1}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                    className="p-8 md:p-12"
                  >
                    <div className="flex items-center gap-3 mb-8">
                      <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center">
                        <FileText className="h-6 w-6 text-secondary" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-display font-bold text-foreground">Upload Documents</h2>
                        <p className="text-muted-foreground">Required documents for your application</p>
                      </div>
                    </div>

                    <Stagger stagger={0.08} className="space-y-5">
                      {(Object.keys(FILE_FIELDS) as FileKeys[]).map((key) => (
                        <StaggerItem key={key}>
                          <motion.div 
                            whileHover={{ scale: 1.01 }}
                            className={`p-5 rounded-2xl border-2 transition-all ${
                              files[key] 
                                ? "border-secondary bg-secondary/5" 
                                : "border-border hover:border-secondary/50 bg-muted/30"
                            }`}
                          >
                            <div className="flex items-center justify-between mb-3">
                              <label className="text-sm font-semibold text-foreground flex items-center gap-2">
                                {files[key] ? (
                                  <CheckCircle2 className="h-4 w-4 text-secondary" />
                                ) : (
                                  <Upload className="h-4 w-4 text-muted-foreground" />
                                )}
                                {FILE_FIELDS[key]}
                                <span className="text-destructive">*</span>
                              </label>
                              {files[key] && (
                                <span className="text-xs text-secondary font-medium">
                                  {files[key]?.name}
                                </span>
                              )}
                            </div>
                            <Input 
                              type="file" 
                              accept={key === 'photo' ? "image/*" : ".pdf,.jpg,.jpeg,.png"}
                              onChange={handleFileChange(key)}
                              className="h-12 rounded-xl border-dashed cursor-pointer"
                            />
                          </motion.div>
                        </StaggerItem>
                      ))}
                    </Stagger>

                    <p className="text-xs text-muted-foreground text-center mt-6">
                      Max file size: 2MB per document. Supported formats: PDF, JPG, PNG
                    </p>

                    <div className="flex gap-4 pt-8">
                      <Button 
                        type="button" 
                        variant="outline"
                        onClick={() => setCurrentStep(1)}
                        className="h-14 px-8 text-lg font-semibold rounded-xl"
                      >
                        <ArrowLeft className="mr-2 h-5 w-5" />
                        Back
                      </Button>
                      <MagneticButton className="flex-1">
                        <Button 
                          type="button" 
                          onClick={validateStep2}
                          className="w-full h-14 text-lg font-semibold rounded-xl bg-secondary hover:bg-secondary/90 shadow-lg"
                        >
                          Continue to Payment
                          <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                      </MagneticButton>
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Payment */}
                {currentStep === 3 && (
                  <motion.div
                    key="step3"
                    custom={1}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                    className="p-8 md:p-12"
                  >
                    <div className="flex items-center gap-3 mb-8">
                      <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                        <CreditCard className="h-6 w-6 text-accent" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-display font-bold text-foreground">Application Fee</h2>
                        <p className="text-muted-foreground">Complete payment to submit application</p>
                      </div>
                    </div>

                      <div className="space-y-6">
                        {/* Payment Summary */}
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 rounded-2xl p-8 border border-border/50"
                        >
                          <div className="text-center mb-6">
                            <div className="text-5xl font-display font-black text-foreground mb-2">
                              ₹{finalFee}
                            </div>
                            <p className="text-muted-foreground">
                              {discount > 0 ? (
                                <span className="line-through text-red-400 mr-2">₹{applicationFee}</span>
                              ) : "One-time Application Fee"}
                            </p>
                          </div>

                          {/* Coupon Section */}
                          <div className="bg-white/50 p-4 rounded-xl border border-neutral-200 mb-6">
                            <label className="text-sm font-medium text-neutral-700 mb-2 block text-left">Have a coupon code?</label>
                            <div className="flex gap-2 mb-4">
                              <Input 
                                placeholder="ENTER CODE"
                                value={couponCode}
                                onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                                className="uppercase font-mono"
                              />
                              <Button type="button" onClick={() => applyCoupon()} variant="secondary">Apply</Button>
                            </div>

                            {/* Available Coupons List */}
                            <AnimatePresence>
                              {availableCoupons.length > 0 && (
                                <div className="space-y-2">
                                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Available Offers</p>
                                  {availableCoupons.map((coupon) => (
                                    <motion.div
                                      key={coupon.id}
                                      initial={{ opacity: 0, height: 0 }}
                                      animate={{ opacity: 1, height: "auto" }}
                                      exit={{ opacity: 0, height: 0 }}
                                      className="flex items-center justify-between p-3 rounded-lg border border-dashed border-secondary/30 bg-secondary/5 hover:bg-secondary/10 transition-colors group"
                                    >
                                      <div className="flex flex-col text-left">
                                        <span className="font-mono font-bold text-secondary">{coupon.code}</span>
                                        <span className="text-xs text-muted-foreground">
                                          {coupon.discount_type === 'percentage' 
                                            ? `${coupon.discount_value}% OFF` 
                                            : `₹${coupon.discount_value} OFF`}
                                        </span>
                                      </div>
                                      <Button 
                                        size="sm" 
                                        variant="ghost" 
                                        className="h-8 text-secondary hover:text-secondary-foreground hover:bg-secondary/20"
                                        onClick={() => applyCouponCode(coupon.code)}
                                      >
                                        Apply
                                      </Button>
                                    </motion.div>
                                  ))}
                                </div>
                              )}
                            </AnimatePresence>

                            {couponError && <p className="text-red-500 text-xs mt-2 text-left">{couponError}</p>}
                            {couponSuccess && <p className="text-green-600 text-xs mt-2 text-left">{couponSuccess}</p>}
                          </div>

                          <div className="space-y-3 text-sm">
                            <div className="flex justify-between text-neutral-600 border-b pb-2">
                              <span>Base Fee</span>
                              <span>₹{applicationFee}</span>
                            </div>
                            {discount > 0 && (
                              <div className="flex justify-between text-green-600 border-b pb-2">
                                <span>Discount</span>
                                <span>- ₹{discount}</span>
                              </div>
                            )}
                            <div className="flex justify-between font-bold text-neutral-900 pt-2">
                                <span>Total Payable</span>
                                <span>₹{finalFee}</span>
                            </div>
                            
                            <div className="pt-4 space-y-2">
                                <div className="flex items-center gap-3 text-muted-foreground">
                                    <Check className="h-4 w-4 text-secondary" />
                                    <span>Application processing & verification</span>
                                </div>
                                <div className="flex items-center gap-3 text-muted-foreground">
                                    <Check className="h-4 w-4 text-secondary" />
                                    <span>Document review by admissions team</span>
                                </div>
                                <div className="flex items-center gap-3 text-muted-foreground">
                                    <Check className="h-4 w-4 text-secondary" />
                                    <span>Priority interview scheduling</span>
                                </div>
                            </div>
                          </div>
                        </motion.div>

                        {/* Security Badge */}
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.2 }}
                          className="flex items-center justify-center gap-2 text-sm text-muted-foreground"
                        >
                          <Shield className="h-4 w-4 text-secondary" />
                          <span>Secured by Razorpay • 100% Safe Payment</span>
                        </motion.div>

                        {/* Applicant Summary */}
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.3 }}
                          className="bg-muted/50 rounded-xl p-5 space-y-2"
                        >
                          <h4 className="font-semibold text-sm text-foreground mb-3">Application Summary</h4>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Name:</span>
                            <span className="font-medium text-foreground">{form.getValues("name")}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Email:</span>
                            <span className="font-medium text-foreground">{form.getValues("email")}</span>
                          </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Program:</span>
                          <span className="font-medium text-foreground">
                            {courses.find(c => c.id === form.getValues("course"))?.shortTitle}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Documents:</span>
                          <span className="font-medium text-secondary">4 Uploaded</span>
                        </div>
                      </motion.div>
                    </div>

                    <div className="flex gap-4 pt-8">
                      <Button 
                        type="button" 
                        variant="outline"
                        onClick={() => setCurrentStep(2)}
                        className="h-14 px-8 text-lg font-semibold rounded-xl"
                      >
                        <ArrowLeft className="mr-2 h-5 w-5" />
                        Back
                      </Button>
                      <MagneticButton className="flex-1">
                        <Button 
                          type="button" 
                          onClick={handlePayment}
                          disabled={isSubmitting}
                          className="w-full h-14 text-lg font-semibold rounded-xl bg-accent hover:bg-accent/90 shadow-lg shadow-accent/30"
                        >
                          {isSubmitting ? (
                            "Processing..."
                          ) : (
                            <>
                              Pay ₹{finalFee} & Submit
                              <ArrowRight className="ml-2 h-5 w-5" />
                            </>
                          )}
                        </Button>
                      </MagneticButton>
                    </div>
                  </motion.div>
                )}

                {/* Step 4: Success */}
                {currentStep === 4 && (
                  <motion.div
                    key="step4"
                    custom={1}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                    className="p-8 md:p-16 text-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", duration: 0.6 }}
                      className="w-24 h-24 mx-auto mb-8 rounded-full bg-gradient-to-br from-secondary to-accent flex items-center justify-center shadow-2xl shadow-secondary/30"
                    >
                      <CheckCircle2 className="h-12 w-12 text-white" />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="space-y-4 mb-8"
                    >
                      <h2 className="text-3xl md:text-4xl font-display font-black text-foreground">
                        Application Submitted!
                      </h2>
                      <p className="text-lg text-muted-foreground max-w-md mx-auto">
                        Thank you for applying to {branding.shortName}. Our admissions team will contact you within 24-48 hours.
                      </p>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                      className="bg-muted/50 rounded-xl p-5 max-w-sm mx-auto mb-8"
                    >
                      <div className="text-sm text-muted-foreground mb-2">Payment ID</div>
                      <div className="font-mono font-semibold text-foreground">{paymentId}</div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      className="flex flex-col sm:flex-row gap-4 justify-center"
                    >
                      <Button asChild variant="outline" className="h-12 px-8 rounded-xl">
                        <Link to="/">Return to Home</Link>
                      </Button>
                      <Button asChild className="h-12 px-8 rounded-xl">
                        <Link to="/courses">Explore Programs</Link>
                      </Button>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Trust Section */}
            <Reveal delay={0.3}>
              <div className="mt-12 text-center">
                <div className="flex items-center justify-center gap-8 text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-secondary" />
                    <span className="text-sm font-medium">Secure Payment</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="h-5 w-5 text-secondary fill-secondary" />
                    <span className="text-sm font-medium">4.8/5 Rating</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Quote className="h-5 w-5 text-secondary" />
                    <span className="text-sm font-medium">5000+ Alumni</span>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Footer */}
            <div className="mt-8 text-center text-sm text-muted-foreground">
              <p>© {new Date().getFullYear()} {branding.name}. All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
