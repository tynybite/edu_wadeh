
import { Layout } from "@/components/layout/Layout";
import { Section, SectionHeader } from "@/components/ui/section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { branding } from "@/data/contact";
import { CheckCircle2, Target, Lightbulb, History, Users, Award, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function About() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground py-20 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
        <div className="container relative z-10 text-center">
          <span className="inline-block py-1 px-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-sm font-medium mb-6">
            Establishing Excellence Since 2024
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-display">
            About {branding.name}
          </h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-2xl mx-auto leading-relaxed">
            Pioneering the future of holistic healthcare through education, research, and compassionate service.
          </p>
        </div>
        {/* <Badge className="mb-4 bg-white/20 text-white border-0">Admissions Open 2026</Badge> */}
      </section>

      {/* Mission & Vision */}
      <Section>
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          <Card className="bg-primary/5 border-primary/10">
            <CardHeader>
              <Target className="h-10 w-10 text-primary mb-4" />
              <CardTitle className="text-2xl font-bold text-primary">Our Mission</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg text-muted-foreground leading-relaxed">
                To empower the next generation of healthcare professionals with deep knowledge of Electro-Homeopathy,
                fostering a culture of research, ethical practice, and service to humanity. We aim to bridge the gap
                between traditional wisdom and modern medical science.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-accent/5 border-accent/10">
            <CardHeader>
              <Lightbulb className="h-10 w-10 text-accent mb-4" />
              <CardTitle className="text-2xl font-bold text-accent">Our Vision</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg text-muted-foreground leading-relaxed">
                To be recognized globally as a center of excellence in alternative medicine education. We envision a
                society where holistic healthcare is accessible, affordable, and respected as a primary mode of treatment.
              </p>
            </CardContent>
          </Card>
        </div>
      </Section>

      {/* Legacy/History */}
      <Section className="bg-muted/30">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
             <div className="absolute -inset-4 bg-gradient-to-tr from-primary/20 to-accent/20 rounded-xl blur-xl"></div>
            <img 
              src="https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=1000&auto=format&fit=crop" 
              alt="Campus History" 
              className="relative rounded-xl shadow-2xl w-full h-auto object-cover aspect-video"
            />
          </div>
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-foreground">A New Era of Healing & Education</h2>
            <p className="text-lg text-muted-foreground">
              Established in 2024, {branding.name} was founded with a visionary goal: to modernize and elevate the study of Electro-Homeopathy in India.
            </p>
            <p className="text-lg text-muted-foreground">
              What began as a dedicated initiative has quickly grown into a promising institution with state-of-the-art facilities and a commitment to producing the next generation of potential healers.
            </p>
            <div className="grid grid-cols-2 gap-6 pt-4">
               <div className="flex items-center gap-3">
                 <Award className="h-5 w-5 text-primary" />
                 <span className="font-semibold">Expert Faculty</span>
              </div>
               <div className="flex items-center gap-3">
                 <ShieldCheck className="h-5 w-5 text-primary" />
                 <span className="font-semibold">Modern Curriculum</span>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Core Values */}
      <Section>
        <SectionHeader 
          title="Our Core Values" 
          subtitle="The principles that guide us" 
          description="We believe that great healthcare begins with strong values."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: "Excellence", desc: "Striving for the highest standards in education and patient care." },
            { title: "Integrity", desc: "Upholding ethical practices and transparency in all we do." },
            { title: "Compassion", desc: "Treating every patient and student with kindness and empathy." },
            { title: "Innovation", desc: "Continuously advancing the field through research and modern techniques." }
          ].map((item, i) => (
             <div key={i} className="bg-background p-6 rounded-xl border hover:border-primary/50 transition-colors shadow-sm hover:shadow-md">
                <CheckCircle2 className="h-8 w-8 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.desc}</p>
             </div>
          ))}
        </div>
      </Section>
    </Layout>
  );
}
