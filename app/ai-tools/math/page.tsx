'use client';

import React, { useState } from 'react';

const MathPage: React.FC = () => {
  const [answer, setAnswer] = useState<string | null | undefined>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [problem, setProblem] = useState<string>('');
  const [subject, setSubject] = useState<string>('math'); // Default subject
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!problem.trim()) return; // Prevent empty submissions

    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/math", {
        method: "POST",
        body: JSON.stringify({ problem, subject }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await res.json();
      setAnswer(result.answer);
    } catch (error: any) {
      setError(error.message || 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-20  md:mt-[150px] px-4 sm:px-6 lg:px-8 mx-auto max-w-3xl">
      <h1 className="text-2xl md:text-3xl font-bold my-4 text-center">Solve Your Problems</h1>
      <form onSubmit={handleSubmit} className="w-full bg-white p-6 rounded-lg shadow-md">
        <label htmlFor="problem" className="block text-lg font-medium mb-2">Problem</label>
        <textarea
          id="problem"
          name="problem"
          value={problem}
          placeholder="Describe your problem here..."
          onChange={(e) => setProblem(e.target.value)}
          className='w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
          rows={4}
        />
        <label htmlFor="subject" className="block text-lg font-medium mb-2">Subject</label>
        <select
          id="subject"
          name="subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className='w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
        >
          <option value="math">Math</option>
          <option value="physics">Physics</option>
          <option value="chemistry">Chemistry</option>
          <option value="economics">Economics</option>
        </select>
        <button
          type="submit"
          className="bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition w-full"
          disabled={isLoading}
        >
          {isLoading ? "Processing..." : "Submit"}
        </button>
      </form>

      {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
      {answer && (
        <div className="mt-4 p-4 bg-gray-100 border border-gray-300 rounded-lg w-full max-w-md mx-auto">
          <h2 className="text-lg font-semibold">Solution</h2>
          <p className="mt-2 whitespace-pre-wrap">{answer}</p>
        </div>
      )}
    </div>
  );
};

export default MathPage;
