"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { otherTools } from "@/constants/otherTools";

interface otherTools{
    title: string;
    description: string;
}

export default function AdditionalResources(){
    const [tools, setTools] = useState<otherTools[]>([]);
    useEffect(() => {
        const shuffle = otherTools.sort(() => {
            return 0.5 - Math.random();
        });
        const selected = shuffle.slice(0, 4);
        setTools(selected);
    }, []);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-6">
          {tools.map((tool, index) => (
            <div
              key={index}
              className="bg-white border border-gray-300 rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 text-center"
            >
              <div className="text-2xl mb-3 font-bold">{tool.title}</div>
              <p className="text-gray-700">{tool.description}</p>
            </div>
          ))}
        </div>
    )
}