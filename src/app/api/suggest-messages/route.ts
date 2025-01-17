import { NextResponse } from 'next/server';
import { cohere } from '@ai-sdk/cohere';
import {generateText, streamText} from 'ai';

export const runtime = 'edge';

export async function POST(req: Request) {
  try {
    const { topic } = await req.json();
    const prompt = `Create a list of three comments formatted as a single string. Each comment should be separated by '||'. these comments should be like feedbacks or confessions which we want to send to a person in a anomymous way and keep the messages a short if possible. The topic is  ${topic}`;

      const { text } = await generateText({
        model: cohere('command-r-plus'),
        prompt: prompt,
      });
       
      return NextResponse.json({ message: text });

  } catch (error) {
      console.error('An unexpected error occurred in AI:', error);
      throw error;
  }
}

