declare module 'pdf-parse' {
  interface PDFMetadata {
    info: any;
    metadata: any;
  }

  interface PDFParseResult {
    numpages: number;
    numrender: number;
    info: any;
    metadata: any;
    version: string;
    text: string;
  }

  function pdf(dataBuffer: Buffer, options?: any): Promise<PDFParseResult>;

  export = pdf;
}