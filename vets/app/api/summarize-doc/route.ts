import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import FormData from 'form-data';

const OPENAI_API_KEY = process.env.OPENAI_API_KEY!;
const ASSISTANT_ID = process.env.OPENAI_ASSISTANT_ID!; // set this in your .env.local

const OPENAI_BETA_HEADER = { 'OpenAI-Beta': 'assistants=v2' };

export async function POST(req: NextRequest) {
  try {
    const { fileData } = await req.json();

    if (!fileData) {
      return NextResponse.json({ error: 'No file data provided' }, { status: 400 });
    }

    // Convert base64 data to buffer
    const base64Data = fileData.split(',')[1];
    const fileBuffer = Buffer.from(base64Data, 'base64');
    const filename = 'VetLabResult.pdf';

    // 1. Upload PDF file to OpenAI
    const formData = new FormData();
    formData.append('file', fileBuffer, {
      filename,
      contentType: 'application/pdf',
    });
    formData.append('purpose', 'assistants');

    const fileUploadRes = await axios.post('https://api.openai.com/v1/files', formData, {
      headers: {
        Authorization: `Bearer ${OPENAI_API_KEY}`,
        ...formData.getHeaders(),
        ...OPENAI_BETA_HEADER,
      },
    });

    const fileId = fileUploadRes.data.id;

    // 2. Create a new thread
    const threadRes = await axios.post(
      'https://api.openai.com/v1/threads',
      {},
      {
        headers: {
          Authorization: `Bearer ${OPENAI_API_KEY}`,
          ...OPENAI_BETA_HEADER,
        },
      }
    );

    const threadId = threadRes.data.id;

    // 3. Add user message with file to the thread
    await axios.post(
      `https://api.openai.com/v1/threads/${threadId}/messages`,
      {
        role: 'user',
        content: 'Please analyze this veterinary lab report and summarize it in plain English.',
        attachments: [{
            file_id: fileId,
            tools: [{ type: "file_search" }]
          }]
      },
      {
        headers: {
          Authorization: `Bearer ${OPENAI_API_KEY}`,
          ...OPENAI_BETA_HEADER,
        },
      }
    );


    // 4. Run the assistant on the thread
    const runRes = await axios.post(
      `https://api.openai.com/v1/threads/${threadId}/runs`,
      {
        assistant_id: ASSISTANT_ID,
      },
      {
        headers: {
          Authorization: `Bearer ${OPENAI_API_KEY}`,
          ...OPENAI_BETA_HEADER,
        },
      }
    );

    const runId = runRes.data.id;

    // 5. Poll until the run completes
    let status = 'queued';
    let output = '';
    while (status !== 'completed' && status !== 'failed') {
      const runStatus = await axios.get(`https://api.openai.com/v1/threads/${threadId}/runs/${runId}`, {
        headers: {
          Authorization: `Bearer ${OPENAI_API_KEY}`,
          ...OPENAI_BETA_HEADER,
        },
      });

      status = runStatus.data.status;
      if (status === 'completed') break;
      if (status === 'failed') throw new Error('Assistant run failed');

      await new Promise((r) => setTimeout(r, 1000));
    }

    // 6. Get the assistant's response
    const messagesRes = await axios.get(`https://api.openai.com/v1/threads/${threadId}/messages`, {
      headers: {
        Authorization: `Bearer ${OPENAI_API_KEY}`,
        ...OPENAI_BETA_HEADER,
      },
    });

    const messageContent = messagesRes.data.data[0]?.content[0]?.text?.value;
    console.log(messageContent);

    return NextResponse.json({ component: messageContent });
  } catch (error: any) {
    console.error('Error:', error.response?.data || error.message);
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}