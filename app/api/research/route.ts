import { NextApiRequest, NextApiResponse } from 'next';
import { generateText } from 'ai';
import { createOpenAI as createGroq } from '@ai-sdk/openai';
import { NextResponse } from 'next/server';

const groq = createGroq({
  baseURL: 'https://api.groq.com/openai/v1',
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req: Request) {
  const { prompt, length, citationStyle } = await req.json();

  try {
    const { text: researchPaper } = await generateText({
      model: groq('llama3-8b-8192'),
      system: `You are a research paper writer. Write a detailed ${length.toLowerCase()} research paper in ${citationStyle} format based on the given prompt.`,
      prompt,
    });

    return NextResponse.json({ researchPaper }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Error generating research paper' }, { status: 500 });
  }
}
