"use client";

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, Clock, Target, BookOpen, Plus, X, Download, Copy, Check, Sparkles, Brain, CalendarDays } from 'lucide-react';

const StudyPlanPage = () => {
  const [subjects, setSubjects] = useState<string[]>([]);
  const [studyGoals, setStudyGoals] = useState<string>('');
  const [availableTime, setAvailableTime] = useState<string>('');
  const [deadline, setDeadline] = useState<string>('');
  const [studyPlan, setStudyPlan] = useState<string | null>(null);
  const [newSubject, setNewSubject] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false); 

  // Add a subject to the list
  const addSubject = () => {
    if (newSubject.trim()) {
      setSubjects([...subjects, newSubject.trim()]);
      setNewSubject(''); 
    }
  };

  // Remove a subject from the list
  const removeSubject = (index: number) => {
    setSubjects(subjects.filter((_, i) => i !== index));
  };

  // Handle the form submission and generate the study plan
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch('/api/plan', {
        method: 'POST',
        body: JSON.stringify({
          subjects,
          studyGoals,
          availableTime,
          deadline,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) {
        throw new Error('Failed to fetch response');
      }

      const result = await res.json();
      setStudyPlan(result.schedule);
    } catch (error) {
      console.error('Failed to generate study plan:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = async () => {
    if (studyPlan) {
      await navigator.clipboard.writeText(studyPlan);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const downloadPlan = () => {
    if (studyPlan) {
      const blob = new Blob([studyPlan], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'study-plan.txt';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2 mb-4">
            <CalendarDays className="h-8 w-8 text-blue-600" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              AI Study Plan Generator
            </h1>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Create personalized study schedules tailored to your subjects, goals, and timeline with AI assistance.
          </p>
        </div>

        {/* Main Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Left Column - Subjects & Goals */}
            <Card className="shadow-xl border-0 bg-white/70 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-t-lg">
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Subjects & Goals
                </CardTitle>
                <CardDescription className="text-blue-100">
                  Add your subjects and define your study objectives
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                {/* Subject Management */}
                <div className="space-y-4">
                  <label className="text-sm font-medium text-gray-700">Subjects to Study</label>
                  <div className="flex gap-2">
                    <Input
                      type="text"
                      placeholder="Add a subject (e.g., Mathematics, Physics)"
                      value={newSubject}
                      onChange={(e) => setNewSubject(e.target.value)}
                      className="flex-1"
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSubject())}
                    />
                    <Button 
                      type="button" 
                      onClick={addSubject} 
                      size="sm"
                      className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  {subjects.length > 0 && (
                    <div className="space-y-2 max-h-40 overflow-y-auto">
                      {subjects.map((subject, index) => (
                        <div key={index} className="flex justify-between items-center bg-gray-50 p-3 rounded-lg border">
                          <span className="font-medium text-gray-700">{subject}</span>
                          <Button 
                            type="button"
                            variant="destructive" 
                            size="sm"
                            onClick={() => removeSubject(index)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                
                {/* Study Goals */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <Target className="h-4 w-4" />
                    Study Goals & Focus Areas
                  </label>
                  <Textarea
                    placeholder="Describe your study goals, key topics to focus on, learning objectives, or specific areas you want to improve..."
                    value={studyGoals}
                    onChange={(e) => setStudyGoals(e.target.value)}
                    required
                    rows={4}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Right Column - Time & Schedule */}
            <Card className="shadow-xl border-0 bg-white/70 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-t-lg">
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Time & Schedule
                </CardTitle>
                <CardDescription className="text-purple-100">
                  Set your availability and deadlines
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Available Study Time (hours per day)
                  </label>
                  <Input
                    type="number"
                    placeholder="e.g., 4"
                    value={availableTime}
                    onChange={(e) => setAvailableTime(e.target.value)}
                    required
                    min="1"
                    max="24"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Target Deadline
                  </label>
                  <Input
                    type="date"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                    required
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 py-3"
                  disabled={isLoading || subjects.length === 0}
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Generating Plan...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Brain className="h-4 w-4" />
                      Generate Study Plan
                    </div>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>
        </form>

        {/* Generated Study Plan */}
        {studyPlan && (
          <Card className="shadow-xl border-0 bg-white/70 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-green-500 to-teal-600 text-white rounded-t-lg">
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <CalendarDays className="h-5 w-5" />
                    Your Personalized Study Plan
                  </CardTitle>
                  <CardDescription className="text-green-100">
                    AI-generated schedule based on your preferences
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
                    onClick={downloadPlan}
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
                <pre className="whitespace-pre-wrap text-sm leading-relaxed text-gray-800">{studyPlan}</pre>
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
              <p className="text-sm text-gray-600">Smart algorithms create optimal study schedules</p>
            </CardContent>
          </Card>
          
          <Card className="border-0 bg-white/70 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6 text-center">
              <Target className="h-8 w-8 text-blue-500 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-800 mb-2">Goal-Oriented</h3>
              <p className="text-sm text-gray-600">Plans tailored to your specific objectives</p>
            </CardContent>
          </Card>
          
          <Card className="border-0 bg-white/70 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6 text-center">
              <Clock className="h-8 w-8 text-green-500 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-800 mb-2">Time-Optimized</h3>
              <p className="text-sm text-gray-600">Efficient scheduling based on your availability</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default StudyPlanPage;
