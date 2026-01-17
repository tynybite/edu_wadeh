import { Link } from "react-router-dom";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { 
  GraduationCap, 
  Users, 
  Heart, 
  BookOpen, 
  Briefcase, 
  FlaskConical,
  ArrowRight,
  Play,
  Stethoscope,
  Building2,
  BadgeCheck,
  Wallet,
  Sparkles,
  Star,
  Quote,
  ChevronRight,
  ArrowUpRight
} from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { courses } from "@/data/courses";
import { testimonials } from "@/data/testimonials";
import { blogPosts } from "@/data/blogs";
import { faqs } from "@/data/faqs";
import { branding } from "@/data/contact";
import {
  SplitText,
  Reveal,
  Stagger,
  StaggerItem,
  Floating,
  MagneticButton,
  AnimatedCounter,
  MorphingBlob,
  GradientText,
  CursorGlow,
} from "@/hooks/useAnimations";

const features = [
  { title: "Caring & Qualified Faculty", icon: Users },
  { title: "Practical Training Focus", icon: Stethoscope },
  { title: "Comprehensive Curriculum", icon: BookOpen },
  { title: "Research & Innovation", icon: FlaskConical },
  { title: "OPD & IPD Practice", icon: Building2 },
  { title: "Scholarships & Stipends", icon: Wallet },
  { title: "100% Placement Assistance", icon: Briefcase },
  { title: "No-Cost EMI Options", icon: BadgeCheck },
];

const stats = [
  { value: 5000, suffix: "+", label: "Learners Empowered" },
  { value: 95, suffix: "%", label: "Positive Program ROI" },
  { value: 98, suffix: "%", label: "Student Satisfaction" },
  { value: 15, suffix: "+", label: "States Reached" },
];

export default function Home() {
  const featuredCourses = courses.filter(c => c.featured);
  const featuredTestimonials = testimonials.slice(0, 4);
  const featuredFaqs = faqs.slice(0, 5);
  const featuredBlogs = blogPosts.filter(p => p.featured).slice(0, 3);

  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);
  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

  return (
    <Layout>
      {/* Cursor Glow Effect */}
      <CursorGlow />

      {/* ================================================================
          HERO - Cinematic Parallax with Split Text
          ================================================================ */}
      <section 
        ref={heroRef}
        className="relative min-h-[100vh] overflow-hidden bg-gradient-to-b from-background via-background to-muted/30"
      >
        {/* Animated Morphing Blobs */}
        <MorphingBlob 
          className="w-[800px] h-[800px] -top-[200px] -right-[200px] opacity-40"
          color="hsl(38 90% 55% / 0.15)"
        />
        <MorphingBlob 
          className="w-[600px] h-[600px] -bottom-[100px] -left-[200px] opacity-30"
          color="hsl(155 45% 30% / 0.15)"
        />
        <MorphingBlob 
          className="w-[400px] h-[400px] top-1/3 left-1/2 opacity-25"
          color="hsl(16 80% 58% / 0.1)"
        />

        {/* Grain Overlay */}
        <div className="absolute inset-0 grain pointer-events-none opacity-50" />

        {/* Floating Decorative Elements */}
        <Floating duration={6} distance={20} delay={0} className="absolute top-[20%] right-[15%] hidden lg:block">
          <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-secondary/30 to-accent/20 backdrop-blur-sm border border-secondary/20" />
        </Floating>
        <Floating duration={8} distance={15} delay={1} className="absolute bottom-[30%] left-[8%] hidden lg:block">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/10 backdrop-blur-sm border border-primary/10" />
        </Floating>
        <Floating duration={5} distance={25} delay={2} className="absolute top-[40%] right-[8%] hidden lg:block">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent/25 to-transparent backdrop-blur-sm border border-accent/15" />
        </Floating>

        {/* Announcement Bar */}
        <motion.div 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative z-10 bg-primary/95 backdrop-blur-md py-3"
        >
          <div className="container flex items-center justify-center gap-3 text-sm text-primary-foreground">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Sparkles className="h-4 w-4 text-secondary" />
            </motion.div>
            <span className="font-medium">Admissions Open for 2026</span>
            <span className="hidden sm:inline text-primary-foreground/60">—</span>
            <Link 
              to="/apply" 
              className="hidden sm:inline-flex items-center gap-1 font-semibold text-secondary hover:text-accent transition-colors group"
            >
              Enroll until 05/03/2026
              <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </motion.div>

        {/* Hero Content */}
        <motion.div 
          style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
          className="relative z-10 container pt-20 md:pt-28 lg:pt-36 pb-16"
        >
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
            {/* Left: Text Content */}
            <div className="space-y-10">
              {/* Accreditation Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-card/80 backdrop-blur-md border border-border/50 shadow-lg"
              >
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-xs font-bold text-primary uppercase tracking-widest">UGC-Entitled</span>
                </div>
                <div className="w-px h-4 bg-border" />
                <div className="flex items-center gap-1.5">
                  <Star className="h-3.5 w-3.5 text-secondary fill-secondary" />
                  <span className="text-xs font-bold text-secondary uppercase tracking-widest">NAAC A+</span>
                </div>
              </motion.div>

              {/* Headline with Split Text */}
              <div className="space-y-2">
                <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-display font-black leading-[0.95] tracking-tight">
                  <SplitText delay={0.5} className="text-foreground">Education</SplitText>
                  <br />
                  <SplitText delay={0.7} className="text-foreground">That Powers</SplitText>
                  <br />
                  <span className="inline-block mt-2">
                    <GradientText className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-display font-black">
                      Your Ambition
                    </GradientText>
                  </span>
                </h1>
              </div>

              {/* Tagline */}
              <Reveal delay={1} direction="up">
                <p className="text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed">
                  {branding.tagline} — Shape your future in healthcare at{" "}
                  <span className="text-primary font-semibold">Wadeh Medical College & Hospital</span>
                </p>
              </Reveal>

              {/* CTAs with Magnetic Effect */}
              <Reveal delay={1.2} direction="up">
                <div className="flex flex-wrap gap-4 pt-2">
                  <MagneticButton>
                    <Button 
                      size="lg" 
                      asChild 
                      className="group relative text-lg px-10 py-7 bg-accent hover:bg-accent text-accent-foreground font-bold rounded-2xl shadow-2xl shadow-accent/25 overflow-hidden"
                    >
                      <Link to="/apply">
                        <span className="relative z-10 flex items-center">
                          Apply Now
                          <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-2 transition-transform duration-300" />
                        </span>
                        <motion.div 
                          className="absolute inset-0 bg-gradient-to-r from-accent via-orange-500 to-accent"
                          initial={{ x: "-100%" }}
                          whileHover={{ x: "100%" }}
                          transition={{ duration: 0.6 }}
                        />
                      </Link>
                    </Button>
                  </MagneticButton>
                  <MagneticButton>
                    <Button 
                      size="lg" 
                      variant="outline" 
                      asChild
                      className="text-lg px-10 py-7 border-2 border-foreground/10 hover:border-primary/30 hover:bg-primary/5 rounded-2xl transition-all duration-300"
                    >
                      <Link to="/courses" className="flex items-center">
                        Explore Programs
                        <ArrowUpRight className="ml-2 h-5 w-5" />
                      </Link>
                    </Button>
                  </MagneticButton>
                </div>
              </Reveal>

              {/* Trust Indicators */}
              <Reveal delay={1.4} direction="up">
                <div className="flex items-center gap-8 pt-4">
                  <div className="flex -space-x-4">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1.5 + i * 0.1, type: "spring" }}
                        className="w-12 h-12 rounded-full bg-gradient-to-br from-secondary via-accent to-primary border-3 border-background flex items-center justify-center text-white text-sm font-bold shadow-lg"
                      >
                        {String.fromCharCode(64 + i)}
                      </motion.div>
                    ))}
                  </div>
                  <div className="text-sm">
                    <div className="flex items-center gap-1.5 text-secondary font-bold">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Star key={i} className="h-4 w-4 fill-secondary text-secondary" />
                      ))}
                      <span className="ml-1">4.8</span>
                    </div>
                    <p className="text-muted-foreground mt-0.5">From 500+ reviews</p>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Right: Interactive Visual */}
            <div className="relative hidden lg:flex items-center justify-center">
              <Reveal delay={0.8} direction="right">
                <div className="relative">
                  {/* Glow Effect */}
                  <motion.div
                    animate={{ 
                      scale: [1, 1.1, 1],
                      opacity: [0.5, 0.8, 0.5]
                    }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="absolute inset-0 bg-gradient-to-br from-secondary/40 via-accent/30 to-primary/40 rounded-[3rem] blur-3xl"
                  />
                  
                  {/* Main Card */}
                  <motion.div
                    whileHover={{ scale: 1.02, rotateY: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="relative bg-card/90 backdrop-blur-xl rounded-[2.5rem] p-10 border border-border/50 shadow-2xl"
                  >
                    <div className="space-y-8">
                      {/* Header */}
                      <div className="flex items-center gap-5">
                        <motion.div
                          animate={{ rotate: [0, 10, -10, 0] }}
                          transition={{ duration: 4, repeat: Infinity }}
                          className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary via-primary/80 to-secondary flex items-center justify-center shadow-lg"
                        >
                          <GraduationCap className="h-10 w-10 text-primary-foreground" />
                        </motion.div>
                        <div>
                          <h3 className="font-display font-black text-2xl text-foreground">WMCH</h3>
                          <p className="text-muted-foreground">Excellence Since 2010</p>
                        </div>
                      </div>
                      
                      {/* Stats Grid */}
                      <div className="grid grid-cols-2 gap-4">
                        {[
                          { value: "5+", label: "Programs" },
                          { value: "50+", label: "Faculty" },
                          { value: "15+", label: "States" },
                          { value: "98%", label: "Pass Rate" },
                        ].map((stat, i) => (
                          <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.2 + i * 0.1 }}
                            whileHover={{ scale: 1.05, backgroundColor: "hsl(var(--secondary) / 0.1)" }}
                            className="bg-muted/50 rounded-2xl p-5 text-center transition-colors"
                          >
                            <div className="text-2xl font-display font-black text-primary">{stat.value}</div>
                            <div className="text-xs text-muted-foreground mt-1 font-medium">{stat.label}</div>
                          </motion.div>
                        ))}
                      </div>

                      {/* CTA */}
                      <Button asChild className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-2xl py-6 text-lg font-semibold">
                        <Link to="/courses" className="flex items-center justify-center gap-2">
                          <Play className="h-5 w-5" />
                          Watch Campus Tour
                        </Link>
                      </Button>
                    </div>
                  </motion.div>

                  {/* Floating Badges */}
                  <Floating duration={4} distance={10} delay={0}>
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 1.5, type: "spring" }}
                      className="absolute -top-6 -right-6 bg-card/95 backdrop-blur-xl rounded-2xl px-5 py-3 shadow-xl border border-border/50"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                        <span className="font-semibold text-foreground">Live Classes</span>
                      </div>
                    </motion.div>
                  </Floating>

                  <Floating duration={5} distance={12} delay={0.5}>
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 1.7, type: "spring" }}
                      className="absolute -bottom-8 -left-8 bg-card/95 backdrop-blur-xl rounded-2xl px-6 py-4 shadow-xl border border-border/50"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-xl bg-accent/20 flex items-center justify-center">
                          <Heart className="h-7 w-7 text-accent" />
                        </div>
                        <div>
                          <div className="text-xl font-display font-black text-foreground">5000+</div>
                          <div className="text-xs text-muted-foreground font-medium">Students Placed</div>
                        </div>
                      </div>
                    </motion.div>
                  </Floating>
                </div>
              </Reveal>
            </div>
          </div>
        </motion.div>

        {/* Program Cards with Stagger */}
        <div className="relative z-10 bg-card/80 backdrop-blur-xl border-t border-border/50 py-10 mt-8">
          <div className="container">
            <Stagger stagger={0.1} delay={0.2} className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-5">
              {courses.slice(0, 5).map((course) => (
                <StaggerItem key={course.id}>
                  <Link
                    to={`/program/${course.id}`}
                    className="group block text-center p-6 rounded-2xl bg-background/60 border border-border/30 hover:border-secondary/50 hover:bg-secondary/5 transition-all duration-500 hover:shadow-lg hover:shadow-secondary/10"
                  >
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="h-16 w-16 mx-auto rounded-2xl bg-gradient-to-br from-primary/10 via-secondary/15 to-accent/10 flex items-center justify-center mb-4"
                    >
                      <GraduationCap className="h-8 w-8 text-primary group-hover:text-secondary transition-colors duration-300" />
                    </motion.div>
                    <h3 className="font-display font-bold text-foreground group-hover:text-secondary transition-colors duration-300">
                      {course.shortTitle}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1.5">{course.durationDisplay || `${course.durationMonths}mo`}</p>
                  </Link>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>
      </section>

      {/* ================================================================
          STATS - Animated Counter Section
          ================================================================ */}
      <section className="relative py-24 md:py-32 bg-gradient-to-br from-primary via-primary to-primary/90 overflow-hidden">
        <div className="absolute inset-0 grain pointer-events-none opacity-30" />
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
          className="absolute -top-1/2 -right-1/4 w-[80vw] h-[80vw] border border-primary-foreground/5 rounded-full"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-1/2 -left-1/4 w-[60vw] h-[60vw] border border-primary-foreground/5 rounded-full"
        />
        
        <div className="container relative z-10">
          <Stagger stagger={0.15} className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-16">
            {stats.map((stat) => (
              <StaggerItem key={stat.label} className="text-center">
                <div className="text-5xl md:text-6xl lg:text-7xl font-display font-black text-primary-foreground mb-3">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} duration={2.5} />
                </div>
                <div className="text-sm md:text-base text-primary-foreground/70 font-medium tracking-wide uppercase">
                  {stat.label}
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ================================================================
          PROGRAMS - Interactive Bento Grid
          ================================================================ */}
      <section className="py-24 md:py-32 bg-background relative overflow-hidden">
        <MorphingBlob className="w-[500px] h-[500px] top-0 right-0 opacity-20" color="hsl(38 90% 55% / 0.1)" />
        
        <div className="container relative z-10">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-20">
            <Reveal>
              <span className="text-secondary text-sm font-bold uppercase tracking-[0.2em]">Our Programs</span>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-black text-foreground mt-4 leading-tight">
                Top Programs at{" "}
                <GradientText>WMCH</GradientText>
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-lg text-muted-foreground mt-6 max-w-2xl mx-auto">
                Choose from our comprehensive range of Electro-Homeopathy programs designed to launch your healthcare career
              </p>
            </Reveal>
          </div>

          {/* Programs Grid */}
          <Stagger stagger={0.1} className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {featuredCourses.map((course, i) => (
              <StaggerItem key={course.id} className={i === 0 ? 'md:col-span-2 md:row-span-2' : ''}>
                <Link to={`/program/${course.id}`}>
                  <motion.div
                    whileHover={{ y: -10, scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className={`group relative h-full overflow-hidden rounded-3xl bg-card border border-border/50 p-8 ${i === 0 ? 'p-10' : ''}`}
                  >
                    {/* Hover Gradient */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      className="absolute inset-0 bg-gradient-to-br from-secondary/10 via-transparent to-accent/10"
                    />
                    
                    <div className={`relative z-10 flex ${i === 0 ? 'flex-col h-full' : 'items-start gap-5'}`}>
                      <motion.div
                        whileHover={{ rotate: 10, scale: 1.1 }}
                        className={`${i === 0 ? 'h-32 w-32 mb-8' : 'w-16 h-16 shrink-0'} rounded-2xl bg-gradient-to-br from-primary/15 via-secondary/10 to-accent/10 flex items-center justify-center`}
                      >
                        <GraduationCap className={`${i === 0 ? 'h-16 w-16' : 'h-8 w-8'} text-primary group-hover:text-secondary transition-colors duration-300`} />
                      </motion.div>
                      <div className={i === 0 ? 'flex-1 flex flex-col' : ''}>
                        <div className="flex items-center gap-2 mb-3">
                          {course.tags.slice(0, 2).map((tag) => (
                            <Badge key={tag} className="text-xs bg-secondary/10 text-secondary border-0 font-semibold">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <h3 className={`font-display font-bold text-foreground group-hover:text-secondary transition-colors duration-300 mb-2 ${i === 0 ? 'text-3xl' : 'text-xl'}`}>
                          {course.shortTitle}
                        </h3>
                        <p className={`text-muted-foreground line-clamp-2 ${i === 0 ? 'text-base mb-6 flex-1' : 'text-sm'}`}>
                          {course.description}
                        </p>
                        {i === 0 && (
                          <div className="flex items-center gap-6 mt-auto pt-6 border-t border-border/50">
                            <div>
                              <div className="text-sm text-muted-foreground">Duration</div>
                              <div className="font-bold text-foreground">{course.durationDisplay}</div>
                            </div>
                            <div>
                              <div className="text-sm text-muted-foreground">Investment</div>
                              <div className="font-bold text-foreground">₹{course.tuitionDisplay}</div>
                            </div>
                            <motion.div
                              whileHover={{ x: 5 }}
                              className="ml-auto flex items-center gap-2 text-secondary font-semibold"
                            >
                              Explore <ArrowRight className="h-4 w-4" />
                            </motion.div>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>

          {/* View All */}
          <Reveal delay={0.5}>
            <div className="text-center mt-14">
              <MagneticButton>
                <Button variant="outline" size="lg" asChild className="rounded-2xl border-2 px-10 py-6 text-lg font-semibold">
                  <Link to="/courses">
                    View All Programs
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </MagneticButton>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ================================================================
          INSTITUTIONS
          ================================================================ */}
      <section className="py-24 md:py-32 bg-muted/30 relative overflow-hidden">
        <div className="absolute inset-0 dots-pattern opacity-20" />
        
        <div className="container relative z-10">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-20">
            <Reveal>
              <span className="text-secondary text-sm font-bold uppercase tracking-[0.2em]">Our Institutions</span>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-black text-foreground mt-4">
                Two Pillars of <GradientText>Excellence</GradientText>
              </h2>
            </Reveal>
          </div>

          {/* Cards */}
          <div className="grid gap-8 md:grid-cols-2">
            <Reveal direction="left">
              <motion.div
                whileHover={{ y: -10 }}
                className="group relative overflow-hidden rounded-[2rem] bg-card border border-border/50 shadow-xl"
              >
                <div className="h-64 bg-gradient-to-br from-primary/20 via-primary/10 to-secondary/10 flex items-center justify-center relative overflow-hidden">
                  <motion.div
                    animate={{ scale: [1, 1.1, 1], rotate: [0, 5, 0] }}
                    transition={{ duration: 8, repeat: Infinity }}
                  >
                    <GraduationCap className="h-28 w-28 text-primary/30 group-hover:text-primary/50 transition-colors duration-500" />
                  </motion.div>
                </div>
                <div className="p-10">
                  <h3 className="text-3xl font-display font-black text-foreground mb-4">Wadeh Medical College</h3>
                  <p className="text-muted-foreground text-lg mb-8">
                    Comprehensive academic programs in Electro-Homeopathy, combining theoretical knowledge with practical training.
                  </p>
                  <Button variant="outline" asChild className="rounded-xl group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                    <Link to="/courses">
                      View Programs <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </motion.div>
            </Reveal>

            <Reveal direction="right" delay={0.2}>
              <motion.div
                whileHover={{ y: -10 }}
                className="group relative overflow-hidden rounded-[2rem] bg-card border border-border/50 shadow-xl"
              >
                <div className="h-64 bg-gradient-to-br from-accent/20 via-accent/10 to-secondary/10 flex items-center justify-center relative overflow-hidden">
                  <motion.div
                    animate={{ scale: [1, 1.1, 1], rotate: [0, -5, 0] }}
                    transition={{ duration: 8, repeat: Infinity, delay: 1 }}
                  >
                    <Building2 className="h-28 w-28 text-accent/30 group-hover:text-accent/50 transition-colors duration-500" />
                  </motion.div>
                </div>
                <div className="p-10">
                  <h3 className="text-3xl font-display font-black text-foreground mb-4">Wadeh Hospital</h3>
                  <p className="text-muted-foreground text-lg mb-8">
                    Hands-on patient care experience, including OPD, IPD, and community health programs under expert supervision.
                  </p>
                  <Button variant="outline" asChild className="rounded-xl group-hover:bg-accent group-hover:text-accent-foreground transition-all duration-300">
                    <a href="https://wadeh.in" target="_blank" rel="noopener noreferrer">
                      Explore Services <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </motion.div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ================================================================
          WHY CHOOSE US
          ================================================================ */}
      <section className="py-24 md:py-32 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 grain pointer-events-none opacity-20" />
        <MorphingBlob className="w-[600px] h-[600px] -top-[200px] -left-[200px] opacity-20" color="hsl(38 90% 55% / 0.3)" />
        
        <div className="container relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Reveal>
              <span className="text-secondary text-sm font-bold uppercase tracking-[0.2em]">The Wadeh Advantage</span>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-black text-primary-foreground mt-4">
                Why Choose WMCH?
              </h2>
            </Reveal>
          </div>

          <Stagger stagger={0.08} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <StaggerItem key={feature.title}>
                <motion.div
                  whileHover={{ scale: 1.05, backgroundColor: "hsl(var(--primary-foreground) / 0.15)" }}
                  className="flex items-center gap-4 p-6 rounded-2xl bg-primary-foreground/5 border border-primary-foreground/10 transition-all duration-300"
                >
                  <motion.div
                    whileHover={{ rotate: 10 }}
                    className="w-14 h-14 rounded-xl bg-secondary/20 flex items-center justify-center"
                  >
                    <feature.icon className="h-7 w-7 text-secondary" />
                  </motion.div>
                  <span className="font-semibold text-primary-foreground">{feature.title}</span>
                </motion.div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ================================================================
          TESTIMONIALS
          ================================================================ */}
      <section className="py-24 md:py-32 bg-muted/30 relative overflow-hidden">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <Reveal>
              <span className="text-secondary text-sm font-bold uppercase tracking-[0.2em]">Real Stories</span>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-black text-foreground mt-4">
                What Our <GradientText>Learners</GradientText> Say
              </h2>
            </Reveal>
          </div>

          <Stagger stagger={0.1} className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {featuredTestimonials.map((testimonial) => (
              <StaggerItem key={testimonial.id}>
                <motion.div
                  whileHover={{ y: -8 }}
                  className="h-full bg-card rounded-3xl border border-border/50 p-8 shadow-lg"
                >
                  <Quote className="h-10 w-10 text-secondary/20 mb-6" />
                  <p className="text-muted-foreground italic leading-relaxed mb-8">
                    "{testimonial.quote}"
                  </p>
                  <div className="flex items-center gap-4 pt-6 border-t border-border/50">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary via-secondary to-accent flex items-center justify-center text-white text-lg font-bold">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-bold text-foreground">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                    </div>
                  </div>
                </motion.div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ================================================================
          STIPEND BANNER
          ================================================================ */}
      <section className="py-24 md:py-32 bg-gradient-to-br from-secondary via-accent to-secondary relative overflow-hidden">
        <div className="absolute inset-0 grain pointer-events-none opacity-20" />
        <motion.div
          animate={{ x: [-100, 100, -100] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12"
        />
        
        <div className="container relative z-10 text-center max-w-4xl mx-auto">
          <Reveal>
            <Badge className="bg-white/20 text-white border-0 text-sm px-5 py-2 mb-8 font-semibold">
              After Degree Program
            </Badge>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-display font-black text-white mb-8 leading-tight">
              Get up to ₹20,000<br/>Monthly Stipend
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto">
              Join our Junior Medical Staff program after completing your degree.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <MagneticButton>
              <Button size="lg" variant="secondary" asChild className="text-lg px-12 py-7 rounded-2xl shadow-2xl font-bold">
                <Link to="/stipend">
                  Learn More <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </MagneticButton>
          </Reveal>
        </div>
      </section>

      {/* ================================================================
          FAQs
          ================================================================ */}
      <section className="py-24 md:py-32 bg-background">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <Reveal>
              <span className="text-secondary text-sm font-bold uppercase tracking-[0.2em]">Have Questions?</span>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-black text-foreground mt-4">
                Frequently Asked <GradientText>Questions</GradientText>
              </h2>
            </Reveal>
          </div>

          <Reveal delay={0.2}>
            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="w-full space-y-4">
                {featuredFaqs.map((faq) => (
                  <AccordionItem 
                    key={faq.id} 
                    value={faq.id}
                    className="bg-card rounded-2xl border border-border/50 px-8 py-2 shadow-sm"
                  >
                    <AccordionTrigger className="text-left font-display font-bold text-foreground hover:text-secondary transition-colors py-5 text-lg">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground pb-5 text-base">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
              
              <div className="text-center mt-12">
                <MagneticButton>
                  <Button variant="outline" size="lg" asChild className="rounded-2xl border-2 px-10 py-6 font-semibold">
                    <Link to="/faqs">
                      View All FAQs <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                </MagneticButton>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ================================================================
          BLOGS
          ================================================================ */}
      <section className="py-24 md:py-32 bg-muted/30">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <Reveal>
              <span className="text-secondary text-sm font-bold uppercase tracking-[0.2em]">Latest Updates</span>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-black text-foreground mt-4">
                From Our <GradientText>Blog</GradientText>
              </h2>
            </Reveal>
          </div>

          <Stagger stagger={0.15} className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {featuredBlogs.map((post) => (
              <StaggerItem key={post.id}>
                <Link to={`/blogs/${post.id}`}>
                  <motion.div
                    whileHover={{ y: -10 }}
                    className="group bg-card rounded-3xl border border-border/50 overflow-hidden shadow-lg"
                  >
                    <div className="h-52 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 flex items-center justify-center relative overflow-hidden">
                      <motion.div whileHover={{ scale: 1.1 }}>
                        <BookOpen className="h-14 w-14 text-primary/30 group-hover:text-primary/50 transition-colors duration-500" />
                      </motion.div>
                    </div>
                    <div className="p-8">
                      <div className="flex items-center gap-3 mb-4">
                        <Badge className="text-xs bg-secondary/10 text-secondary border-0">{post.category}</Badge>
                        <span className="text-xs text-muted-foreground">{post.publishedAt}</span>
                      </div>
                      <h3 className="font-display font-bold text-xl text-foreground group-hover:text-secondary transition-colors duration-300 mb-3 line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-muted-foreground line-clamp-2">{post.excerpt}</p>
                    </div>
                  </motion.div>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>

          <Reveal delay={0.4}>
            <div className="text-center mt-14">
              <MagneticButton>
                <Button variant="outline" size="lg" asChild className="rounded-2xl border-2 px-10 py-6 font-semibold">
                  <Link to="/blogs">
                    Read More Articles <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </MagneticButton>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ================================================================
          FINAL CTA
          ================================================================ */}
      <section className="py-32 md:py-40 bg-card relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] h-[90vw] border border-border/20 rounded-full"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] border border-border/15 rounded-full"
        />
        
        <div className="container relative z-10 text-center max-w-4xl mx-auto">
          <Reveal>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-display font-black text-foreground mb-8 leading-tight">
              Ready to Begin Your<br/>
              <GradientText>Healthcare Journey?</GradientText>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
              Join thousands of successful healthcare practitioners who started their journey at WMCH.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="flex flex-wrap justify-center gap-5">
              <MagneticButton>
                <Button size="lg" asChild className="group text-lg px-12 py-7 bg-accent hover:bg-accent text-accent-foreground font-bold rounded-2xl shadow-2xl shadow-accent/30">
                  <Link to="/apply">
                    Apply Now — Deadline: 05/03/2026
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-2 transition-transform" />
                  </Link>
                </Button>
              </MagneticButton>
              <MagneticButton>
                <Button size="lg" variant="outline" asChild className="text-lg px-12 py-7 border-2 rounded-2xl font-semibold">
                  <Link to="/help">Talk to a Counselor</Link>
                </Button>
              </MagneticButton>
            </div>
          </Reveal>
        </div>
      </section>
    </Layout>
  );
}
