'use client';

import { useState } from "react";
import Image from "next/image";

export default function Home() {
  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [input, setInput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<string[]>([]);

  const handleSubmit = async (e: any) => {
    e.preventDefault(); 
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/conver", {
        method: "POST",
        body: JSON.stringify({ prompt: input }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) {
        throw new Error("Failed to fetch explanation. Please try again later.");
      }

      const resultText = await res.text();
      setText(resultText);
      setHistory([resultText, ...history]); // Save to history
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setInput('');
    setText('');
    setError(null);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center pt-6 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-3xl lg:max-w-4xl bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
        <div className="mb-6">
          <h4 className="text-2xl md:text-3xl font-bold mb-2 text-center text-gray-900 dark:text-gray-100">AI Tools</h4>
          <p className="text-lg text-gray-600 dark:text-gray-300 text-center">Simplify complex topics with AI</p>
        </div>

        <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded-lg shadow-md">
          {isLoading ? (
            <div className="flex justify-center">
              <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-blue-500"></div>
            </div>
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : (
            text && (
              <div className="mb-4">
                <p className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-4">{text}</p>
                <div className="flex justify-between">
                  <button 
                    className="bg-gray-500 text-white p-2 rounded-lg hover:bg-gray-600 transition w-full"
                    onClick={() => navigator.clipboard.writeText(text)}
                  >
                    Copy to Clipboard
                  </button>
                  <button 
                    className="bg-green-500 text-white p-2 rounded-lg hover:bg-green-600 transition w-full"
                    onClick={() => downloadExplanation(text)}
                  >
                    Download
                  </button>
                </div>
              </div>
            )
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
            <label htmlFor="prompt" className="text-md font-semibold text-gray-900 dark:text-gray-100">Topic</label>
            <input
              id="prompt"
              name="prompt"
              value={input}
              placeholder='Type here'
              onChange={(e) => setInput(e.target.value)}
              className='w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-300'
            />
            <div className="flex justify-between">
              <button
                type="submit"
                className="bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition w-full"
              >
                Submit
              </button>
              <button
                type="button"
                className="bg-gray-300 dark:bg-gray-700 text-black dark:text-white p-3 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-600 transition w-full"
                onClick={handleClear}
              >
                Clear
              </button>
            </div>
          </form>
        </div>

        {history.length > 0 && (
          <div className="mt-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">History</h2>
            <ul className="list-disc list-inside mt-2">
              {history.map((item, index) => (
                <li key={index} className="text-sm text-gray-800 dark:text-gray-200">{item}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </main>
  );
}

const downloadExplanation = (text: string) => {
  const blob = new Blob([text], { type: 'text/plain' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'explanation.txt';
  a.click();
  window.URL.revokeObjectURL(url);
};
