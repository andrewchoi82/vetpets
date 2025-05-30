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
                        text: "you are the best vet in the us. i want you to give me a thorough explanation of the pdf which can be images inside pdf too. format the response nicely with next lines and spacing so that if i put this in to a website div as a text, it can still look nicely.  Dont include anything that indicates you wrote it",
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
