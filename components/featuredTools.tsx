"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import aiTools from "@/constants/tools";

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
    const selected = shuffle.slice(0, 4);
    setTools(selected);
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-6">
      {tools.map((tool: Tool, index: number) => (
        <Link
          key={index}
          href={tool.link}
          className="bg-white border border-gray-300 rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <div className="p-6 text-center flex">
            <div className="w-1/3 text-5xl flex items-center justify-center ">
              <p className="rounded-full border-[1px] p-5 border-gray-400 shadow-md">{tool.image}</p>
            </div>
            <div className="w-2/3 ">
              <div className="text-2xl mb-3 font-bold">{tool.title}</div>
              <p className="text-gray-700 px-6 text-sm">{tool.description}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default FeaturedTools;
