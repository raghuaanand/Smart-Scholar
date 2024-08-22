import { NextResponse } from 'next/server';

export async function POST(req:Request) {
  const { query } = await req.json();

  // Call Groq API with the user query
  const response = await fetch('https://api.groq.com/v1/tool-use', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.GROQ_API_KE}`, // Replace with your Groq API key
    },
    body: JSON.stringify({
      model: 'llama3-groq-70b-8192-tool-use-preview', // Choose your model
      input: query,
    }),
  });

  const data = await response.json();
  return NextResponse.json(data);
}
