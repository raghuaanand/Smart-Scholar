import { NextRequest, NextResponse } from 'next/server';
import { generateText, tool } from 'ai';
import * as mathjs from 'mathjs';
import { z } from 'zod';
import { createOpenAI as createGroq } from '@ai-sdk/openai';

const groq = createGroq({
  baseURL: 'https://api.groq.com/openai/v1',
  apiKey: process.env.GROQ_API_KEY,
});

const toolsConfig = {
  math: tool({
    description: "Evaluate mathematical expressions. Example: '1.2 * (2 + 4.5)', '12.7 cm to inch'.",
    parameters: z.object({ expression: z.string() }),
    execute: async ({ expression }) => {
      try {
        return mathjs.evaluate(expression);
      } catch (error: any) {
        return `Error evaluating expression: ${error.message}`;
      }
    },
  }),
  physics: tool({
    description: "Solve physics problems. Example: 'force = mass * acceleration', 'E = mc^2'.",
    parameters: z.object({ expression: z.string() }),
    execute: async ({ expression }) => {
      try {
        return mathjs.evaluate(expression);
      } catch (error: any) {
        return `Error evaluating expression: ${error.message}`;
      }
    },
  }),
  chemistry: tool({
    description: "Solve chemistry problems. Example: 'moles = mass / molar_mass', 'PV = nRT'.",
    parameters: z.object({ expression: z.string() }),
    execute: async ({ expression }) => {
      try {
        return mathjs.evaluate(expression);
      } catch (error: any) {
        return `Error evaluating expression: ${error.message}`;
      }
    },
  }),
  economics: tool({
    description: "Solve economics problems. Example: 'GDP = C + I + G + (X - M)', 'profit = total revenue - total cost'.",
    parameters: z.object({ expression: z.string() }),
    execute: async ({ expression }) => {
      try {
        return mathjs.evaluate(expression);
      } catch (error: any) {
        return `Error evaluating expression: ${error.message}`;
      }
    },
  }),
};

type Subject = keyof typeof toolsConfig;

export async function POST(req: Request) {
  const { problem, subject }: { problem: string, subject: Subject } = await req.json();

  try {
    const { text: answer } = await generateText({
      model: groq('llama3-8b-8192'),
      system: `You are solving ${subject} problems. Provide a step-by-step solution and use tools when necessary.`,
      prompt: problem,
      tools: { calculate: toolsConfig[subject] },
      maxToolRoundtrips: 10,
    });

    return NextResponse.json({ answer }, { status: 200 });
  } catch (error: any) {
    console.error('Error generating answer:', error);
    return NextResponse.json({ error: 'Error generating answer' }, { status: 500 });
  }
}
