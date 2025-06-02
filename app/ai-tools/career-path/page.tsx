'use client';

import { useState } from 'react';
import { MapPin, User, GraduationCap, Copy, Check, Sparkles, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

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
          {/* Input Form */}
          <Card className="border-0 shadow-lg mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5 text-blue-600" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-6 md:grid-cols-3">
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

              <Button
                onClick={handleGenerateCareerPath}
                disabled={isLoading || !interests || !skills || !academicBackground}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 rounded-xl transition-all duration-300"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Generating Career Path...
                  </>
                ) : (
                  <>
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Generate Career Path
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Results */}
          {careerAdvice && (
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-purple-600" />
                    Your Career Path Recommendation
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
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-6">
                  <pre className="whitespace-pre-wrap text-gray-800 leading-relaxed text-sm md:text-base">
                    {careerAdvice}
                  </pre>
                </div>
              </CardContent>
            </Card>
          )}
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
