export interface Tool {
  link: string;
  title: string;
  description: string;
  image?: string
}

const aiTools: Tool[] = [
  {
    link: "/ai-tools/summarizer",
    image: "📝",
    title: "Summarizer",
    description:
      "Summarize any text with a click of a button. Get the main points of any article or document in seconds.",
  },
  {
    link: "/ai-tools/career-path",
    image: "🎯",
    title: "Career Path Advisor",
    description:
      "Analyze a user's skills, interests, and academic history to suggest potential career paths.",
  },
  {
    link: "/ai-tools/explain",
    image: "🧒🏻",
    title: "Explain Like I am 10",
    description:
      "Make complex topics simple. Explain any topic in simple terms. Great for students and teachers.",
  },
  {
    link: "/ai-tools/programming",
    image: "👩‍💻",
    title: "Learn Programming",
    description:
      "Learn programming with real-time code examples. Get instant feedback on your code.",
  },
  {
    link: "/ai-tools/essay",
    image: "✍️",
    title: "Essay Writer",
    description:
      "Write professional essays with AI assistance. Get structured, well-researched content instantly.",
  },
  {
    link: "/ai-tools/research",
    image: "🔍",
    title: "Research Assistant",
    description:
      "Research any topic with comprehensive analysis. Generate detailed research papers with citations.",
  },
  {
    link: "/ai-tools/interview",
    image: "🗣️",
    title: "Interview Prep",
    description:
      "Prepare for your next interview with real-time feedback. Practice with common interview questions.",
  },
  {
    link: "/ai-tools/letter",
    image: "📚",
    title: "Cover Letter Generator",
    description:
      "Create professional cover letters tailored to your job applications. Stand out from the crowd.",
  },
  {
    link: "/ai-tools/math",
    image: "🧮",
    title: "Math Solver",
    description:
      "Solve complex mathematical problems step by step. Get detailed explanations for better understanding.",
  },
  {
    link: "/ai-tools/study-plan",
    image: "📅",
    title: "Study Planner",
    description:
      "Create personalized study schedules and plans. Optimize your learning with AI-powered recommendations.",
  },
  {
    link: "/ai-tools/chat",
    image: "💬",
    title: "AI Chat Assistant",
    description:
      "Chat with our intelligent AI assistant. Get help with any academic or professional questions.",
  },
];


export default aiTools;
