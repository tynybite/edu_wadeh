export interface Testimonial {
  id: string;
  name: string;
  role: string;
  program: string;
  batch: string;
  image: string;
  quote: string;
  rating: number;
  category: "working-professional" | "international" | "career-switcher" | "fresh-graduate";
}

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Dr. Priya Sharma",
    role: "Healthcare Practitioner",
    program: "B.E.M.S.",
    batch: "2022",
    image: "/placeholder.svg",
    quote: "WMCH transformed my understanding of holistic healthcare. The practical training and supportive faculty helped me establish my own successful practice within a year of graduation.",
    rating: 5,
    category: "fresh-graduate"
  },
  {
    id: "2",
    name: "Rajesh Kumar",
    role: "Hospital Administrator",
    program: "M.D.",
    batch: "2023",
    image: "/placeholder.svg",
    quote: "As a working professional, the flexible learning approach at WMCH allowed me to upgrade my skills while managing my job. The stipend program was a game-changer for my career.",
    rating: 5,
    category: "working-professional"
  },
  {
    id: "3",
    name: "Fatima Begum",
    role: "Community Health Worker",
    program: "D.E.M.S.",
    batch: "2023",
    image: "/placeholder.svg",
    quote: "The diploma program gave me the perfect foundation to serve my community. The health awareness training has helped me impact hundreds of lives in my village.",
    rating: 5,
    category: "career-switcher"
  },
  {
    id: "4",
    name: "Mohammed Ali",
    role: "Clinic Owner",
    program: "B.E.M.S.",
    batch: "2021",
    image: "/placeholder.svg",
    quote: "From zero medical background to running my own clinic - WMCH made it possible. The comprehensive curriculum and placement support exceeded my expectations.",
    rating: 5,
    category: "career-switcher"
  },
  {
    id: "5",
    name: "Ananya Das",
    role: "Research Associate",
    program: "M.D.",
    batch: "2024",
    image: "/placeholder.svg",
    quote: "The research opportunities at WMCH are exceptional. I'm now contributing to groundbreaking studies in Electro-Homeopathy while working at the hospital.",
    rating: 5,
    category: "fresh-graduate"
  },
  {
    id: "6",
    name: "Suresh Patel",
    role: "Senior Practitioner",
    program: "B.E.M.S.",
    batch: "2020",
    image: "/placeholder.svg",
    quote: "WMCH's focus on both theory and practice sets it apart. The OPD and IPD training prepared me for real-world challenges from day one.",
    rating: 5,
    category: "working-professional"
  },
  {
    id: "7",
    name: "Meera Krishnan",
    role: "Health Educator",
    program: "C.E.M.S.",
    batch: "2024",
    image: "/placeholder.svg",
    quote: "Even the certificate program at WMCH is incredibly comprehensive. It sparked my passion for alternative medicine and I'm now pursuing B.E.M.S.",
    rating: 4,
    category: "fresh-graduate"
  },
  {
    id: "8",
    name: "Abdul Rahman",
    role: "International Student",
    program: "B.E.M.S.",
    batch: "2023",
    image: "/placeholder.svg",
    quote: "Coming from Bangladesh, I found WMCH welcoming and supportive. The quality of education matches international standards at affordable costs.",
    rating: 5,
    category: "international"
  }
];
