'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calculator, Copy, Check, Download, Sparkles, Brain, Zap } from 'lucide-react';

const MathPage: React.FC = () => {
  const [answer, setAnswer] = useState<string | null | undefined>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [problem, setProblem] = useState<string>('');
  const [subject, setSubject] = useState<string>('math'); // Default subject
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!problem.trim()) return; // Prevent empty submissions

    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/math", {
        method: "POST",
        body: JSON.stringify({ problem, subject }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await res.json();
      setAnswer(result.answer);
    } catch (error: any) {
      setError(error.message || 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = async () => {
    if (answer) {
      await navigator.clipboard.writeText(answer);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const downloadSolution = () => {
    if (answer) {
      const blob = new Blob([`Problem: ${problem}\n\nSubject: ${subject}\n\nSolution:\n${answer}`], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'math-solution.txt';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Calculator className="h-8 w-8 text-blue-600" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              AI Problem Solver
            </h1>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Get step-by-step solutions for Math, Physics, Chemistry, and Economics problems using advanced AI.
          </p>
        </div>

        {/* Main Form */}
        <Card className="shadow-xl border-0 bg-white/70 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-t-lg">
            <CardTitle className="flex items-center gap-2">
              <Calculator className="h-5 w-5" />
              Problem Solver
            </CardTitle>
            <CardDescription className="text-blue-100">
              Enter your problem and select the subject for detailed solutions
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="problem" className="text-sm font-medium text-gray-700">
                  Problem Description
                </label>
                <Textarea
                  id="problem"
                  name="problem"
                  value={problem}
                  placeholder="Describe your problem in detail. For math problems, include equations, numbers, and what you need to solve for..."
                  onChange={(e) => setProblem(e.target.value)}
                  rows={6}
                  className="resize-none"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium text-gray-700">
                  Subject
                </label>
                <Select value={subject} onValueChange={setSubject}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select subject" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="math">Mathematics</SelectItem>
                    <SelectItem value="physics">Physics</SelectItem>
                    <SelectItem value="chemistry">Chemistry</SelectItem>
                    <SelectItem value="economics">Economics</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 py-3"
                disabled={isLoading || !problem.trim()}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Solving Problem...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Brain className="h-4 w-4" />
                    Solve Problem
                  </div>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Error Display */}
        {error && (
          <Card className="border-red-200 bg-red-50">
            <CardContent className="p-4">
              <p className="text-red-600 text-center">{error}</p>
            </CardContent>
          </Card>
        )}

        {/* Solution Display */}
        {answer && (
          <Card className="shadow-xl border-0 bg-white/70 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-green-500 to-teal-600 text-white rounded-t-lg">
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Calculator className="h-5 w-5" />
                    Solution
                  </CardTitle>
                  <CardDescription className="text-green-100">
                    Step-by-step solution for your {subject} problem
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={copyToClipboard}
                    size="sm"
                    variant="secondary"
                    className="bg-white/20 hover:bg-white/30 text-white border-white/30"
                  >
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                  <Button
                    onClick={downloadSolution}
                    size="sm"
                    variant="secondary"
                    className="bg-white/20 hover:bg-white/30 text-white border-white/30"
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="bg-gray-50 border rounded-lg p-4 max-h-96 overflow-y-auto">
                <pre className="whitespace-pre-wrap text-sm leading-relaxed text-gray-800">{answer}</pre>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="border-0 bg-white/70 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6 text-center">
              <Sparkles className="h-8 w-8 text-yellow-500 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-800 mb-2">Step-by-Step</h3>
              <p className="text-sm text-gray-600">Detailed solutions with clear explanations</p>
            </CardContent>
          </Card>
          
          <Card className="border-0 bg-white/70 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6 text-center">
              <Brain className="h-8 w-8 text-purple-500 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-800 mb-2">Multi-Subject</h3>
              <p className="text-sm text-gray-600">Support for Math, Physics, Chemistry & Economics</p>
            </CardContent>
          </Card>
          
          <Card className="border-0 bg-white/70 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6 text-center">
              <Zap className="h-8 w-8 text-orange-500 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-800 mb-2">AI-Powered</h3>
              <p className="text-sm text-gray-600">Advanced algorithms for accurate solutions</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MathPage;
