'use client';

import { useState } from 'react';
import 'filepond/dist/filepond.min.css';

export default function FileUploader({ onResult }: { onResult: (res: string) => void }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [url, setUrl] = useState("https://xyjhjcgojsrwopmwxmiy.supabase.co/storage/v1/object/public/files//VetIDEXXExam");

  const handleAnalyze = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const formData = new FormData();
      formData.append('url', url);

      const res = await fetch('/api/summarize-doc', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to analyze document');
      }

      const data = await res.json();
      onResult(data.html || '');
    } catch (err) {
      console.error('Error analyzing document:', err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      onResult('<p class="text-red-500">Error analyzing document. Please try again.</p>');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg text-center bg-gray-50">
        <p className="mb-2">Using file from Supabase:</p>
        <p className="text-sm text-gray-600 break-all">{url}</p>
      </div>
      {error && (
        <div className="mt-2 p-2 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}
      <button 
        onClick={handleAnalyze}
        disabled={loading}
        className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md disabled:bg-blue-300 transition duration-200"
      >
        {loading ? 'Analyzing...' : 'Analyze Document'}
      </button>
    </div>
  );
}
