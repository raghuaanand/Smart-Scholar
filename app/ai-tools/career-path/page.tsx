'use client';

import { useState } from 'react';
import { MapPin, User, GraduationCap, Copy, Check, Sparkles, TrendingUp, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatAIText } from '@/lib/utils';

const CareerPathAdvisor = () => {
  const [interests, setInterests] = useState('');
  const [skills, setSkills] = useState('');
  const [academicBackground, setAcademicBackground] = useState('');
  const [careerAdvice, setCareerAdvice] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const handleCopyToClipboard = async () => {
    if (careerAdvice) {
      await navigator.clipboard.writeText(careerAdvice);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleGenerateCareerPath = async () => {
    if (!interests || !skills || !academicBackground) {
      setError('Please fill in all fields');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/career', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ interests, skills, academicBackground }),
      });

      const data = await response.json();
      if (response.ok) {
        setCareerAdvice(data.careerAdvice);
      } else {
        setError(data.error || 'Something went wrong');
      }
    } catch (error) {
      setError('Error generating career advice');
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
            <TrendingUp className="w-4 h-4" />
            AI Career Advisor
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Career Path Advisor
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover your ideal career path with personalized AI recommendations based on your interests, skills, and background
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Chat-like Interface */}
          <Card className="border-0 shadow-lg h-[600px] flex flex-col">
            <CardHeader className="border-b bg-gradient-to-r from-blue-500 to-purple-600 text-white">
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Career Path Assistant
              </CardTitle>
            </CardHeader>
            
            {/* Messages Area */}
            <CardContent className="flex-1 p-6 overflow-y-auto">
              {careerAdvice ? (
                <div className="space-y-4">
                  {/* User Query */}
                  <div className="flex justify-end">
                    <div className="bg-blue-500 text-white p-4 rounded-lg max-w-[80%] ml-auto">
                      <div className="text-sm space-y-1">
                        <p><strong>Interests:</strong> {interests}</p>
                        <p><strong>Skills:</strong> {skills}</p>
                        <p><strong>Background:</strong> {academicBackground}</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* AI Response */}
                  <div className="flex justify-start">
                    <div className="bg-gradient-to-br from-blue-50 to-purple-50 border rounded-lg p-6 max-w-[90%]">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <TrendingUp className="w-5 h-5 text-purple-600" />
                          <span className="font-semibold text-gray-900">Your Career Path Recommendation</span>
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
                        dangerouslySetInnerHTML={{ __html: formatAIText(careerAdvice) }}
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-gray-500">
                  <TrendingUp className="h-12 w-12 mb-4 text-gray-300" />
                  <p>Fill in your information below to get personalized career advice</p>
                </div>
              )}
            </CardContent>

            {/* Input Form at Bottom */}
            <div className="border-t bg-gray-50/50 p-6">
              <form onSubmit={(e) => { e.preventDefault(); handleGenerateCareerPath(); }} className="space-y-4">
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                      <MapPin className="w-4 h-4" />
                      Interests
                    </label>
                    <Input
                      type="text"
                      value={interests}
                      onChange={(e) => setInterests(e.target.value)}
                      placeholder="e.g., Technology, Design, Management"
                      className="border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                      <Sparkles className="w-4 h-4" />
                      Skills
                    </label>
                    <Input
                      type="text"
                      value={skills}
                      onChange={(e) => setSkills(e.target.value)}
                      placeholder="e.g., Coding, Problem-solving, Leadership"
                      className="border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                      <GraduationCap className="w-4 h-4" />
                      Academic Background
                    </label>
                    <Input
                      type="text"
                      value={academicBackground}
                      onChange={(e) => setAcademicBackground(e.target.value)}
                      placeholder="e.g., Computer Science, Business"
                      className="border-gray-200 focus:border-blue-500 focus:ring-blue-500"
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
                    disabled={isLoading || !interests || !skills || !academicBackground}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 rounded-xl transition-all duration-300"
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Generating Career Path...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Get Career Advice
                      </>
                    )}
                  </Button>
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
                <User className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Personalized Analysis</h3>
              <p className="text-gray-600 text-sm">Tailored recommendations based on your unique profile</p>
            </div>
            <div className="text-center p-6 bg-white rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Growth Opportunities</h3>
              <p className="text-gray-600 text-sm">Discover paths for career advancement and skill development</p>
            </div>
            <div className="text-center p-6 bg-white rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <GraduationCap className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Industry Insights</h3>
              <p className="text-gray-600 text-sm">Get insights into market trends and job opportunities</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareerPathAdvisor;
