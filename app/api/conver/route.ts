import { convertToCoreMessages, streamText } from 'ai';
import { createOpenAI as createGroq } from '@ai-sdk/openai';

const groq = createGroq({
  baseURL: 'https://api.groq.com/openai/v1',
  apiKey: process.env.GROQ_API_KEY,
});

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { prompt } = await req.json();

  // Ensure the prompt is formatted correctly for the assistant
  const formattedPrompt = `Explain the following concept as if you were explaining it to a 10-year-old: ${prompt}`;

  const result = await streamText({
    model: groq('llama3-8b-8192'),
    system: 'You are a helpful assistant.',
    messages: convertToCoreMessages([
      { role: 'user', content: formattedPrompt }
    ]),
  });

  // Check if result has a text method instead of async iterable
  const responseText =  result.textStream; // Assuming result has a text() method

  return new Response(responseText, {
    headers: { 'Content-Type': 'text/plain' },
  });
}
