"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import aiTools from "@/constants/tools";
import { ArrowUpRight, Sparkles } from "lucide-react";

interface Tool {
  link: string;
  title: string;
  description: string;
  image?: string;
}

function FeaturedTools() {
  const [tools, setTools] = useState<Tool[]>([]);
  useEffect(() => {
    const shuffle = aiTools.sort(() => 0.5 - Math.random());
    const selected = shuffle.slice(0, 6);
    setTools(selected);
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {tools.map((tool: Tool, index: number) => (
        <Link
          key={index}
          href={tool.link}
          className="group relative bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
        >
          {/* Background Gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          {/* Content */}
          <div className="relative z-10">
            {/* Icon */}
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300">
                {tool.image}
              </div>
              <ArrowUpRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
            </div>
            
            {/* Title */}
            <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
              {tool.title}
            </h3>
            
            {/* Description */}
            <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
              {tool.description}
            </p>
            
            {/* Feature Badge */}
            <div className="mt-4 inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
              <Sparkles className="w-3 h-3" />
              AI Powered
            </div>
          </div>
          
          {/* Hover Effect Border */}
          <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-blue-200 transition-colors duration-300"></div>
        </Link>
      ))}
    </div>
  );
}

export default FeaturedTools;
