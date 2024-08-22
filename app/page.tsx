'use client';

import { Button } from "@/components/ui/button";
import { AcademicPage, JobsPage, StudyPlan, WritingPage } from "@/components/tools";
import { OrbitingCirclesDemo } from "@/components/cards";
import { FrequentlyAsked } from "@/components/frequently";
import Pricing from "@/components/pricing";
import Footer from "@/components/footer";
import Link from "next/link";

export default function Home() {
  const tools = [
    {
      link: "/ai-tools/summarizer",
      title: "📝 Summarizer",
      description: "Summarize any text with a click of a button. Get the main points of any article or document in seconds.",
    },
    {
      link: "/ai-tools/career-path",
      title: "Career Path Advisor",
      description: "Analyze a user's skills, interests, and academic history to suggest potential career paths.",
    },
    {
      link: "/ai-tools/explain",
      title: "🧒🏻 Explain Like I am 10",
      description: "Make complex topics simple. Explain any topic in simple terms. Great for students and teachers.",
    },
    {
      link: "/ai-tools/re-write",
      title: "✍🏻 Rewrite Content",
      description: "Rewrite any text with a click of a button. Get a fresh perspective on any topic.",
    },
    {
      link: "/ai-tools/programming",
      title: "👩‍💻 Learn Programming",
      description: "Learn programming with real-time code examples. Get instant feedback on your code.",
    },
    {
      link: "/ai-tools/essay",
      title: "✍ Essay",
      description: "Write an essay with a click of a button. Get a fresh perspective on any topic.",
    },
    {
      link: "/ai-tools/research",
      title: "🔍 Research",
      description: "Research any topic with a click of a button. Get a fresh perspective on any topic.",
    },
    {
      link: "/ai-tools/interview",
      title: "🗣 Interview Prep",
      description: "Prepare for your next interview with real-time feedback. Get instant feedback on your answers.",
    },
    {
      link: "/ai-tools/letter",
      title: "📚 Cover Letter",
      description: "Write a cover letter with a click of a button. Get a fresh perspective on any topic.",
    },
  ];

  const otherTools = [
    {
      title: "Forum",
      description: "Join the community and get help from others.",
    },
    {
      title: "Blog",
      description: "Read the latest articles and stay up to date with the latest trends.",
    },
    {
      title: "Courses",
      description: "Learn new skills and advance your career with our online courses.",
    },
    {
      title: "Webinars",
      description: "Attend live webinars and learn from experts in the field.",
    },
    {
      title: "Podcast",
      description: "Listen to our podcast and get inspired by the stories of successful people.",
    },
    {
      title: "Book Club",
      description: "Join our book club and discuss the latest books with other members.",
    },
    {
      title: "Events",
      description: "Attend our events and meet other members of the community.",
    },
    {
      title: "Resources",
      description: "Get access to resources that will help you learn and grow.",
    },
  ];

  return (
    <div className="flex flex-col items-center bg-gray-50 min-h-screen py-12">


         {/* Hero Section */}
         <section className="w-full max-w-6xl px-4 text-center md:mt-[140px] mt-20">
        <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
          Empower Your Work with Smart Scholar
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          Discover our range of tools designed to simplify your work, enhance learning, and boost productivity.
        </p>
        <Link href="#tools">
          <Button className="text-xl px-6 py-3 bg-blue-600 text-white hover:bg-blue-700 transition-colors">
            Get Started for Free
          </Button>
        </Link>
      </section>
      
      {/* Video Section */}
      <section className="w-full max-w-6xl my-5    px-4 text-center">
        <div className="relative pb-[56.25%] overflow-hidden rounded-lg shadow-lg">
        <iframe
          className="absolute top-0 left-0 w-full h-full"
          src="https://www.youtube.com/embed/pF1dPfOmIpw?rel=0"
          title="Showcase Video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
        </div>
        <h2 className="text-4xl font-bold text-gray-900 mt-8">See Smart Scholar in Action</h2>
        <p className="text-lg text-gray-600 mt-4">
          Watch how Smart Scholar can transform the way you work, learn, and grow. Our tools are designed to empower you every step of the way.
        </p>
      </section>

   

      {/* Main Tools Section */}
      <section id="tools" className="w-full max-w-6xl px-4 mt-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Powerful Tools to Transform Your Work
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {tools.map((tool, index) => (
            <Link key={index} href={tool.link} className="bg-white border border-gray-300 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="p-6 text-center">
                <div className="text-4xl mb-3">{tool.title}</div>
                <p className="text-gray-700">{tool.description}</p>
              </div>
            </Link>
          ))}
        </div>
        <Link href="/ai-tools">
          <Button className="mt-8 text-xl px-6 py-3 bg-blue-600 text-white hover:bg-blue-700 transition-colors">
            Explore More
          </Button>
        </Link>
      </section>

      {/* Other Tools Section */}
      <section className="w-full max-w-6xl px-4 mt-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Additional Resources
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {otherTools.map((tool, index) => (
            <div key={index} className="bg-white border border-gray-300 rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 text-center">
              <div className="text-2xl mb-3">{tool.title}</div>
              <p className="text-gray-700">{tool.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Sections */}
      <section className="w-full px-4 mt-12">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8">
            Discover Our Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-lg p-8 transition-transform transform hover:scale-105">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Job Opportunities</h3>
              <JobsPage />
            </div>
            <div className="bg-white rounded-lg shadow-lg p-8 transition-transform transform hover:scale-105">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Academic Resources</h3>
              <AcademicPage />
            </div>
            <div className="bg-white rounded-lg shadow-lg p-8 transition-transform transform hover:scale-105">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Writing Assistance</h3>
              <WritingPage />
            </div>
            <div className="bg-white rounded-lg shadow-lg p-8 transition-transform transform hover:scale-105">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Study Planner</h3>
              <StudyPlan />
            </div>
          </div>
        </div>
      </section>

          <section className="w-full mt-12">
            <div className="max-w-7xl mx-auto">
              <OrbitingCirclesDemo />
            </div>
          </section>

      {/* FAQ Section */}
      <section className="w-full px-4 mt-12 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Frequently Asked Questions</h2>
        <FrequentlyAsked />
      </section>

      {/* Call to Action Section */}
      <section className="w-full px-4 mt-12 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Get Started for Free</h2>
        <p className="text-lg text-gray-600 mb-6">Take Smart Scholar for a spin today. No credit card required.</p>
        <Link href="#tools">
          <Button className="text-xl px-6 py-3 bg-blue-600 text-white hover:bg-blue-700 transition-colors">
            Try Smart Scholar Free
          </Button>
        </Link>
      </section>

      {/* Pricing and Footer */}
      <section className="w-full px-4 mt-12">
        <Pricing />
      </section>
      <div className="w-full mt-12">
        <Footer />
      </div>
    </div>
  );
}
