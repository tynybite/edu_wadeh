import { Link } from "react-router-dom";
import { 
  GraduationCap, 
  Phone, 
  Mail, 
  MapPin, 
  Facebook, 
  Instagram, 
  Linkedin, 
  Youtube,
  Clock
} from "lucide-react";
import { branding, contactInfo } from "@/data/contact";

const footerLinks = {
  programs: [
    { label: "B.E.M.S. (Bachelor's)", href: "/program/bems" },
    { label: "M.D. (Master's)", href: "/program/md" },
    { label: "D.E.M.S. (Diploma)", href: "/program/dems" },
    { label: "C.E.M.S. (Certificate)", href: "/program/cems" },
  ],
  quickLinks: [
    { label: "About Us", href: "/about" },
    { label: "Placements", href: "/placements" },
    { label: "Stipend Program", href: "/stipend" },
    { label: "Blogs", href: "/blogs" },
    { label: "FAQs", href: "/faqs" },
    { label: "Help Center", href: "/help" },
  ],
  services: [
    { label: "OPD with Medicine", href: "/services" },
    { label: "IPD with Patient Care", href: "/services" },
    { label: "Health Awareness Programs", href: "/services" },
    { label: "Research & Innovation", href: "/services" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      {/* Main Footer */}
      <div className="container py-12 md:py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand Column */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                <GraduationCap className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-bold text-lg">{branding.shortName}</h3>
                <p className="text-xs text-secondary-foreground/70">{branding.tagline}</p>
              </div>
            </Link>
            <p className="text-sm text-secondary-foreground/80">
              {branding.name} is a premier institution dedicated to excellence in Electro-Homeopathy education and healthcare services.
            </p>
            <div className="flex gap-3">
              <a href={contactInfo.socialMedia.facebook} className="hover:text-accent transition-colors" aria-label="Facebook">
                <Facebook className="h-5 w-5" />
              </a>
              <a href={contactInfo.socialMedia.instagram} className="hover:text-accent transition-colors" aria-label="Instagram">
                <Instagram className="h-5 w-5" />
              </a>
              <a href={contactInfo.socialMedia.linkedin} className="hover:text-accent transition-colors" aria-label="LinkedIn">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href={contactInfo.socialMedia.youtube} className="hover:text-accent transition-colors" aria-label="YouTube">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Programs */}
          <div>
            <h4 className="font-semibold mb-4">Programs</h4>
            <ul className="space-y-2">
              {footerLinks.programs.map((link) => (
                <li key={link.label}>
                  <Link to={link.href} className="text-sm text-secondary-foreground/80 hover:text-accent transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {footerLinks.quickLinks.map((link) => (
                <li key={link.label}>
                  <Link to={link.href} className="text-sm text-secondary-foreground/80 hover:text-accent transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3 text-sm text-secondary-foreground/80">
              <li>
                <a href={`tel:${contactInfo.phone}`} className="flex items-start gap-2 hover:text-accent transition-colors">
                  <Phone className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <span>+91 {contactInfo.phone}</span>
                </a>
              </li>
              <li>
                <a href={`mailto:${contactInfo.email}`} className="flex items-start gap-2 hover:text-accent transition-colors">
                  <Mail className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <span>{contactInfo.email}</span>
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>{contactInfo.address.full}</span>
              </li>
              <li className="flex items-start gap-2">
                <Clock className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <div>
                  <p>Mon-Fri: {contactInfo.workingHours.weekdays}</p>
                  <p>Sat: {contactInfo.workingHours.saturday}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Accreditation Bar */}
      <div className="border-t border-secondary-foreground/10 bg-secondary/50">
        <div className="container py-4">
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-secondary-foreground/60">
            {branding.accreditations.map((acc) => (
              <span key={acc} className="px-3 py-1 rounded-full border border-secondary-foreground/20">
                {acc}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-secondary-foreground/10">
        <div className="container py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-secondary-foreground/60">
            <p>© {new Date().getFullYear()} {branding.name}. All rights reserved.</p>
            <div className="flex gap-4">
              <Link to="/privacy" className="hover:text-secondary-foreground transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-secondary-foreground transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
