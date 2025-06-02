'use client';

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FileText, Copy, Check, Download, Briefcase, User, Sparkles, Zap, Target, Send } from 'lucide-react';
import { formatAIText } from '@/lib/utils';

const CoverLetter: React.FC = () => {
  const [coverLetter, setCoverLetter] = useState<string | null>('');
  const [isLoading, setIsLoading] = useState(false);
  const [jobArea, setJobArea] = useState('');
  const [role, setRole] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!jobArea || !role) {
      setError('Both fields are required.');
      return;
    }
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/letter', {
        method: "POST",
        body: JSON.stringify({ jobArea, role }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) {
        throw new Error('Failed to generate cover letter. Please try again.');
      }

      const result = await res.json();
      setCoverLetter(result.coverLetter);
    } catch (error: any) {
      setError(error.message || 'An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setJobArea('');
    setRole('');
    setCoverLetter('');
    setError(null);
  };

  const handleCopy = () => {
    if (coverLetter) {
      navigator.clipboard.writeText(coverLetter);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = () => {
    if (coverLetter) {
      const blob = new Blob([coverLetter], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'cover_letter.txt';
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8 pt-24 md:pt-32">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-4">
            <FileText className="w-4 h-4" />
            AI Cover Letter Generator
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Professional Cover Letter Writer
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Create professional, personalized cover letters instantly with AI assistance tailored to your desired role
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Chat-like Interface */}
          <Card className="border-0 shadow-lg h-[600px] flex flex-col">
            <CardHeader className="border-b bg-gradient-to-r from-blue-500 to-purple-600 text-white">
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Cover Letter Generator
              </CardTitle>
            </CardHeader>
            
            {/* Messages Area */}
            <CardContent className="flex-1 p-6 overflow-y-auto">
              {coverLetter ? (
                <div className="space-y-4">
                  {/* User Query */}
                  <div className="flex justify-end">
                    <div className="bg-blue-500 text-white p-4 rounded-lg max-w-[80%] ml-auto">
                      <div className="text-sm space-y-1">
                        <p><strong>Job Area:</strong> {jobArea}</p>
                        <p><strong>Role:</strong> {role}</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* AI Response */}
                  <div className="flex justify-start">
                    <div className="bg-gradient-to-br from-blue-50 to-purple-50 border rounded-lg p-6 max-w-[90%]">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <Sparkles className="w-5 h-5 text-purple-600" />
                          <span className="font-semibold text-gray-900">Cover Letter</span>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            onClick={handleCopy}
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
                          <Button
                            onClick={handleDownload}
                            variant="outline"
                            size="sm"
                            className="hover:bg-gray-50"
                          >
                            <Download className="w-4 h-4 mr-1" />
                            Download
                          </Button>
                        </div>
                      </div>
                      <div 
                        className="prose prose-sm max-w-none text-gray-800 leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: formatAIText(coverLetter) }}
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-gray-500">
                  <FileText className="h-12 w-12 mb-4 text-gray-300" />
                  <p>Enter your job details below to generate a cover letter</p>
                </div>
              )}
            </CardContent>

            {/* Input Form at Bottom */}
            <div className="border-t bg-gray-50/50 p-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Job Area / Industry</label>
                    <Input
                      type="text"
                      value={jobArea}
                      onChange={(e) => setJobArea(e.target.value)}
                      placeholder="e.g., Software Engineering, Marketing, Finance"
                      className="border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                      disabled={isLoading}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Specific Role</label>
                    <Input
                      type="text"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      placeholder="e.g., Frontend Developer, Sales Manager"
                      className="border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                      disabled={isLoading}
                    />
                  </div>
                </div>

                {error && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-700 text-sm">{error}</p>
                  </div>
                )}

                <div className="flex gap-2">
                  <Button
                    type="submit"
                    disabled={isLoading || !jobArea.trim() || !role.trim()}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 rounded-xl transition-all duration-300"
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Generating...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Generate Cover Letter
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
            </div>
          </Card>
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="border-0 bg-white/70 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6 text-center">
              <Sparkles className="h-8 w-8 text-yellow-500 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-800 mb-2">AI-Powered</h3>
              <p className="text-sm text-gray-600">Smart content generation tailored to your role</p>
            </CardContent>
          </Card>
          
          <Card className="border-0 bg-white/70 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6 text-center">
              <Target className="h-8 w-8 text-blue-500 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-800 mb-2">Targeted Content</h3>
              <p className="text-sm text-gray-600">Customized for specific industries and roles</p>
            </CardContent>
          </Card>
          
          <Card className="border-0 bg-white/70 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6 text-center">
              <Zap className="h-8 w-8 text-purple-500 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-800 mb-2">Instant Results</h3>
              <p className="text-sm text-gray-600">Professional letters generated in seconds</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CoverLetter;
