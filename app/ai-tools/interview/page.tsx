'use client';

import { useState } from "react";
import { Copy, Check, Sparkles, Users, MessageCircle, BriefcaseIcon, Send } from "lucide-react";
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatAIText } from '@/lib/utils';

const InterviewPrep: React.FC = () => {
  const [response, setResponse] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [selectedQuestion, setSelectedQuestion] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const commonQuestions = [
    "Tell me about yourself.",
    "Why do you want to work here?",
    "What are your strengths and weaknesses?",
    "Describe a challenging situation and how you handled it.",
    "Where do you see yourself in 5 years?",
    "Why should we hire you?",
    "What motivates you?",
    "How do you handle pressure and stress?",
  ];

  const handleCopyToClipboard = async () => {
    if (response) {
      await navigator.clipboard.writeText(response);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/interview', {
        method: "POST",
        body: JSON.stringify({ prompt: selectedQuestion || prompt }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) {
        throw new Error('Failed to fetch response');
      }

      const result = await res.json();
      setResponse(result.response);
    } catch (error: any) {
      setError(error.message || 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuestionSelect = (question: string) => {
    setSelectedQuestion(question);
    setPrompt(question);
    setResponse('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8 pt-24 md:pt-32">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-4">
            <BriefcaseIcon className="w-4 h-4" />
            Interview Preparation
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            AI Interview Coach
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Practice with common interview questions and get AI-powered feedback to ace your next interview
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Common Questions Section */}
          <Card className="border-0 shadow-lg mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-blue-600" />
                Common Interview Questions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                {commonQuestions.map((question, index) => (
                  <Button
                    key={index}
                    onClick={() => handleQuestionSelect(question)}
                    variant={selectedQuestion === question ? "default" : "outline"}
                    className={`text-left h-auto p-4 text-sm ${
                      selectedQuestion === question
                        ? 'bg-blue-600 text-white'
                        : 'hover:bg-blue-50'
                    }`}
                  >
                    {question}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Chat-like Interface */}
          <Card className="border-0 shadow-lg h-[600px] flex flex-col">
            <CardHeader className="border-b bg-gradient-to-r from-blue-500 to-purple-600 text-white">
              <CardTitle className="flex items-center gap-2">
                <BriefcaseIcon className="w-5 h-5" />
                AI Interview Coach
              </CardTitle>
            </CardHeader>
            
            {/* Messages Area */}
            <CardContent className="flex-1 p-6 overflow-y-auto">
              {response ? (
                <div className="space-y-4">
                  {/* User Query */}
                  <div className="flex justify-end">
                    <div className="bg-blue-500 text-white p-4 rounded-lg max-w-[80%] ml-auto">
                      <div className="text-sm">
                        <p><strong>Question:</strong> {prompt}</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* AI Response */}
                  <div className="flex justify-start">
                    <div className="bg-gradient-to-br from-blue-50 to-purple-50 border rounded-lg p-6 max-w-[90%]">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <Sparkles className="w-5 h-5 text-purple-600" />
                          <span className="font-semibold text-gray-900">AI Response</span>
                        </div>
                        <Button
                          onClick={handleCopyToClipboard}
                          variant="outline"
                          size="sm"
                          className="hover:bg-gray-50"
                        >
                          {copied ? (
                            <>
                              <Check className="w-4 h-4 mr-1 text-green-600" />
                              Copied!
                            </>
                          ) : (
                            <>
                              <Copy className="w-4 h-4 mr-1" />
                              Copy
                            </>
                          )}
                        </Button>
                      </div>
                      <div 
                        className="prose prose-sm max-w-none text-gray-800 leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: formatAIText(response) }}
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-gray-500">
                  <BriefcaseIcon className="h-12 w-12 mb-4 text-gray-300" />
                  <p>Select a question above or ask your own interview question</p>
                </div>
              )}
            </CardContent>

            {/* Input Form at Bottom */}
            <div className="border-t bg-gray-50/50 p-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-700 text-sm">{error}</p>
                  </div>
                )}

                <div className="flex gap-2">
                  <Textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Type your interview question or create a custom scenario..."
                    className="flex-1 resize-none border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                    rows={3}
                    disabled={isLoading}
                  />
                  <div className="flex flex-col gap-2">
                    <Button
                      type="submit"
                      disabled={isLoading || !prompt.trim()}
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-6 rounded-xl transition-all duration-300"
                    >
                      {isLoading ? (
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      ) : (
                        <Send className="w-4 h-4" />
                      )}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setPrompt('');
                        setResponse('');
                        setSelectedQuestion(null);
                        setError(null);
                      }}
                      className="px-6"
                    >
                      Clear
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </Card>
        </div>

        {/* Features */}
        <div className="mt-16 max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-white rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Common Questions</h3>
              <p className="text-gray-600 text-sm">Practice with the most frequently asked interview questions</p>
            </div>
            <div className="text-center p-6 bg-white rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">AI Coaching</h3>
              <p className="text-gray-600 text-sm">Get intelligent, tailored responses to improve your answers</p>
            </div>
            <div className="text-center p-6 bg-white rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <BriefcaseIcon className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Career Ready</h3>
              <p className="text-gray-600 text-sm">Build confidence for interviews across all industries</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewPrep;
