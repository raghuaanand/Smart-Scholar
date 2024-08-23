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
    title: " Summarizer",
    description:
      "Summarize any text with a click of a button. Get the main points of any article or document in seconds.",
  },
  {
    link: "/ai-tools/career-path",
    image: "📝",
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
    link: "/ai-tools/re-write",
    image: "✍🏻",
    title: " Rewrite Content",
    description:
      "Rewrite any text with a click of a button. Get a fresh perspective on any topic.",
  },
  {
    link: "/ai-tools/programming",
    image: "👩‍💻 ",
    title: "Learn Programming",
    description:
      "Learn programming with real-time code examples. Get instant feedback on your code.",
  },
  {
    link: "/ai-tools/essay",
    image: "✍ ",
    title: "Essay",
    description:
      "Write an essay with a click of a button. Get a fresh perspective on any topic.",
  },
  {
    link: "/ai-tools/research",
    image: "🔍",
    title: " Research",
    description:
      "Research any topic with a click of a button. Get a fresh perspective on any topic.",
  },
  {
    link: "/ai-tools/interview",
    image: "🗣",
    title: " Interview Prep",
    description:
      "Prepare for your next interview with real-time feedback. Get instant feedback on your answers.",
  },
  {
    link: "/ai-tools/letter",
    image: "📚",
    title: " Cover Letter",
    description:
      "Write a cover letter with a click of a button. Get a fresh perspective on any topic.",
  },
];


export default aiTools;
