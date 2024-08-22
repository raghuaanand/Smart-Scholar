'use client';

import { useState } from "react";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/cjs/styles/hljs';
import { Button } from '@/components/ui/button';
import  {Input} from '@/components/ui/input';
import {  Textarea}  from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"




const ProgrammingPage: React.FC = () => {
  const [explanation, setExplanation] = useState<string | null | undefined>('');
  const [isLoading, setIsLoading] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [inputMode, setInputMode] = useState('Code');
  const [copied, setCopied]  = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/programming', {
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
      setExplanation(result.explanation);
    } catch (error: any) {
      setError(error.message || 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setPrompt('');
    setExplanation('');
    setError(null);
  };

  return (
    <div className="md:mt-[160px] mt-20 px-4 sm:px-6 lg:px-8 mx-auto max-w-3xl">
      <h1 className="text-3xl font-bold my-6 text-center">AI Programming Tutor</h1>
      
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <div className="mb-4">
          <label htmlFor="inputMode" className="block text-lg font-medium mb-2">Input Mode</label>
          <Select onValueChange={setInputMode} defaultValue={inputMode}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select an input mode" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Input Modes</SelectLabel>
                <SelectItem value="Code">Code</SelectItem>
                <SelectItem value="Concept">Concept</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <label htmlFor="prompt" className="block text-lg font-medium mb-2">{inputMode} to Explain</label>
        <Textarea
          id="prompt"
          name="prompt"
          value={prompt}
          placeholder={`Type the ${inputMode.toLowerCase()} you need explained here`}
          onChange={(e) => setPrompt(e.target.value)}
          className='w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
          rows={6}
        />

        <div className="flex justify-between items-center">
          <Button
            type="submit"
            className="bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition"
            disabled={isLoading}
          >
            {isLoading ? <span className="spinner"></span> : "Submit"}
          </Button>
          <Button
            type="button"
            className="bg-gray-300 text-black p-3 rounded-lg hover:bg-gray-400 transition"
            onClick={handleClear}
          >
            Clear
          </Button>
        </div>
      </form>

      {error && <p className="mt-4 text-red-500 text-center">{error}</p>}

      {explanation && (
        <div className="mt-6 p-4 bg-gray-100 border border-gray-300 rounded-lg">
          <h2 className="text-lg font-semibold">Explanation</h2>
          <SyntaxHighlighter language="javascript" style={docco} className="mt-2">
            {explanation}
          </SyntaxHighlighter>

          <CopyToClipboard text={explanation}  onCopy={()=>setCopied(true)}>
            <Button className="mt-4 bg-green-500 text-white p-2 rounded-lg hover:bg-green-600 transition w-full">
             {copied  ? 'copied' : 'Copy to Clipboard'}
            </Button>
          </CopyToClipboard>
        </div>
      )}
    </div>
  );
};

export default ProgrammingPage;
