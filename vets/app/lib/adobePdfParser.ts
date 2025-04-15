'use server';

// Import the entire module as a CommonJS module
const PDFServicesSdk = require('@adobe/pdfservices-node-sdk');
import path from 'path';
import fs from 'fs';
import os from 'os';

// Use os.tmpdir() instead of hardcoded /tmp path
const tempDir = os.tmpdir();
const credentialsPath = path.resolve(process.cwd(), 'pdfservices-api-credentials.json');

export async function extractTextFromPDF(filePath: string): Promise<string> {
  try {
    // Check if credentials file exists
    if (!fs.existsSync(credentialsPath)) {
      throw new Error(`Credentials file not found at: ${credentialsPath}`);
    }

    // Log the credentials file path for debugging
    console.log(`Using credentials file at: ${credentialsPath}`);
    
    // Use CommonJS-style access to the SDK
    const credentials = PDFServicesSdk.Credentials
      .serviceAccountCredentialsBuilder()
      .fromFile(credentialsPath)
      .build();

    const executionContext = PDFServicesSdk.ExecutionContext.create(credentials);
    const extractPDFOperation = PDFServicesSdk.ExtractPDF.Operation.createNew();

    const input = PDFServicesSdk.FileRef.createFromLocalFile(filePath);
    extractPDFOperation.setInput(input);

    const options = new PDFServicesSdk.ExtractPDF.options.ExtractPDFOptions.Builder()
      .addElementsToExtract(PDFServicesSdk.ExtractPDF.options.ExtractElementType.TEXT)
      .build();
    extractPDFOperation.setOptions(options);

    const result = await extractPDFOperation.execute(executionContext);
    const outputPath = path.join(tempDir, `extracted-result-${Date.now()}.json`);
    await result.saveAsFile(outputPath);

    const parsed = JSON.parse(fs.readFileSync(outputPath, 'utf-8'));
    const text = parsed.elements?.map((el: any) => el.Text).filter(Boolean).join(' ') || '';
    
    // Clean up the temp file
    try {
      fs.unlinkSync(outputPath);
    } catch (e) {
      console.warn('Failed to clean up temp file:', e);
    }
    
    return text;
  } catch (error) {
    console.error('PDF extraction error:', error);
    throw error;
  }
}