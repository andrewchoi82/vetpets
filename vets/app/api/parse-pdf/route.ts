import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import os from 'os';
import { extractTextFromPDF } from '@/app/lib/adobePdfParser';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get('file') as File;

  if (!file) return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  
  // Use os.tmpdir() for cross-platform compatibility
  const tempDir = os.tmpdir();
  const tempFilename = `uploaded-${Date.now()}.pdf`;
  const tempPath = path.join(tempDir, tempFilename);
  
  try {
    fs.writeFileSync(tempPath, buffer);
    console.log(`File saved to ${tempPath}`);
    
    const text = await extractTextFromPDF(tempPath);
    return NextResponse.json({ text });
  } catch (error) {
    console.error('Error processing PDF:', error);
    return NextResponse.json({ 
      error: 'Failed to parse PDF', 
      details: error instanceof Error ? error.message : String(error) 
    }, { status: 500 });
  } finally {
    // Clean up
    try {
      if (fs.existsSync(tempPath)) {
        fs.unlinkSync(tempPath);
      }
    } catch (e) {
      console.warn('Failed to clean up temp file:', e);
    }
  }
}