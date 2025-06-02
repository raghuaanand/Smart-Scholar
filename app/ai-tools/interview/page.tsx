'use client';

import { useState } from "react";
import { Copy, Check, Sparkles, Users, MessageCircle, Upload, BriefcaseIcon } from "lucide-react";
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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

          <div className="grid gap-8 lg:grid-cols-2">
            {/* Input Section */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-blue-600" />
                  Practice Question
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                      <MessageCircle className="w-4 h-4" />
                      Interview Question or Scenario
                    </label>
                    <Textarea
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      placeholder="Type your interview question or create a custom scenario..."
                      className="min-h-[150px] resize-none border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                      disabled={isLoading}
                    />
                  </div>

                  {error && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-red-700 text-sm">{error}</p>
                    </div>
                  )}

                  <Button
                    type="submit"
                    disabled={isLoading || !prompt.trim()}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 rounded-xl transition-all duration-300"
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Preparing Response...
                      </>
                    ) : (
                      <>
                        <Upload className="w-4 h-4 mr-2" />
                        Get AI Response
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Output Section */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-purple-600" />
                    AI-Generated Response
                  </div>
                  {response && (
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
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {response ? (
                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-6 min-h-[300px] max-h-[500px] overflow-y-auto">
                    <pre className="whitespace-pre-wrap text-gray-800 leading-relaxed text-sm">
                      {response}
                    </pre>
                  </div>
                ) : (
                  <div className="bg-gray-50 rounded-lg p-6 min-h-[300px] flex items-center justify-center">
                    <p className="text-gray-500 text-center">
                      Your personalized interview response will appear here
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
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
