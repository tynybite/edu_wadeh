export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: "general" | "admissions" | "programs" | "fees" | "placements" | "international" | "technical";
}

export const faqs: FAQ[] = [
  {
    id: "1",
    question: "What is Wadeh Medical College & Hospital?",
    answer: "Wadeh Medical College & Hospital (WMCH) is a premier institution dedicated to Electro-Homeopathy education and healthcare services. We offer comprehensive programs including B.E.M.S., M.D., D.E.M.S., and C.E.M.S., combining traditional healing wisdom with modern medical practices. Our integrated hospital provides hands-on clinical training for students.",
    category: "general"
  },
  {
    id: "2",
    question: "Are Wadeh programs recognized and valid?",
    answer: "Yes, our programs are recognized and designed to meet regulatory standards. We are working towards UGC and NAAC accreditation. Our curriculum aligns with established medical education frameworks, ensuring our graduates are well-prepared for professional practice.",
    category: "general"
  },
  {
    id: "3",
    question: "What is the difference between online and distance education at WMCH?",
    answer: "WMCH offers a hybrid learning model combining online lectures, recorded sessions, and mandatory in-person clinical training. Our LMS (Learning Management System) provides 24/7 access to study materials, while practical sessions at our hospital ensure hands-on experience. Remote examinations are available for theory components.",
    category: "programs"
  },
  {
    id: "4",
    question: "Do employers accept WMCH degrees?",
    answer: "Yes, WMCH graduates are employed across healthcare sectors including private clinics, hospitals, wellness centers, and community health organizations. Our 100% placement assistance program has successfully placed graduates with various healthcare employers. Many alumni have also established their own successful practices.",
    category: "placements"
  },
  {
    id: "5",
    question: "Are WMCH degrees equivalent to on-campus degrees?",
    answer: "Our programs follow rigorous academic standards equivalent to traditional on-campus medical education. The curriculum includes theoretical knowledge, practical training, and clinical rotations at Wadeh Hospital, ensuring comprehensive skill development comparable to conventional programs.",
    category: "programs"
  },
  {
    id: "6",
    question: "Is there global recognition for WMCH qualifications?",
    answer: "We are pursuing international recognition through organizations like WES, IQAS, and ICAS. Our curriculum is designed to meet global healthcare education standards. International students can verify credential recognition requirements with their respective country's medical boards.",
    category: "international"
  },
  {
    id: "7",
    question: "Are international students eligible to apply?",
    answer: "Yes, we welcome international students. Requirements include valid passport, equivalent educational qualifications, English proficiency, and relevant documentation. Our international admissions team provides dedicated support throughout the application process.",
    category: "international"
  },
  {
    id: "8",
    question: "What are the admission requirements?",
    answer: "Requirements vary by program: B.E.M.S. requires 10+2 with PCB (Physics, Chemistry, Biology); M.D. requires B.E.M.S. or equivalent; D.E.M.S. requires 10+2; C.E.M.S. requires 10th pass. All applicants need 10th Admit Card, Aadhar/Voter Card, and passport-size photographs.",
    category: "admissions"
  },
  {
    id: "9",
    question: "What is the fee structure and are there scholarships?",
    answer: "Fee structures vary by program. We offer merit-based scholarships, need-based financial aid, and no-cost EMI options. The stipend program provides up to ₹20,000/month for qualifying students working as Junior Medical Staff. Contact our admissions team for detailed fee breakdowns.",
    category: "fees"
  },
  {
    id: "10",
    question: "How does the stipend program work?",
    answer: "After completing your degree, eligible graduates can join our Junior Medical Staff program, earning up to ₹20,000 monthly while gaining supervised clinical experience. Activities include patient care, health awareness programs, research projects, and clinical documentation.",
    category: "fees"
  },
  {
    id: "11",
    question: "What placement support does WMCH offer?",
    answer: "We provide 100% placement assistance including resume building, interview preparation, mock interviews, and direct connections with healthcare employers. Our placement cell maintains relationships with hospitals, clinics, and wellness organizations across India.",
    category: "placements"
  },
  {
    id: "12",
    question: "What technical requirements are needed for online learning?",
    answer: "Students need a computer/laptop or smartphone with stable internet connection, webcam for live sessions, and access to our LMS platform. We provide technical support and orientation for all new students to ensure smooth online learning experience.",
    category: "technical"
  }
];

export const faqCategories = [
  { id: "general", label: "General", icon: "HelpCircle" },
  { id: "admissions", label: "Admissions", icon: "GraduationCap" },
  { id: "programs", label: "Programs", icon: "BookOpen" },
  { id: "fees", label: "Fees & Scholarships", icon: "Wallet" },
  { id: "placements", label: "Placements", icon: "Briefcase" },
  { id: "international", label: "International", icon: "Globe" },
  { id: "technical", label: "Technical Support", icon: "Settings" }
];
