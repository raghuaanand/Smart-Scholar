'use client';

import { useState } from "react";
import { Copy, Check, Sparkles, Code2, BookOpen, Upload } from "lucide-react";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Input Section */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code2 className="w-5 h-5 text-blue-600" />
                  Code Input
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
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

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                      {inputMode === 'Code' ? <Code2 className="w-4 h-4" /> : <BookOpen className="w-4 h-4" />}
                      {inputMode} to Explain
                    </label>
                    <Textarea
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      placeholder={inputMode === 'Code' 
                        ? "Paste your code snippet here..."
                        : "Describe the programming concept you want to understand..."
                      }
                      className="min-h-[200px] resize-none border-gray-200 focus:border-blue-500 focus:ring-blue-500 font-mono text-sm"
                      disabled={isLoading}
                    />
                  </div>

                  {error && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-red-700 text-sm">{error}</p>
                    </div>
                  )}

                  <div className="flex gap-2">
                    <Button
                      type="submit"
                      disabled={isLoading || !prompt.trim()}
                      className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 rounded-xl transition-all duration-300"
                    >
                      {isLoading ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Explaining...
                        </>
                      ) : (
                        <>
                          <Upload className="w-4 h-4 mr-2" />
                          Explain {inputMode}
                        </>
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
                </form>
              </CardContent>
            </Card>

            {/* Output Section */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-purple-600" />
                    Explanation
                  </div>
                  {explanation && (
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
                {explanation ? (
                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-6 min-h-[200px] max-h-[400px] overflow-y-auto">
                    <pre className="whitespace-pre-wrap text-gray-800 leading-relaxed text-sm">
                      {explanation}
                    </pre>
                  </div>
                ) : (
                  <div className="bg-gray-50 rounded-lg p-6 min-h-[200px] flex items-center justify-center">
                    <p className="text-gray-500 text-center">
                      Your detailed code explanation will appear here
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
