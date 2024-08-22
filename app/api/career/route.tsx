import { NextApiRequest, NextApiResponse } from 'next';
import { generateText } from 'ai';
import { createOpenAI as createGroq } from '@ai-sdk/openai';
import { NextResponse } from 'next/server';

const groq = createGroq({
  baseURL: 'https://api.groq.com/openai/v1',
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req: Request) {
  const { interests, skills, academicBackground } = await req.json();

  try {
    const { text: careerAdvice } = await generateText({
      model: groq('llama3-70b-8192'),
      system: 'You are an expert career advisor. Provide a detailed and personalized career path suggestion based on the user\'s interests, skills, and academic background.',
      prompt: `Based on the following details:
              Interests: ${interests},
              Skills: ${skills},
              Academic Background: ${academicBackground},
              
              Suggest a suitable career path, including potential job roles, necessary qualifications, and steps to achieve these roles.`,
    });

    return NextResponse.json({ careerAdvice }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Error generating career advice' }, { status: 500 });
  }
}
