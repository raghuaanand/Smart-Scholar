'use client';

import { useState } from "react";
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
import CopyToClipboard from "react-copy-to-clipboard";


const EssayPage: React.FC = () => {
  const [essay, setEssay] = useState<string | null | undefined>('');
  const [isLoading, setIsLoading] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [error, setError] = useState<any>(null);
  const [length, setLength] = useState('medium');
  const [thesis, setThesis] = useState('');
  const [copied, setCopied]  = useState(false)

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/essay', {
        method: "POST",
        body: JSON.stringify({ prompt, length, thesis }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await res.json();
      setEssay(result.essay);
    } catch (error: any) {
      setError(error.message || 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

   const handleCopy=(essay:any)=>{

    navigator.clipboard.writeText(essay)
    setCopied(true)
    setTimeout(() => {
      setCopied(false)
    }, 2000);

   }

  const handleClear = () => {
    setPrompt('');
    setEssay('');
    setError(null);
    setThesis('');
  };

  return (
    <div className="mt-20 px-4 mx-auto max-w-screen-sm sm:px-6 lg:max-w-screen-md">
      <h1 className="text-3xl font-bold my-6 text-center">AI Essay Writer</h1>
      
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-full">
        <div className="mb-4">
          <label htmlFor="inputMode" className="block text-lg font-medium mb-2">Essay Length</label>
          <Select onValueChange={setLength} defaultValue={length}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select an input mode" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>essay length</SelectLabel>
                <SelectItem value="short">Short</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="long">Long</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="mb-4">
          <label htmlFor="thesis" className="block text-lg font-medium mb-2">Thesis Statement (Optional)</label>
          <Input
            id="thesis"
            name="thesis"
            value={thesis}
            placeholder="Provide a thesis statement if any"
            onChange={(e) => setThesis(e.target.value)}
            className='w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
        </div>

        <label htmlFor="prompt" className="block text-lg font-medium mb-2">Essay Prompt</label>
        <Textarea
          id="prompt"
          name="prompt"
          value={prompt}
          placeholder="Type the essay prompt here"
          onChange={(e) => setPrompt(e.target.value)}
          className='w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
          rows={4}
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
      {essay && (
        <div className="mt-6 p-4 bg-gray-100 border border-gray-300 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold">Generated Essay</h2>
          <p className="mt-2 whitespace-pre-wrap">{essay}</p>


          <CopyToClipboard text={essay}    onCopy={()=>handleCopy(essay)}>
          <Button
            className="mt-4 bg-green-500 text-white p-2 rounded-lg hover:bg-green-600 transition w-full"
          
          >
            {copied ? 'copied' : 'Copy to Clipboard'}
          </Button>
          </CopyToClipboard>

          <Button
            className="mt-4 bg-gray-500 text-white p-2 rounded-lg hover:bg-gray-600 transition w-full"
            onClick={() => downloadEssay(essay)}
          >
            Download Essay
          </Button>
        </div>
      )}
    </div>
  );
};

export default EssayPage;

const downloadEssay = (essay:any) => {
  const blob = new Blob([essay], { type: 'text/plain' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'essay.txt';
  a.click();
  window.URL.revokeObjectURL(url);
};
