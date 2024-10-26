'use client';

import { useEffect, useState } from "react";
import { BiUpload } from "react-icons/bi";
import { AiOutlineLoading } from "react-icons/ai";
import { HiOutlineClipboardDocument } from "react-icons/hi2";
import { HiOutlineClipboardDocumentCheck } from "react-icons/hi2";
import { UserButton } from "@clerk/nextjs";


const SummarizerPage: React.FC = () => {
  const [summary, setSummary] = useState<string | null>('');
  const [isLoading, setIsLoading] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [clipboard, setClipboard] = useState<boolean | null>(false);
  // const [wordCount, setWordCount] = useState<number>(0);
  const handleClipboard = () => {
    setClipboard(true);
  }

  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let index = -1;

    // Clear the existing text when the summary changes
    setDisplayedText("");

    // Typing animation logic
    const intervalId = setInterval(() => {
      if (summary && index < summary.length) {
        setDisplayedText((prev) => prev + summary.charAt(index));
        index++;
      } else {
        clearInterval(intervalId);
      }
    }, 5); // Adjust the typing speed by changing the interval (e.g., 5ms)

    return () => clearInterval(intervalId);
  }, [summary]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/summarize', {
        method: "POST",
        body: JSON.stringify({ prompt }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await res.json();
      setSummary(result.summary);
    } catch (error: any) {
      setError(error.message || 'An error occurred');
    } finally {
      setIsLoading(false);
    }


    setTimeout(() => {
      // Simulating an API call delay
      setPrompt(""); // Clear the textarea
      setIsLoading(false);
    }, 10);
  };

  return (
    <div className="md:pt-[160px] border-[2px] w-screen h-screen pt-16 md:px-4 md:mx-4 flex flex-col items-center justify-center">
      {/* <h1 className="text-3xl font-bold mb-6">AI Summarizer</h1> */}
      <form onSubmit={handleSubmit} className="flex w-screen items-center justify-center fixed bottom-16 md:bottom-20 ">
        <textarea
          id="prompt"
          name="prompt"
          value={prompt}
          placeholder="Enter text to summarize..."
          onChange={(e) => setPrompt(e.target.value)}
          className="text-sm md:text-lg md:w-[60%] w-[70%] h-[40px] md:h-[60px] md:px-8 px-4 md:py-[14px] py-2 border rounded-3xl overflow-hidden"
          rows={4}
        />
        <button
          type="submit"
          className="p-2 rounded-lg transition"
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="bg-gray-100 rounded-full md:w-16 w-10 h-10 md:h-16 flex items-center justify-center">
              <AiOutlineLoading className="md:text-3xl text-xl hover:animate-spin text-gray-400" />
            </div>
          ) : (
            <div className="bg-gray-100 rounded-full md:w-16 w-10 h-10 md:h-16 flex items-center justify-center">
              <BiUpload className="md:text-3xl text-xl hover:animate-bounce text-gray-400" />
            </div>
          )}
        </button>
      </form>

      {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
      {summary && (
        <div className="fixed md:top-48 top-32 md:w-[60%] flex md:gap-7">
          <div>
            <UserButton />
          </div>
          <div className="w-[80%]">
            <p className="whitespace-pre-wrap md:text-lg text-left text-sm">{displayedText}</p>
            <button className="mt-6" onClick={handleClipboard}>
              {clipboard ? (
                <HiOutlineClipboardDocumentCheck className="md:text-2xl text-gray-500 hover:text-gray-700" />
              ) : (
                <HiOutlineClipboardDocument className="md:text-2xl text-gray-500 hover:text-gray-700" />
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SummarizerPage;
