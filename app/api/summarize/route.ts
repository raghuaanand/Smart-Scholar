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
    const { text: summary } = await generateText({
      model: groq('llama3-8b-8192'),
      system: 'You are a summarizer. Summarize the given text concisely.',
      prompt,
    });

    return NextResponse.json({ summary }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Error generating summary' }, { status: 500 });
  }
}
