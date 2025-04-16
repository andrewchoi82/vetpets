// app/lib/adobePdfParser.ts
'use server';

const { ServicePrincipalCredentials } = require('@adobe/pdfservices-node-sdk');
const PDFServicesSdk = require('@adobe/pdfservices-node-sdk');
import path from 'path';
import fs from 'fs';
import os from 'os';

// Use os.tmpdir() instead of hardcoded /tmp path
const tempDir = os.tmpdir();

export async function extractTextFromPDF(filePath: string): Promise<string> {
  try {
    // Check if environment variables are set
    if (!process.env.PDF_SERVICES_CLIENT_ID) {
      throw new Error('PDF_SERVICES_CLIENT_ID environment variable is not set');
    }
    
    if (!process.env.PDF_SERVICES_CLIENT_SECRET) {
      throw new Error('PDF_SERVICES_CLIENT_SECRET environment variable is not set');
    }
    
    console.log('Client ID:', process.env.PDF_SERVICES_CLIENT_ID?.substring(0, 5) + '...');
    
    // Initial setup, create credentials instance
    const credentials =  PDFServicesSdk.Credentials
    .servicePrincipalCredentialsBuilder()
    .withClientId(process.env.PDF_SERVICES_CLIENT_ID)
    .withClientSecret(process.env.PDF_SERVICES_CLIENT_SECRET)
    .build();


    // Create an ExecutionContext using credentials
    const executionContext = PDFServicesSdk.ExecutionContext.create(credentials);
    
    // Create a new operation instance
    const extractPDFOperation = PDFServicesSdk.ExtractPDF.Operation.createNew();
    
    // Set operation input from a source file
    const input = PDFServicesSdk.FileRef.createFromLocalFile(filePath);
    extractPDFOperation.setInput(input);
    
    // Build ExtractPDF options and set them into the operation
    const options = new PDFServicesSdk.ExtractPDF.options.ExtractPDFOptions.Builder()
      .addElementsToExtract(PDFServicesSdk.ExtractPDF.options.ExtractElementType.TEXT)
      .build();
    extractPDFOperation.setOptions(options);

      // Define output path for the extracted file
      const outputPath = path.join(tempDir, `extracted-result-${Date.now()}.json`);
      
      await extractPDFOperation.execute(executionContext)
        .then((result: { saveAsFile: (path: string) => Promise<void> }) => result.saveAsFile(outputPath))
        .then(() => {
          console.log('Export Done');
        })
        .catch((err: Error) => {
          console.log('Exception encountered while executing operation', err);
        });

    // Execute the operation and get the result
    // const result = await extractPDFOperation.execute(executionContext);
    
    // // Save the result to a temporary file
    // const outputPath = path.join(tempDir, `extracted-result-${Date.now()}.json`);
    // await result.saveAsFile(outputPath);
    
    // // Parse the result
    // const parsed = JSON.parse(fs.readFileSync(outputPath, 'utf-8'));
    // const text = parsed.elements?.map((el: any) => el.Text).filter(Boolean).join(' ') || '';
    
    // // Clean up the temp file
         const parsed = JSON.parse(fs.readFileSync(outputPath, 'utf-8'));
     const text = parsed.elements?.map((el: any) => el.Text).filter(Boolean).join(' ') || '';
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