'use client';

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FileText, Copy, Check, Download, Briefcase, User, Sparkles, Zap, Target } from 'lucide-react';

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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2 mb-4">
            <FileText className="h-8 w-8 text-blue-600" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Cover Letter Generator
            </h1>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Create professional, personalized cover letters instantly with AI assistance tailored to your desired role.
          </p>
        </div>

        {/* Main Form */}
        <Card className="shadow-xl border-0 bg-white/70 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-t-lg">
            <CardTitle className="flex items-center gap-2">
              <Briefcase className="h-5 w-5" />
              Job Information
            </CardTitle>
            <CardDescription className="text-blue-100">
              Provide details about the position you&apos;re applying for
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="jobArea" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <Briefcase className="h-4 w-4" />
                    Job Area / Industry
                  </label>
                  <Input
                    type="text"
                    id="jobArea"
                    name="jobArea"
                    value={jobArea}
                    placeholder="e.g., Software Engineering, Marketing, Finance"
                    onChange={(e) => setJobArea(e.target.value)}
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="role" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Specific Role
                  </label>
                  <Input
                    type="text"
                    id="role"
                    name="role"
                    value={role}
                    placeholder="e.g., Frontend Developer, Sales Manager"
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full"
                  />
                </div>
              </div>

              <div className="flex gap-4">
                <Button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 py-3"
                  disabled={isLoading || !jobArea.trim() || !role.trim()}
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Generating...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      Generate Cover Letter
                    </div>
                  )}
                </Button>
                
                <Button
                  type="button"
                  onClick={handleClear}
                  variant="outline"
                  className="px-6"
                >
                  Clear
                </Button>
              </div>
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

        {/* Generated Cover Letter */}
        {coverLetter && (
          <Card className="shadow-xl border-0 bg-white/70 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-green-500 to-teal-600 text-white rounded-t-lg">
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Your Cover Letter
                  </CardTitle>
                  <CardDescription className="text-green-100">
                    Professional cover letter for {role} position
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={handleCopy}
                    size="sm"
                    variant="secondary"
                    className="bg-white/20 hover:bg-white/30 text-white border-white/30"
                  >
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                  <Button
                    onClick={handleDownload}
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
                <pre className="whitespace-pre-wrap text-sm leading-relaxed text-gray-800 font-sans">{coverLetter}</pre>
              </div>
            </CardContent>
          </Card>
        )}

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
