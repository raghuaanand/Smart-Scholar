import { NextApiRequest, NextApiResponse } from 'next';
import { generateText } from 'ai';
import { createOpenAI as createGroq } from '@ai-sdk/openai';
import { NextResponse } from 'next/server';

const groq = createGroq({
  baseURL: 'https://api.groq.com/openai/v1',
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req: Request) {
  const { jobArea, role } = await req.json();

  try {
    const { text: coverLetter } = await generateText({
      model: groq('llama3-8b-8192'),
      system: 'You are an expert in writing professional cover letters. Craft a personalized and compelling cover letter for a job application.',
      prompt: `Write a cover letter for a job in ${jobArea}, applying for the role of ${role}. Highlight the candidate's skills and experience relevant to the role.`,
    });

    return NextResponse.json({ coverLetter }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Error generating cover letter' }, { status: 500 });
  }
}
