// src/services/codeNarrator.ts
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const API_URL = 'https://openrouter.ai/api/v1/chat/completions';

if (!OPENROUTER_API_KEY) {
  console.error('❌ OPENROUTER_API_KEY is not defined in environment variables.');
  process.exit(1);
}

export async function explainCode(code: string, language: string): Promise<string> {
  try {
    const messages = [
      {
        role: 'system',
        content: `You are CodeNarrator, an expert AI that explains ${language} code clearly and line by line.`,
      },
      {
        role: 'user',
        content: `Explain this ${language} code:\n\n${code}`,
      },
    ];

    const response = await axios.post(
      API_URL,
      {
        model: 'mistralai/mistral-7b-instruct', // Or try 'openai/gpt-3.5-turbo' if allowed on OpenRouter
        messages,
        temperature: 0.4,
      },
      {
        headers: {
          Authorization: `Bearer ${OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'http://localhost:3000', // Optional: your site or localhost
          'X-Title': 'CodeNarratorAI',              // Optional: a name for the app
        },
      }
    );

    return response.data.choices[0].message.content;
  } catch (error: any) {
    console.error('🛑 Error explaining code:', error.response?.data || error.message);
    throw new Error('Failed to explain code');
  }
}
