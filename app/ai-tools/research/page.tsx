'use client';

import { useState } from "react";
import { Copy, Check, Sparkles, FileText, Download, Upload, Search, BookOpen } from "lucide-react";
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

const ResearchPage: React.FC = () => {
  const [researchPaper, setResearchPaper] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [length, setLength] = useState('Medium');
  const [citationStyle, setCitationStyle] = useState('APA');
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  const handleCopyToClipboard = async () => {
    if (researchPaper) {
      await navigator.clipboard.writeText(researchPaper);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([researchPaper], { type: "text/plain;charset=utf-8" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'research-paper.txt';
    a.click();
    window.URL.revokeObjectURL(url);
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/research', {
        method: "POST",
        body: JSON.stringify({ prompt, length, citationStyle }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await res.json();
      setResearchPaper(result.researchPaper);
    } catch (error: any) {
      setError(error.message || 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8 pt-24 md:pt-32">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-4">
            <Search className="w-4 h-4" />
            AI Research Assistant
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Research Paper Writer
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Generate comprehensive research papers with proper citations and academic formatting
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Input Section */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-blue-600" />
                  Research Parameters
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Paper Length</label>
                    <Select onValueChange={setLength} defaultValue={length}>
                      <SelectTrigger className="border-gray-200 focus:border-blue-500 focus:ring-blue-500">
                        <SelectValue placeholder="Select paper length" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Paper Length</SelectLabel>
                          <SelectItem value="Short">Short (5-10 pages)</SelectItem>
                          <SelectItem value="Medium">Medium (10-20 pages)</SelectItem>
                          <SelectItem value="Long">Long (20+ pages)</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Citation Style</label>
                    <Select onValueChange={setCitationStyle} defaultValue={citationStyle}>
                      <SelectTrigger className="border-gray-200 focus:border-blue-500 focus:ring-blue-500">
                        <SelectValue placeholder="Select citation style" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Citation Styles</SelectLabel>
                          <SelectItem value="APA">APA</SelectItem>
                          <SelectItem value="MLA">MLA</SelectItem>
                          <SelectItem value="Chicago">Chicago</SelectItem>
                          <SelectItem value="Harvard">Harvard</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                      <Search className="w-4 h-4" />
                      Research Topic/Question
                    </label>
                    <Textarea
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      placeholder="Describe your research topic, question, or thesis statement..."
                      className="min-h-[200px] resize-none border-gray-200 focus:border-blue-500 focus:ring-blue-500"
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
                        Researching & Writing...
                      </>
                    ) : (
                      <>
                        <Upload className="w-4 h-4 mr-2" />
                        Generate Research Paper
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
                    Research Paper
                  </div>
                  {researchPaper && (
                    <div className="flex gap-2">
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
                      <Button
                        onClick={handleDownload}
                        variant="outline"
                        size="sm"
                        className="hover:bg-gray-50"
                      >
                        {downloaded ? (
                          <>
                            <Check className="w-4 h-4 mr-1 text-green-600" />
                            Downloaded!
                          </>
                        ) : (
                          <>
                            <Download className="w-4 h-4 mr-1" />
                            Download
                          </>
                        )}
                      </Button>
                    </div>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {researchPaper ? (
                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-6 min-h-[400px] max-h-[600px] overflow-y-auto">
                    <div className="prose prose-sm max-w-none">
                      <pre className="whitespace-pre-wrap text-gray-800 leading-relaxed font-serif text-sm">
                        {researchPaper}
                      </pre>
                    </div>
                  </div>
                ) : (
                  <div className="bg-gray-50 rounded-lg p-6 min-h-[400px] flex items-center justify-center">
                    <p className="text-gray-500 text-center">
                      Your comprehensive research paper will appear here
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
                <Search className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Research Quality</h3>
              <p className="text-gray-600 text-sm">Comprehensive research with credible sources and data</p>
            </div>
            <div className="text-center p-6 bg-white rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Proper Citations</h3>
              <p className="text-gray-600 text-sm">Automatic citations in APA, MLA, Chicago, and Harvard styles</p>
            </div>
            <div className="text-center p-6 bg-white rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <FileText className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Academic Format</h3>
              <p className="text-gray-600 text-sm">Professional formatting ready for submission</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResearchPage;
