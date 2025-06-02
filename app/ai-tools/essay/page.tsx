'use client';

import { useState } from "react";
import { Copy, Check, Sparkles, FileText, Download, Upload, PenTool } from "lucide-react";
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

const EssayPage: React.FC = () => {
  const [essay, setEssay] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [length, setLength] = useState('medium');
  const [thesis, setThesis] = useState('');
  const [copied, setCopied] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  const handleCopyToClipboard = async () => {
    if (essay) {
      await navigator.clipboard.writeText(essay);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const downloadEssay = (essay: string) => {
    const blob = new Blob([essay], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'essay.txt';
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
      const res = await fetch('/api/essay', {
        method: "POST",
        body: JSON.stringify({ prompt, length, thesis }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await res.json();
      setEssay(result.essay);
    } catch (error: any) {
      setError(error.message || 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setPrompt('');
    setEssay('');
    setError(null);
    setThesis('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8 pt-24 md:pt-32">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-4">
            <PenTool className="w-4 h-4" />
            AI Essay Writer
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Academic Essay Generator
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Create well-structured, engaging essays on any topic with our intelligent AI writing assistant
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Input Section */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-blue-600" />
                  Essay Requirements
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Essay Length</label>
                    <Select onValueChange={setLength} defaultValue={length}>
                      <SelectTrigger className="border-gray-200 focus:border-blue-500 focus:ring-blue-500">
                        <SelectValue placeholder="Select essay length" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Essay Length</SelectLabel>
                          <SelectItem value="short">Short (300-500 words)</SelectItem>
                          <SelectItem value="medium">Medium (600-800 words)</SelectItem>
                          <SelectItem value="long">Long (900+ words)</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Thesis Statement (Optional)</label>
                    <Input
                      value={thesis}
                      onChange={(e) => setThesis(e.target.value)}
                      placeholder="Your main argument..."
                      className="border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                      <PenTool className="w-4 h-4" />
                      Essay Topic/Prompt
                    </label>
                    <Textarea
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      placeholder="Describe your essay topic or provide the assignment prompt..."
                      className="min-h-[150px] resize-none border-gray-200 focus:border-blue-500 focus:ring-blue-500"
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
                          Writing Essay...
                        </>
                      ) : (
                        <>
                          <Upload className="w-4 h-4 mr-2" />
                          Generate Essay
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
                    Generated Essay
                  </div>
                  {essay && (
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
                        onClick={() => downloadEssay(essay)}
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
                {essay ? (
                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-6 min-h-[300px] max-h-[500px] overflow-y-auto">
                    <div className="prose prose-sm max-w-none">
                      <pre className="whitespace-pre-wrap text-gray-800 leading-relaxed font-serif">
                        {essay}
                      </pre>
                    </div>
                  </div>
                ) : (
                  <div className="bg-gray-50 rounded-lg p-6 min-h-[300px] flex items-center justify-center">
                    <p className="text-gray-500 text-center">
                      Your custom essay will appear here
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
                <PenTool className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Academic Quality</h3>
              <p className="text-gray-600 text-sm">Well-structured essays with proper formatting and citations</p>
            </div>
            <div className="text-center p-6 bg-white rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Custom Length</h3>
              <p className="text-gray-600 text-sm">Choose from different essay lengths to meet your requirements</p>
            </div>
            <div className="text-center p-6 bg-white rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Download className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Easy Export</h3>
              <p className="text-gray-600 text-sm">Download your essay or copy it for immediate use</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EssayPage;
