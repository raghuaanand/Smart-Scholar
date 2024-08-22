'use client';

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import { ScrollArea } from "./ui/scroll-area";

export function Chatz() {
  const [messages, setMessages] = useState<any>([]);
  const [input, setInput] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: any) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages: [{ role: 'user', content: input }] }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Something went wrong');
      }

      const data = await response.json();
      setMessages([...messages, { id: Date.now(), role: 'user', content: input }, { id: Date.now() + 1, role: 'ai', content: data.content }]);
      setInput('');
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="fixed bottom-0 bg-blue-400 w-[100px] font-semibold right-0 mb-9 mr-7"
        >
          Chat
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[400px] p-4">
        <div className="grid gap-4">
          <ScrollArea className="h-[350px] mx-1 p-1 w-full rounded-md border">
            {messages.map((message: any) => (
              <div key={message.id} className="my-4 border rounded-sm p-2 text-black">
                <strong>{message.role === 'user' ? 'User: ' : 'AI: '}</strong>
                {message.content}
              </div>
            ))}
          </ScrollArea>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <form onSubmit={handleSubmit}>
            <div className="flex items-center justify-between">
              <input
                name="prompt"
                value={input}
                placeholder="Type here..."
                onChange={handleInputChange}
                className="text-black w-full p-2 border rounded-md"
                aria-label="Chat input"
              />
              <Button type="submit" className="ml-2">
                Submit
              </Button>
            </div>
          </form>
        </div>
      </PopoverContent>
    </Popover>
  );
}
