'use client';

import { useEffect, useState } from "react";
import { Upload, Copy, Check, Sparkles, FileText, Download, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserButton } from "@clerk/nextjs";

export default function ExplainPage() {
  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [input, setInput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [downloaded, setDownloaded] = useState(false);
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let index = -1;
    setDisplayedText("");

    const intervalId = setInterval(() => {
      if (text && index < text.length) {
        setDisplayedText((prev) => prev + text.charAt(index));
        index++;
      } else {
        clearInterval(intervalId);
      }
    }, 20); // Faster typing speed

    return () => clearInterval(intervalId);
  }, [text]);

  const handleClipboard = async () => {
    if (text) {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const downloadExplanation = (text: string) => {
    const blob = new Blob([text], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'explanation.txt';
    a.click();
    window.URL.revokeObjectURL(url);
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    setIsLoading(true);
    setError(null);
    setText('');

    try {
      const res = await fetch("/api/conver", {
        method: "POST",
        body: JSON.stringify({ prompt: input }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) {
        throw new Error("Failed to fetch explanation. Please try again later.");
      }

      const resultText = await res.text();
      setText(resultText);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred. Please try again.");
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
            <HelpCircle className="w-4 h-4" />
            AI Explanation Tool
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Concept Explainer
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Get clear, detailed explanations for any concept, topic, or question with our intelligent AI assistant
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Input Section */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-blue-600" />
                  Ask Your Question
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <Textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask anything you want to understand better..."
                    className="min-h-[200px] resize-none border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                    disabled={isLoading}
                  />
                  <Button
                    type="submit"
                    disabled={isLoading || !input.trim()}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 rounded-xl transition-all duration-300"
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Generating Explanation...
                      </>
                    ) : (
                      <>
                        <Upload className="w-4 h-4 mr-2" />
                        Get Explanation
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
                    Explanation
                  </div>
                  {text && (
                    <div className="flex gap-2">
                      <Button
                        onClick={handleClipboard}
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
                        onClick={() => downloadExplanation(text)}
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
                {error && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-700 text-sm">{error}</p>
                  </div>
                )}
                
                {text ? (
                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-6 min-h-[200px] max-h-[400px] overflow-y-auto">
                    <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">
                      {displayedText}
                      {displayedText !== text && (
                        <span className="animate-pulse">|</span>
                      )}
                    </p>
                  </div>
                ) : (
                  <div className="bg-gray-50 rounded-lg p-6 min-h-[200px] flex items-center justify-center">
                    <p className="text-gray-500 text-center">
                      Your detailed explanation will appear here
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
                <HelpCircle className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Any Topic</h3>
              <p className="text-gray-600 text-sm">Ask about any subject - from science to history to technology</p>
            </div>
            <div className="text-center p-6 bg-white rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Clear Explanations</h3>
              <p className="text-gray-600 text-sm">Get easy-to-understand explanations tailored to your level</p>
            </div>
            <div className="text-center p-6 bg-white rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Download className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Save & Share</h3>
              <p className="text-gray-600 text-sm">Download explanations or copy them for future reference</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
