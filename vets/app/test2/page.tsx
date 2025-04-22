// app/pdf-analyzer/page.tsx
'use client';

import { useState } from 'react';
import { uploadPDF } from '@/app/lib/uploadPDF';
import { LabResultTable } from '@/components/Uploading/LabResultTable';

export default function PDFAnalyzerPage() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);

    try {
      const path = await uploadPDF(file, 'user-123'); // or use session user id

      const res = await fetch('/api/analyze-lab-result', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ path }),
      });

      const json = await res.json();
      setResults(json);
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  }

  return (
    <div className="p-6">
      <input type="file" accept="application/pdf" onChange={handleUpload} />
      {loading && <p>Analyzing...</p>}
      {results.length > 0 && <LabResultTable results={results} />}
    </div>
  );
}
