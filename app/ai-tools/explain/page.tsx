'use client';

import { useEffect, useState } from "react";
import Image from "next/image";
import { Textarea } from "@/components/ui/textarea";
import { HiOutlineClipboardDocument } from "react-icons/hi2";
import { HiOutlineClipboardDocumentCheck } from "react-icons/hi2";
import { UserButton } from "@clerk/nextjs";
import { IoDownloadOutline } from "react-icons/io5";
import { MdDownloadDone } from "react-icons/md";
import { BiUpload } from "react-icons/bi";
import { AiOutlineLoading } from "react-icons/ai";

export default function Home() {
  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [input, setInput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<string[]>([]);
  const [clipboard, setClipboard] = useState<boolean | null>(false);
  const [download, setDownload] = useState<boolean | null>(false);
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let index = -1;
    setDisplayedText("");
    const intervalId = setInterval(() => {
      if (text && text.length > 0) {
        setDisplayedText((prev) => prev + text.charAt(index));
        index++;
      } else {
        clearInterval(intervalId);
      }
    }, 5);

    return () => clearInterval(intervalId);
  }, [text]);

  const handleClipboard = () => {
    setClipboard(true);
  }
  const handleDownload = () => {
    setDownload(true);
  }

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

    setTimeout(() => {
      // Simulating an API call delay
      setInput(""); // Clear the textarea
      setIsLoading(false);
    }, 10);
  };


  return (
    <main className=" h-screen flex justify-center">

      {(
        text && (
          <div className="fixed md:top-48 top-32 md:w-[60%] w-[90%] flex gap-3 md:gap-7">
            <div>
              <UserButton />
            </div>
            <div className="max-h-[70vh] overflow-y-auto">
              <p className="md:text-lg text-sm md:mb-20 text-justify pr-6">{displayedText}</p>

              <div className="flex gap-3">
                <button
                  onClick={() => navigator.clipboard.writeText(text).then(handleClipboard)}
                >
                  {clipboard ? (
                    <HiOutlineClipboardDocumentCheck className="md:text-2xl text-gray-500 hover:text-gray-700" />
                  ) : (
                    <HiOutlineClipboardDocument className="md:text-2xl text-gray-500 hover:text-gray-700" />
                  )}
                </button>
                <button
                  onClick={() => { downloadExplanation(text); handleDownload; }}
                >
                  {download ? (
                    <IoDownloadOutline className="md:text-2xl text-gray-500 hover:text-gray-700" />
                  ) : (
                    <MdDownloadDone className="md:text-2xl text-gray-500 hover:text-gray-700" />
                  )}
                </button>
              </div>
            </div>
          </div>
        )
      )}




      <form onSubmit={handleSubmit} className="flex md:w-[60%] w-[80%] items-center justify-center fixed bottom-10 z-20 bg-white  md:bottom-20 gap-2 ">
        <Textarea
          id="prompt"
          name="prompt"
          value={input}
          placeholder='Type here'
          onChange={(e) => setInput(e.target.value)}
          className='md:px-8 md:py-3 md:text-lg text-sm overflow-hidden'
        />
        <div className="flex justify-between">
          <button
            type="submit"
            className=""
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
        </div>
      </form>

      {/* {history.length > 0 && (
          <div className="mt-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">History</h2>
            <ul className="list-disc list-inside mt-2">
              {history.map((item, index) => (
                <li key={index} className="text-sm text-gray-800 dark:text-gray-200">{item}</li>
              ))}
            </ul>
          </div>
        )} */}
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
