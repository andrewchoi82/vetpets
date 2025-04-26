import { NextRequest, NextResponse } from 'next/server';
import OpenAI from "openai";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY!;
const client = new OpenAI({ apiKey: OPENAI_API_KEY });

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json()

    if(!url){
      return NextResponse.json({ error: 'No file data provided' }, { status: 400 });
    }

    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const blob = await res.blob();
    const fileObj = new File([blob], "vettrail.pdf", { type: 'application/pdf' });

    const file = await client.files.create({
        file: fileObj,
        purpose: "user_data",
    });
    
    const response = await client.responses.create({
        model: "gpt-4.1",
        input: [
            {
                role: "user",
                content: [
                    {
                        type: "input_file",
                        file_id: file.id,
                    },
                    {
                        type: "input_text",
                        text: "You are the best vet in the United States with great communication skills. Give a 3 sentence summary of the test result in pdf content thats easy to understand for non-medical people. Dont include anything that indicates you wrote it",
                    },
                ],
            },
        ],
    });
    console.log(response.output_text);

    return NextResponse.json({ summary: response.output_text });
  } catch (error: any) {
    console.error('Error:', error.response?.data || error.message);
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}
