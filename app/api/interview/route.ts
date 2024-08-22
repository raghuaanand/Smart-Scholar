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
    const { text: response } = await generateText({
      model: groq('llama3-8b-8192'),
      system: `You are an interview coach. Help the user prepare for interviews by providing detailed answers, explanations, and tips based on the given prompt. Focus on being logical, reasonable, and accurate.`,
      prompt,
    });

    return NextResponse.json({ response }, { status: 200 });
  } catch (error) {
    console.error('Error generating interview preparation response:', error);
    return NextResponse.json({ error: 'Error generating interview preparation response' }, { status: 500 });
  }
}
