"use client";

import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const StudyPlanPage = () => {
  const [subjects, setSubjects] = useState<string[]>([]);
  const [studyGoals, setStudyGoals] = useState<string>('');
  const [availableTime, setAvailableTime] = useState<string>('');
  const [deadline, setDeadline] = useState<string>('');
  const [studyPlan, setStudyPlan] = useState<string | null>(null);
  const [newSubject, setNewSubject] = useState<string>(''); 

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
    }
  };

  return (
    <div className="flex flex-col items-center mt-10 mx-4 sm:mx-8 lg:mx-16 md:mt-[130px]">
      <h1 className="text-3xl font-bold text-center mb-8">AI-Driven Study Plan Generator</h1>
      
      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col">
            <h2 className="text-xl font-semibold mb-2">Subjects</h2>
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="Add a subject"
                value={newSubject}
                onChange={(e) => setNewSubject(e.target.value)}
                className="flex-1"
              />
              <Button type="button" onClick={addSubject} className="whitespace-nowrap">
                Add
              </Button>
            </div>
            <ul className="mt-4 space-y-2">
              {subjects.map((subject, index) => (
                <li key={index} className="flex justify-between items-center bg-gray-100 p-2 rounded-md">
                  <span>{subject}</span>
                  <Button variant="destructive" onClick={() => removeSubject(index)}>
                    Remove
                  </Button>
                </li>
              ))}
            </ul>
          </div>
          
          <Textarea
            placeholder="Study Goals (e.g., daily focus, key topics...)"
            value={studyGoals}
            onChange={(e) => setStudyGoals(e.target.value)}
            required
            className="mt-4"
          />
        </div>

        <div className="flex flex-col gap-4">
          <Input
            type="number"
            placeholder="Available Study Time (hours/day)"
            value={availableTime}
            onChange={(e) => setAvailableTime(e.target.value)}
            required
          />
          <Input
            type="date"
            placeholder="Exam Deadline"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            required
          />
        </div>
      </form>

      <Button className="mt-8 px-6 py-3 text-lg" type="submit" onClick={handleSubmit}>
        Generate Study Plan
      </Button>

      {studyPlan && (
        <div className="mt-10 w-full lg:w-3/4 mx-auto p-6 bg-gray-50 border border-gray-300 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Your Study Plan</h2>
          <pre className="whitespace-pre-wrap">{studyPlan}</pre>
        </div>
      )}
    </div>
  );
};

export default StudyPlanPage;
