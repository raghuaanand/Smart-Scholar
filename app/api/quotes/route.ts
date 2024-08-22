
import { NextResponse } from 'next/server';

export async function GET() {
  const apiUrl = "https://zenquotes.io/api/quotes/";
  const response = await fetch(apiUrl);
  const data = await response.json();
  return NextResponse.json(data);
}
