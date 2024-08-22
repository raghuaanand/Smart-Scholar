'use client';

import React, { useState } from 'react';
import { ScrollArea } from "@/components/ui/scroll-area"


export default function AIPage() {
  const [messages, setMessages] = useState<any>([]);
  const [input, setInput] = useState<any>('');

  const handleInputChange = (e:any) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e:any) => {
    e.preventDefault();

    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ messages: [{ role: 'user', content: input }] }),
    });

    const data = await response.json();
    if (response.ok) {
      setMessages([...messages, { id: Date.now(), role: 'user', content: input }, { id: Date.now() + 1, role: 'ai', content: data.content }]);
    } else {
      console.error('Error:', data.error);
    }

    setInput('');
  };

  return (
    <>
      
      <ScrollArea className="h-[460px] mx-4  p-4 w-full rounded-md border">
      {messages.map((message:any) => (
         
         <div key={message.id}  className='mx-5  text-black'>
         
            {message.role === 'user' ? 'User: ' : 'AI: '}
            {message.content}
          
           </div>
     
      ))}
         </ScrollArea>
      <form onSubmit={handleSubmit}>
        <div className='fixed left-1/2 -translate-x-1/2 bottom-6 w-1/2   text-md'>
          <input name="prompt" value={input} placeholder='type here' onChange={handleInputChange}   className='text-black w-1/2 mx-5 p-2 '/>
          <button type="submit">Submit</button>
        </div>
      </form>
    </>
  );
}
