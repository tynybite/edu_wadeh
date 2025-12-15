import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Search, Phone, ChevronDown, GraduationCap, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { branding, contactInfo } from "@/data/contact";
import { cn } from "@/lib/utils";

const navItems = [
  {
    label: "Programs",
    href: "/courses",
    children: [
      { label: "B.E.M.S. (Bachelor's)", href: "/programs/bems" },
      { label: "M.D. (Master's)", href: "/programs/md" },
      { label: "D.E.M.S. (Diploma)", href: "/programs/dems" },
      { label: "C.E.M.S. (Certificate)", href: "/programs/cems" },
    ],
  },
  {
    label: "Institutions",
    href: "#",
    children: [
      { label: "Wadeh Medical College", href: "/", internal: true },
      { label: "Wadeh Hospital", href: "https://wadeh.in", external: true, icon: true },
    ],
  },
  { label: "Placements", href: "/placements" },
  { label: "Stipend Program", href: "/stipend" },
  { label: "Blogs", href: "/blogs" },
  { label: "FAQs", href: "/faqs" },
  { label: "Help Center", href: "/help" },
];

export function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
      {/* Top Bar - Navy Style */}
      <div className="bg-primary">
        <div className="container flex h-10 items-center justify-between text-sm text-primary-foreground">
          <div className="flex items-center gap-4">
            <a href={`tel:${contactInfo.phone}`} className="flex items-center gap-1 hover:text-secondary transition-colors">
              <Phone className="h-3 w-3" />
              <span>+91 {contactInfo.phone}</span>
            </a>
            <span className="hidden sm:inline opacity-50">|</span>
            <a href={`mailto:${contactInfo.email}`} className="hidden sm:inline hover:text-secondary transition-colors">
              {contactInfo.email}
            </a>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden md:inline text-secondary font-medium">
              Admissions Open for 2026!
            </span>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
            <GraduationCap className="h-6 w-6 text-primary-foreground" />
          </div>
          <div className="hidden sm:block">
            <h1 className="text-lg font-bold text-foreground leading-tight">{branding.shortName}</h1>
            <p className="text-xs text-muted-foreground">{branding.tagline}</p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item) =>
            item.children ? (
              <DropdownMenu key={item.label}>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="gap-1">
                    {item.label}
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-56">
                  {item.children.map((child) => (
                    <DropdownMenuItem key={child.label} asChild>
                      {child.external ? (
                        <a
                          href={child.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-between w-full"
                        >
                          <span>{child.label}</span>
                          {child.icon && <ExternalLink className="h-3.5 w-3.5 ml-2" />}
                        </a>
                      ) : (
                        <Link to={child.href}>{child.label}</Link>
                      )}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                key={item.label}
                variant="ghost"
                asChild
                className={cn(
                  location.pathname === item.href && "bg-muted"
                )}
              >
                <Link to={item.href}>{item.label}</Link>
              </Button>
            )
          )}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="hidden sm:flex"
          >
            <Search className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </Button>

          <Button asChild className="hidden sm:inline-flex">
            <Link to="/apply">Apply Now</Link>
          </Button>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <div className="flex flex-col gap-4 mt-8">
                <Link to="/" className="flex items-center gap-2 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                    <GraduationCap className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <span className="font-bold text-lg">{branding.shortName}</span>
                </Link>

                {navItems.map((item) => (
                  <div key={item.label}>
                    {item.children ? (
                      <div className="space-y-2">
                        <span className="font-medium text-foreground">{item.label}</span>
                        <div className="ml-4 space-y-2">
                          {item.children.map((child) => (
                            child.external ? (
                              <a
                                key={child.label}
                                href={child.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-between text-muted-foreground hover:text-primary transition-colors"
                              >
                                <span>{child.label}</span>
                                {child.icon && <ExternalLink className="h-3.5 w-3.5 ml-2" />}
                              </a>
                            ) : (
                              <Link
                                key={child.label}
                                to={child.href}
                                className="block text-muted-foreground hover:text-primary transition-colors"
                              >
                                {child.label}
                              </Link>
                            )
                          ))}
                        </div>
                      </div>
                    ) : (
                      <Link
                        to={item.href}
                        className="block font-medium text-foreground hover:text-primary transition-colors"
                      >
                        {item.label}
                      </Link>
                    )}
                  </div>
                ))}

                <Button asChild className="mt-4 w-full">
                  <Link to="/apply">Apply Now</Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Search Bar */}
      {isSearchOpen && (
        <div className="border-t border-border bg-card py-4">
          <div className="container">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="search"
                placeholder="Search courses, programs, or topics..."
                className="w-full rounded-lg border border-input bg-background py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                autoFocus
              />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
