export interface StipendProgram {
  title: string;
  subtitle: string;
  stipendMaxINR: number;
  description: string;
  activities: {
    title: string;
    description: string;
    icon: string;
  }[];
  eligibility: string[];
  benefits: string[];
  duration: string;
  workingHours: string;
}

export const stipendProgram: StipendProgram = {
  title: "Junior Medical Staff Program",
  subtitle: "After Degree — Get up to ₹20K Stipend",
  stipendMaxINR: 20000,
  description: "Join our hospital as Junior Medical Staff after completing your degree. Gain invaluable hands-on experience while earning a monthly stipend of up to ₹20,000. Work alongside experienced practitioners, develop your clinical skills, and build your professional network.",
  activities: [
    {
      title: "Clinical Treatment Knowledge",
      description: "Apply your theoretical knowledge in real clinical settings under expert supervision. Learn advanced treatment protocols and patient care methodologies.",
      icon: "Stethoscope"
    },
    {
      title: "Patient Education Support",
      description: "Help patients understand their conditions, treatment plans, and preventive measures. Develop crucial communication skills essential for healthcare practice.",
      icon: "Users"
    },
    {
      title: "Health Awareness Programs",
      description: "Participate in community outreach initiatives, health camps, and awareness campaigns. Make a real difference in public health while building your reputation.",
      icon: "Heart"
    },
    {
      title: "Research Projects Engagement",
      description: "Contribute to ongoing research projects at the hospital. Gain exposure to research methodologies and potentially co-author publications.",
      icon: "FlaskConical"
    },
    {
      title: "Patient Monitoring & Documentation",
      description: "Learn systematic patient monitoring techniques and maintain accurate medical records. Master documentation practices essential for professional practice.",
      icon: "ClipboardList"
    }
  ],
  eligibility: [
    "Completed B.E.M.S., M.D., D.E.M.S., or C.E.M.S. from WMCH",
    "Successfully passed all required examinations",
    "Completed hospital onboarding process",
    "Committed to minimum 6-month engagement",
    "Good academic standing and conduct record"
  ],
  benefits: [
    "Monthly stipend up to ₹20,000",
    "Hands-on clinical experience",
    "Mentorship from senior practitioners",
    "Certificate of experience upon completion",
    "Priority consideration for permanent positions",
    "Networking with healthcare professionals",
    "Recommendation letters for future opportunities"
  ],
  duration: "6-12 months (extendable based on performance)",
  workingHours: "8 hours/day, 6 days/week"
};

export const requirements = [
  "10+2 or equivalent with PCB (Physics, Chemistry, Biology)",
  "10th Admit Card",
  "Aadhar Card or Voter ID",
  "Passport-size photographs (4 copies)",
  "Previous academic transcripts",
  "Character certificate from last institution"
];

export const admissionDeadline = "05/03/2026";
