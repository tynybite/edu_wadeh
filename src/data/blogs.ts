export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  authorRole: string;
  authorImage: string;
  category: string;
  tags: string[];
  publishedAt: string;
  readTime: number;
  image: string;
  featured: boolean;
}

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Comprehensive Learner Support: From Enrollment to Employment",
    slug: "comprehensive-learner-support-enrollment-to-employment",
    excerpt: "Discover how WMCH provides end-to-end support for every student, from the moment they apply until they secure their dream healthcare career.",
    content: "At Wadeh Medical College & Hospital, we believe that education extends far beyond the classroom...",
    author: "Dr. Wahidur Rahman",
    authorRole: "Founder & Director",
    authorImage: "/placeholder.svg",
    category: "Student Success",
    tags: ["Career Support", "Student Life", "Placements"],
    publishedAt: "2024-12-01",
    readTime: 5,
    image: "/placeholder.svg",
    featured: true
  },
  {
    id: "2",
    title: "Turn Words into Workflows: Talking to AI to Get Results",
    slug: "ai-healthcare-workflows",
    excerpt: "Explore how artificial intelligence is transforming healthcare documentation and patient care management in modern medical practice.",
    content: "The integration of AI in healthcare is revolutionizing how practitioners manage their workflows...",
    author: "Dr. Priya Sharma",
    authorRole: "Faculty, Digital Health",
    authorImage: "/placeholder.svg",
    category: "Innovation",
    tags: ["AI", "Digital Health", "Technology"],
    publishedAt: "2024-11-28",
    readTime: 7,
    image: "/placeholder.svg",
    featured: true
  },
  {
    id: "3",
    title: "Where Milestones Met Mountains: WMCH Hosts Convocation for Online Learners",
    slug: "wmch-convocation-celebration",
    excerpt: "Celebrating the achievements of our online learners as they gathered for an inspiring convocation ceremony at the main campus.",
    content: "The halls of Wadeh Medical College echoed with joy and pride as we celebrated another batch of graduates...",
    author: "Admin Team",
    authorRole: "Communications",
    authorImage: "/placeholder.svg",
    category: "Events",
    tags: ["Graduation", "Celebration", "Alumni"],
    publishedAt: "2024-11-20",
    readTime: 4,
    image: "/placeholder.svg",
    featured: false
  },
  {
    id: "4",
    title: "B.E.M.S. Syllabus (2025-26): Complete Semester-wise Guide",
    slug: "bems-syllabus-2025-26-complete-guide",
    excerpt: "A comprehensive breakdown of the B.E.M.S. curriculum, covering all semesters with subject details and learning outcomes.",
    content: "The Bachelor of Electro-Homeopathy Medicine & Surgery (B.E.M.S.) program is designed to provide...",
    author: "Academic Department",
    authorRole: "Curriculum Team",
    authorImage: "/placeholder.svg",
    category: "Academics",
    tags: ["Curriculum", "B.E.M.S.", "Syllabus"],
    publishedAt: "2024-11-15",
    readTime: 10,
    image: "/placeholder.svg",
    featured: true
  },
  {
    id: "5",
    title: "The Future of Electro-Homeopathy: Trends and Opportunities",
    slug: "future-electro-homeopathy-trends",
    excerpt: "An in-depth look at emerging trends in Electro-Homeopathy and career opportunities awaiting aspiring practitioners.",
    content: "As the world increasingly embraces holistic healthcare approaches, Electro-Homeopathy stands at the forefront...",
    author: "Dr. Rahul Mehta",
    authorRole: "Research Director",
    authorImage: "/placeholder.svg",
    category: "Industry Insights",
    tags: ["Career", "Trends", "Healthcare"],
    publishedAt: "2024-11-10",
    readTime: 8,
    image: "/placeholder.svg",
    featured: false
  },
  {
    id: "6",
    title: "Student Spotlight: From C.E.M.S. to Clinic Owner in 3 Years",
    slug: "student-spotlight-certificate-to-clinic",
    excerpt: "Meet Rakesh, who started with our certificate program and now runs a successful healthcare practice serving 500+ patients monthly.",
    content: "Every success story at WMCH begins with a single step. For Rakesh Kumar, that step was enrolling in our C.E.M.S. program...",
    author: "Alumni Relations",
    authorRole: "Student Affairs",
    authorImage: "/placeholder.svg",
    category: "Student Success",
    tags: ["Alumni", "Success Story", "Entrepreneurship"],
    publishedAt: "2024-11-05",
    readTime: 6,
    image: "/placeholder.svg",
    featured: false
  }
];

export const blogCategories = [
  "All",
  "Student Success",
  "Innovation",
  "Events",
  "Academics",
  "Industry Insights"
];
