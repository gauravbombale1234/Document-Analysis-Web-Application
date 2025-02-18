import React, { useState, useCallback } from 'react';
import { FileUpload } from './components/FileUpload';
import { Statistics } from './components/Statistics';
import { WordFrequency } from './components/WordFrequency';
import { FileText } from 'lucide-react';
import { analyzeDocument } from './lib/azure';

// Interface to define the structure of the analysis result
interface AnalysisResult {
  wordCount: number;
  charCount: number;
  charCountNoSpaces: number;
  sentenceCount: number;
  avgWordLength: number;
  frequentWords: Array<{ word: string; count: number }>;
  rawText: string;
}

function App() {
  // State to store selected file
  const [file, setFile] = useState<File | null>(null);
  // State to manage processing state
  const [isProcessing, setIsProcessing] = useState(false);
  // State to store any error messages
  const [error, setError] = useState<string | null>(null);
  // State to store the analysis results
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);

  // Function to handle file selection and analysis
  const handleFileSelect = useCallback(async (selectedFile: File) => {
    setFile(selectedFile); // Store selected file
    setIsProcessing(true); // Indicate processing state
    setError(null); // Clear any previous errors

    try {
      const result = await analyzeDocument(selectedFile); // Call function to analyze document
      setAnalysis(result); // Store analysis result
    } catch (err) {
      // Handle any errors during analysis
      setError(err instanceof Error ? err.message : 'An error occurred while processing the document');
    } finally {
      setIsProcessing(false); // Reset processing state
    }
  }, []);

  return (
    <div className="min-h-screen bg-blue-50 text-gray-900">
      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Header Section */}
        <header className="mb-8">
          <div className="flex items-center gap-3">
            <FileText className="w-10 h-10 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-800">Document Analysis</h1>
          </div>
          <p className="mt-2 text-gray-700">
            Upload a PDF document to analyze its content and get detailed text statistics.
          </p>
        </header>

        {/* Main Content Section */}
        <main className="space-y-8">
          {/* File Upload Component */}
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <FileUpload onFileSelect={handleFileSelect} isDisabled={isProcessing} />
            {file && (
              <p className="mt-2 text-gray-600 text-sm">
                Selected file: <span className="font-medium text-gray-800">{file.name}</span>
              </p>
            )}
          </div>

          {/* Error Message Display */}
          {error && (
            <div className="bg-red-100 border border-red-300 text-red-700 rounded-lg p-4">
              {error}
              <button
                onClick={() => setError(null)}
                className="ml-4 px-3 py-1 bg-red-500 text-white rounded-md text-sm"
              >
                Dismiss
              </button>
            </div>
          )}

          {/* Processing Loader */}
          {isProcessing && (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-700">Processing your document...</p>
            </div>
          )}

          {/* Display Analysis Results */}
          {!isProcessing && analysis && (
            <>
              {/* Document Statistics Section */}
              <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Document Statistics</h2>
                <Statistics stats={analysis} />
              </div>

              {/* Word Frequency Section */}
              <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Word Frequency</h2>
                <WordFrequency words={analysis.frequentWords} />
              </div>

              {/* Extracted Text Section */}
              <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Extracted Text</h2>
                <div className="max-h-96 overflow-y-auto border border-gray-300 rounded-lg bg-gray-100 p-4">
                  <pre className="whitespace-pre-wrap font-mono text-sm text-gray-800">
                    {analysis.rawText}
                  </pre>
                </div>
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
