import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

const OPENAI_API_KEY = process.env.OPENAI_API_KEY!;

export async function POST(req: NextRequest) {
  try {
    const { fileData } = await req.json();

    if (!fileData) {
      return NextResponse.json({ error: 'No file data provided' }, { status: 400 });
    }

    // Extract the base64 data
    const base64Data = fileData.split(',')[1];
    
    // Use GPT-4 Vision to analyze the image-based PDF
    const gptResponse = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4-vision-preview',
        messages: [
          {
            role: 'system',
            content: 'You are a helpful veterinary assistant analyzing lab results. Create a concise summary of the lab report, highlighting key findings, abnormal values, and their potential implications for the pet\'s health.'
          },
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: 'This is a veterinary lab report. Please provide a summary of the key findings and their significance.'
              },
              {
                type: 'image_url',
                image_url: {
                  url: `data:application/pdf;base64,${base64Data}`
                }
              }
            ]
          }
        ],
        max_tokens: 4000
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${OPENAI_API_KEY}`
        }
      }
    );

    const summary = gptResponse.data.choices[0].message.content;
    console.log("Lab report summary:", summary);
    
    return NextResponse.json({ summary });
  } catch (error: any) {
    console.error('Error:', error.response?.data || error.message);
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}