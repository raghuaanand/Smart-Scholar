'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { BounceLoader } from 'react-spinners';


export default function AIPage() {
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim()) return; // Prevent empty submissions

    const userMessage = { id: Date.now(), role: 'user', content: input };
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessages(prevMessages => [
          ...prevMessages,
          userMessage,
          { id: Date.now() + 1, role: 'ai', content: data.content }
        ]);
      } else {
        console.error('Error:', data.error);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
      setInput('');
    }
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="fixed bottom-0 right-0 w-full max-w-md h-full sm:w-96 sm:h-96 bg-gray-100 border border-gray-300 rounded-lg shadow-lg overflow-hidden">
      <div className="flex flex-col h-full">
        <ScrollArea ref={scrollRef} className="flex-1 p-4 overflow-y-auto bg-white">
          {messages.map(message => (
            <div key={message.id} className={`my-2 p-3 rounded-lg ${message.role === 'user' ? 'bg-blue-500 text-white self-end' : 'bg-gray-200 text-gray-800 self-start'}`}>
              <strong>{message.role === 'user' ? 'You: ' : 'AI: '}</strong>
              <p>{message.content}</p>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-center my-2">
              <BounceLoader />
            </div>
          )}
        </ScrollArea>
        <form onSubmit={handleSubmit} className="p-4 flex items-center bg-gray-200 border-t border-gray-300">
          <input
            name="prompt"
            value={input}
            placeholder='Type your message...'
            onChange={handleInputChange}
            className='flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
          <button
            type="submit"
            className='ml-2 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500'
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
