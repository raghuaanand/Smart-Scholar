'use client';

import { useState } from "react";

const InterviewPrep: React.FC = () => {
  const [response, setResponse] = useState<string | null | undefined>('');
  const [isLoading, setIsLoading] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [selectedQuestion, setSelectedQuestion] = useState<string | null>(null);

  const commonQuestions = [
    "Tell me about yourself.",
    "Why do you want to work here?",
    "What are your strengths and weaknesses?",
    "Describe a challenging situation and how you handled it.",
    "Where do you see yourself in 5 years?",
    "Why should we hire you?",
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/interview', {
        method: "POST",
        body: JSON.stringify({ prompt: selectedQuestion || prompt }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) {
        throw new Error('Failed to fetch response');
      }

      const result = await res.json();
      setResponse(result.response);
    } catch (error: any) {
      setError(error.message || 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuestionSelect = (question: string) => {
    setSelectedQuestion(question);
    setPrompt(question);
    setResponse(null);
  };

  return (
    <div className="md:mt-[160px] mt-20 px-4 sm:px-6 lg:px-8 mx-auto max-w-3xl">
      <h1 className="text-2xl md:text-3xl font-bold my-4 text-center">Prepare for Your Next Interview</h1>
      
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Common Interview Questions</h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {commonQuestions.map((question, index) => (
            <li key={index}>
              <button
                onClick={() => handleQuestionSelect(question)}
                className={`p-3 w-full text-left border rounded-lg ${selectedQuestion === question ? 'bg-blue-100 border-blue-500' : 'border-gray-300'} hover:bg-blue-50`}
              >
                {question}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <form onSubmit={handleSubmit} className="w-full bg-white p-6 rounded-lg shadow-md">
        <label htmlFor="prompt" className="block text-lg font-medium mb-2">Your Custom Question or Scenario</label>
        <textarea
          id="prompt"
          name="prompt"
          value={prompt}
          placeholder="Type your interview question or scenario here"
          onChange={(e) => setPrompt(e.target.value)}
          className='w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
          rows={4}
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition w-full"
          disabled={isLoading}
        >
          {isLoading ? "Preparing..." : "Submit"}
        </button>
      </form>

      {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
      {response && (
        <div className="mt-6 p-6 bg-gray-100 border border-gray-300 rounded-lg">
          <h2 className="text-lg font-semibold">AI-Generated Response</h2>
          <p className="mt-2 whitespace-pre-wrap">{response}</p>
        </div>
      )}
    </div>
  );
};

export default InterviewPrep;
