import { NextApiRequest, NextApiResponse } from 'next';
import { generateText } from 'ai';
import { createOpenAI as createGroq } from '@ai-sdk/openai';
import { NextResponse } from 'next/server';

const groq = createGroq({
  baseURL: 'https://api.groq.com/openai/v1',
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req: Request) {
  const { prompt } = await req.json();

  try {
    const { text: explanation } = await generateText({
      model: groq('llama3-8b-8192'),
      system: 'You are a programming tutor. Explain the following code or concept in detail.',
      prompt,
    });

    return NextResponse.json({ explanation }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Error generating explanation' }, { status: 500 });
  }
}
