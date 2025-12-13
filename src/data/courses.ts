export interface Course {
  id: string;
  title: string;
  shortTitle: string;
  degreeType: "BEMS" | "MD" | "DEMS" | "CEMS";
  department: "College" | "Hospital";
  durationMonths: number;
  tuitionINR: number;
  rating: number;
  reviewCount: number;
  tags: string[];
  specializations: string[];
  badges: string[];
  ctaLabel: string;
  description: string;
  eligibility: string[];
  outcomes: string[];
  featured: boolean;
}

export const courses: Course[] = [
  {
    id: "bems",
    title: "Bachelor of Electro-Homeopathy Medicine & Surgery",
    shortTitle: "B.E.M.S.",
    degreeType: "BEMS",
    department: "College",
    durationMonths: 48,
    tuitionINR: 150000,
    rating: 4.7,
    reviewCount: 245,
    tags: ["Most Popular", "In-Demand"],
    specializations: ["Electro-Homeopathy", "Patient Care", "Community Health"],
    badges: ["UGC-entitled", "NAAC A+"],
    ctaLabel: "Explore Program",
    description: "A comprehensive 4-year program that trains students in the principles and practice of Electro-Homeopathy, combining traditional healing with modern medical knowledge.",
    eligibility: ["10+2 with PCB (Physics, Chemistry, Biology)", "Minimum 50% aggregate marks", "Valid ID proof (Aadhar/Voter Card)"],
    outcomes: ["Licensed Electro-Homeopathy Practitioner", "Clinical Treatment Expertise", "Patient Care Management", "Research & Documentation Skills"],
    featured: true
  },
  {
    id: "md",
    title: "Master of Electro-Homeopathy Medicine",
    shortTitle: "M.D.",
    degreeType: "MD",
    department: "College",
    durationMonths: 24,
    tuitionINR: 200000,
    rating: 4.8,
    reviewCount: 89,
    tags: ["Advanced", "Research Focus"],
    specializations: ["Advanced Therapeutics", "Research Methodology", "Clinical Leadership"],
    badges: ["UGC-entitled", "NAAC A+"],
    ctaLabel: "Explore Program",
    description: "An advanced 2-year postgraduate program for qualified practitioners seeking specialization in Electro-Homeopathy research and advanced clinical practice.",
    eligibility: ["B.E.M.S. or equivalent degree", "Minimum 55% in undergraduate", "Clinical experience preferred"],
    outcomes: ["Specialist Practitioner", "Research Leadership", "Academic Excellence", "Advanced Clinical Skills"],
    featured: true
  },
  {
    id: "dems",
    title: "Diploma in Electro-Homeopathy Medicine & Surgery",
    shortTitle: "D.E.M.S.",
    degreeType: "DEMS",
    department: "College",
    durationMonths: 24,
    tuitionINR: 80000,
    rating: 4.5,
    reviewCount: 156,
    tags: ["Quick Start", "Practical Focus"],
    specializations: ["Basic Electro-Homeopathy", "Patient Interaction", "Clinical Practice"],
    badges: ["Recognized Diploma"],
    ctaLabel: "Explore Program",
    description: "A 2-year diploma program providing foundational knowledge and practical skills in Electro-Homeopathy for aspiring healthcare practitioners.",
    eligibility: ["10+2 or equivalent", "Science background preferred", "Valid ID proof"],
    outcomes: ["Certified Practitioner", "OPD Management", "Patient Counseling", "Basic Clinical Skills"],
    featured: false
  },
  {
    id: "cems",
    title: "Certificate in Electro-Homeopathy Medicine",
    shortTitle: "C.E.M.S.",
    degreeType: "CEMS",
    department: "College",
    durationMonths: 6,
    tuitionINR: 30000,
    rating: 4.4,
    reviewCount: 312,
    tags: ["Short Duration", "Entry Level"],
    specializations: ["Introduction to Electro-Homeopathy", "Health Awareness", "Basic Treatment"],
    badges: ["Certificate Program"],
    ctaLabel: "Explore Program",
    description: "A 6-month certificate program introducing the fundamentals of Electro-Homeopathy, perfect for those exploring the field.",
    eligibility: ["10th pass or equivalent", "Interest in alternative medicine", "No prior experience required"],
    outcomes: ["Foundation Knowledge", "Health Awareness Skills", "Entry to Advanced Programs", "Community Health Support"],
    featured: false
  }
];

export const degreeTypes = [
  { id: "BEMS", label: "Bachelor's", description: "4-year undergraduate program" },
  { id: "MD", label: "Master's", description: "2-year postgraduate program" },
  { id: "DEMS", label: "Diploma", description: "2-year professional diploma" },
  { id: "CEMS", label: "Certificate", description: "6-month foundation course" }
];

export const departments = [
  { id: "College", name: "Wadeh Medical College", description: "Education & Academic Excellence" },
  { id: "Hospital", name: "Wadeh Hospital", description: "Clinical Practice & Patient Care" }
];
