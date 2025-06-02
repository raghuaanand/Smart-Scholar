'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageCircle, Send, Bot, User, Sparkles, Zap, MessageSquare } from 'lucide-react';
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2 mb-4">
            <MessageCircle className="h-8 w-8 text-blue-600" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              AI Chat Assistant
            </h1>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Have a conversation with our intelligent AI assistant. Ask questions, get help with problems, or just chat!
          </p>
        </div>

        {/* Chat Interface */}
        <Card className="shadow-xl border-0 bg-white/70 backdrop-blur-sm">
          <CardHeader className="border-b bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-t-lg">
            <CardTitle className="flex items-center gap-2">
              <Bot className="h-5 w-5" />
              Chat with AI
            </CardTitle>
            <CardDescription className="text-blue-100">
              Start a conversation below
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="flex flex-col h-96">
              <ScrollArea ref={scrollRef} className="flex-1 p-4">
                {messages.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-gray-500">
                    <MessageSquare className="h-12 w-12 mb-4 text-gray-300" />
                    <p>Start a conversation by typing a message below</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {messages.map(message => (
                      <div key={message.id} className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`flex gap-3 max-w-[80%] ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                            message.role === 'user' ? 'bg-blue-500' : 'bg-purple-500'
                          }`}>
                            {message.role === 'user' ? (
                              <User className="h-4 w-4 text-white" />
                            ) : (
                              <Bot className="h-4 w-4 text-white" />
                            )}
                          </div>
                          <div className={`p-3 rounded-lg ${
                            message.role === 'user' 
                              ? 'bg-blue-500 text-white' 
                              : 'bg-gray-100 text-gray-800 border'
                          }`}>
                            <p className="text-sm leading-relaxed">{message.content}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                {isLoading && (
                  <div className="flex gap-3 justify-start mt-4">
                    <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center flex-shrink-0">
                      <Bot className="h-4 w-4 text-white" />
                    </div>
                    <div className="bg-gray-100 border p-3 rounded-lg">
                      <BounceLoader size={20} color="#8b5cf6" />
                    </div>
                  </div>
                )}
              </ScrollArea>
              
              {/* Input Form */}
              <form onSubmit={handleSubmit} className="p-4 border-t bg-gray-50/50">
                <div className="flex gap-2">
                  <Input
                    name="prompt"
                    value={input}
                    placeholder="Type your message..."
                    onChange={handleInputChange}
                    className="flex-1"
                    disabled={isLoading}
                  />
                  <Button 
                    type="submit" 
                    disabled={isLoading || !input.trim()}
                    className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </form>
            </div>
          </CardContent>
        </Card>

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="border-0 bg-white/70 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6 text-center">
              <Sparkles className="h-8 w-8 text-yellow-500 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-800 mb-2">Intelligent Responses</h3>
              <p className="text-sm text-gray-600">Get smart, contextual answers to your questions</p>
            </CardContent>
          </Card>
          
          <Card className="border-0 bg-white/70 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6 text-center">
              <Zap className="h-8 w-8 text-orange-500 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-800 mb-2">Fast Processing</h3>
              <p className="text-sm text-gray-600">Quick response times for seamless conversation</p>
            </CardContent>
          </Card>
          
          <Card className="border-0 bg-white/70 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6 text-center">
              <MessageCircle className="h-8 w-8 text-green-500 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-800 mb-2">Natural Conversation</h3>
              <p className="text-sm text-gray-600">Chat naturally like you&apos;re talking to a friend</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
