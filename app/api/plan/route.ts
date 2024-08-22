import { NextApiRequest, NextApiResponse } from 'next';
import { createOpenAI as createGroq } from '@ai-sdk/openai';
import { NextResponse } from 'next/server';
import { generateText } from 'ai';

const groq = createGroq({
  baseURL: 'https://api.groq.com/openai/v1',
  apiKey: process.env.GROQ_API_KEY,
});

interface StudyPlanRequest {
  studyGoals: string;
  availableTime: number; // in hours per day
  deadline: string; // ISO date string
  subjects: string[];
}

interface StudyPlanResponse {
  schedule: string;
  tips: string;
}

export async function POST(req: Request) {
  const { studyGoals, availableTime, deadline, subjects }: StudyPlanRequest = await req.json();

  // Calculate days left until the deadline
  const today = new Date();
  const examDate = new Date(deadline);
  const daysUntilDeadline = Math.max(Math.floor((examDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)), 0);

  // Create a detailed system prompt for Groq AI
  const systemPrompt = `
    You are an AI-driven student coach. Help the student prepare for an upcoming exam on the given deadline.
    - Deadline: ${deadline} (${daysUntilDeadline} days from now)
    - Available study time per day: ${availableTime} hours
    - Subjects to cover: ${subjects.join(', ')}
    - Study Goals: ${studyGoals}
    
    Please create a detailed study plan that allocates time to each subject logically based on the available days and hours.
    The plan should be result-oriented, ensuring that the student can cover all necessary material before the deadline.
    Provide a daily or weekly schedule and include tips for efficient studying. Focus on key topics, prioritizing more challenging areas, and include breaks to avoid burnout.
  `;

  try {
    const { text: response } = await generateText({
      model: groq('llama3-70b-8192'),
      system: systemPrompt,
      prompt: `Create a study schedule and include tips for the student's success.`,
    });

    let parsedResponse;
    try {
      parsedResponse = JSON.parse(response);
    } catch (jsonError) {
      // If response is not JSON, treat it as plain text
      parsedResponse = { schedule: response, tips: "No additional tips provided" };
    }

    return NextResponse.json(parsedResponse,{ status: 200 });
  } catch (error) {
    console.error('Error generating study plan response:', error);
    return NextResponse.json({ error: 'Failed to generate study plan' },{ status: 500 });
  }
}
