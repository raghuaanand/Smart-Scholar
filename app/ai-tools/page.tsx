'use client';

import Image from "next/image";
import Link from "next/link";
import React from 'react';

export default function Home() {
  const tools = [
    {
      link: '/ai-tools/summarizer',
      title: '📝 Summarizer',
      description: 'Summarize any text with a click of a button. Get the main points of any article or document in seconds.',
    },
    {
      link: '/ai-tools/career-path',
      title: 'Career Path Advisor',
      description: 'Analyze a user\'s skills, interests, and academic history to suggest potential career paths.',
    },
    {
      link: '/ai-tools/explain',
      title: '🧒🏻 Explain Like I am 10',
      description: 'Make complex topics simple. Explain any topic in simple terms. Great for students and teachers.',
    },
    {
      link: '/ai-tools/math',
      title: '✍🏻 Step by Step Solutions',
      description: 'Solve mathematical problems step by step. Get detailed solutions to any math problem.',
    },
    {
      link: '/ai-tools/programming',
      title: '👩‍💻 Learn Programming',
      description: 'Learn programming with real-time code examples. Get instant feedback on your code.',
    },
    {
      link: '/ai-tools/essay',
      title: '✍ Essay',
      description: 'Write an essay with a click of a button. Get a fresh perspective on any topic.',
    },
    {
      link: '/ai-tools/research',
      title: '🔍 Research',
      description: 'Research any topic with a click of a button. Get a fresh perspective on any topic.',
    },
    {
      link: '/ai-tools/interview',
      title: '🗣 Interview Prep',
      description: 'Prepare for your next interview with real-time feedback. Get instant feedback on your answers.',
    },
    {
      link: '/ai-tools/letter',
      title: '📚 Cover Letter',
      description: 'Write a cover letter with a click of a button. Get a fresh perspective on any topic.',
    },
  ];

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 py-10 ">
      <div className="w-full max-w-6xl px-4 mt-20  md:mt-[150px]">
        <h1 className="text-center text-3xl font-bold mb-8 text-gray-800">
          Transform Your Work with Our AI Tools
        </h1>
        <p className="text-center text-lg mb-12 text-gray-600">
          Explore a wide range of powerful AI tools designed to streamline your work and boost productivity.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {tools.map((tool, index) => (
            <Link
              key={index}
              href={tool.link}
              className="bg-white border border-gray-300 rounded-lg shadow-lg transition-transform transform hover:scale-105"
            >
              <div className="p-6 flex flex-col items-center text-center">
                <div className="text-4xl mb-4">{tool.title}</div>
                <p className="text-sm text-gray-700">{tool.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
