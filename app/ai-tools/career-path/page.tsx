'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import React, { useState } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';


const CareerPathAdvisor = () => {
  const [interests, setInterests] = useState('');
  const [skills, setSkills] = useState('');
  const [academicBackground, setAcademicBackground] = useState('');
  const [careerAdvice, setCareerAdvice] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerateCareerPath = async () => {
    if (!interests || !skills || !academicBackground) {
      setError('Please fill in all fields');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/career', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ interests, skills, academicBackground }),
      });

      const data = await response.json();
      if (response.ok) {
        setCareerAdvice(data.careerAdvice);
      } else {
        setError(data.error || 'Something went wrong');
      }
    } catch (error) {
      setError('Error generating career advice');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="md:mt-[160px] mt-20 mx-4 lg:mx-16">
      <h1 className="text-2xl lg:text-3xl font-bold text-center mb-8">AI-powered Career Path Advisor</h1>

      <div className="flex flex-col gap-6 lg:gap-8 lg:flex-row">
        <div className="flex-1">
          <label className="block mb-2 text-md lg:text-lg font-medium">
            Interests:
            <Input 
              type="text" 
              value={interests} 
              onChange={(e) => setInterests(e.target.value)} 
              placeholder="e.g., Technology, Design, Management"
              className="mt-1 block w-full"
            />
          </label>
        </div>
        <div className="flex-1">
          <label className="block mb-2 text-md lg:text-lg font-medium">
            Skills:
            <Input 
              type="text" 
              value={skills} 
              onChange={(e) => setSkills(e.target.value)} 
              placeholder="e.g., Coding, Problem-solving, Leadership"
              className="mt-1 block w-full"
            />
          </label>
        </div>
        <div className="flex-1">
          <label className="block mb-2 text-md lg:text-lg font-medium">
            Academic Background:
            <Input 
              type="text" 
              value={academicBackground} 
              onChange={(e) => setAcademicBackground(e.target.value)} 
              placeholder="e.g., Computer Science, Business Management"
              className="mt-1 block w-full"
            />
          </label>
        </div>
      </div>

      {error && <p className="text-red-500 text-center mt-4">{error}</p>}

      <Button 
        className="mt-8 p-3 w-full lg:w-auto mx-auto block bg-blue-500 text-white hover:bg-blue-600 transition"
        onClick={handleGenerateCareerPath}
        disabled={isLoading}
      >
        {isLoading ? "Generating..." : "Generate Career Path"}
      </Button>

      {careerAdvice && (
        <>
          <h2 className="my-8 text-xl lg:text-2xl text-center">Suggested Career Path:</h2>
          <div className="rounded-lg border my-4 mx-3 lg:mx-16 p-4 bg-gray-100">
            {/* <pre className="whitespace-pre-wrap text-md lg:text-lg">{careerAdvice}</pre>
                */}
            <SyntaxHighlighter language="html" style={docco} className="mt-2">
                       {careerAdvice}
          </SyntaxHighlighter>

            <Button 
              className="mt-4 bg-green-500 text-white p-2 rounded-lg hover:bg-green-600 transition w-full lg:w-auto mx-auto block"
              onClick={() => navigator.clipboard.writeText(careerAdvice)}
            >
              Copy to Clipboard
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default CareerPathAdvisor;
