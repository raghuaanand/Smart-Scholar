'use client';

import { useState } from "react";
import { Copy, Check, Sparkles, Code2, BookOpen, Send } from "lucide-react";
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatAIText } from '@/lib/utils';

const ProgrammingPage: React.FC = () => {
  const [explanation, setExplanation] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [inputMode, setInputMode] = useState('Code');
  const [copied, setCopied] = useState(false);

  const handleCopyToClipboard = async () => {
    if (explanation) {
      await navigator.clipboard.writeText(explanation);
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8 pt-24 md:pt-32">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-4">
            <Code2 className="w-4 h-4" />
            AI Programming Tutor
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Programming Code Explainer
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Get detailed explanations for code snippets and programming concepts with our intelligent AI tutor
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Chat-like Interface */}
          <Card className="border-0 shadow-lg h-[600px] flex flex-col">
            <CardHeader className="border-b bg-gradient-to-r from-blue-500 to-purple-600 text-white">
              <CardTitle className="flex items-center gap-2">
                <Code2 className="w-5 h-5" />
                Programming Code Explainer
              </CardTitle>
            </CardHeader>
            
            {/* Messages Area */}
            <CardContent className="flex-1 p-6 overflow-y-auto">
              {explanation ? (
                <div className="space-y-4">
                  {/* User Query */}
                  <div className="flex justify-end">
                    <div className="bg-blue-500 text-white p-4 rounded-lg max-w-[80%] ml-auto">
                      <div className="text-sm">
                        <p><strong>Mode:</strong> {inputMode}</p>
                        <div className="mt-2">
                          <strong>{inputMode}:</strong>
                          <pre className="mt-1 whitespace-pre-wrap text-xs font-mono bg-blue-600 p-2 rounded">
                            {prompt}
                          </pre>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* AI Response */}
                  <div className="flex justify-start">
                    <div className="bg-gradient-to-br from-blue-50 to-purple-50 border rounded-lg p-6 max-w-[90%]">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <Sparkles className="w-5 h-5 text-purple-600" />
                          <span className="font-semibold text-gray-900">Code Explanation</span>
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
                        dangerouslySetInnerHTML={{ __html: formatAIText(explanation) }}
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-gray-500">
                  <Code2 className="h-12 w-12 mb-4 text-gray-300" />
                  <p>Paste your code or describe a programming concept below</p>
                </div>
              )}
            </CardContent>

            {/* Input Form at Bottom */}
            <div className="border-t bg-gray-50/50 p-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Input Mode</label>
                  <Select onValueChange={setInputMode} defaultValue={inputMode}>
                    <SelectTrigger className="border-gray-200 focus:border-blue-500 focus:ring-blue-500">
                      <SelectValue placeholder="Select an input mode" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Input Modes</SelectLabel>
                        <SelectItem value="Code">Code Snippet</SelectItem>
                        <SelectItem value="Concept">Programming Concept</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>

                {error && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-700 text-sm">{error}</p>
                  </div>
                )}

                <div className="flex gap-2">
                  <Textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder={inputMode === 'Code' 
                      ? "Paste your code snippet here..."
                      : "Describe the programming concept you want to understand..."
                    }
                    className="flex-1 resize-none border-gray-200 focus:border-blue-500 focus:ring-blue-500 font-mono text-sm"
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
                      onClick={handleClear}
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
                <Code2 className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Code Analysis</h3>
              <p className="text-gray-600 text-sm">Detailed line-by-line explanations of your code</p>
            </div>
            <div className="text-center p-6 bg-white rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Concept Learning</h3>
              <p className="text-gray-600 text-sm">Understand programming concepts with clear examples</p>
            </div>
            <div className="text-center p-6 bg-white rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Multi-Language</h3>
              <p className="text-gray-600 text-sm">Support for all major programming languages</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgrammingPage;
