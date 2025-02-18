import { AzureKeyCredential, DocumentAnalysisClient } from "@azure/ai-form-recognizer";

// Replace these with your Azure Document Intelligence endpoint and key
const endpoint = import.meta.env.VITE_AZURE_ENDPOINT;
const key = import.meta.env.VITE_AZURE_KEY;

let client: DocumentAnalysisClient | null = null;

try {
  if (endpoint && key) {
    client = new DocumentAnalysisClient(endpoint, new AzureKeyCredential(key));
  }
} catch (error) {
  console.error("Error initializing Azure client:", error);
}

export async function analyzeDocument(file: File) {
  if (!client) {
    throw new Error("Azure Document Intelligence is not configured. Please add your Azure credentials to the .env file.");
  }

  try {
    const buffer = await file.arrayBuffer();
    const poller = await client.beginAnalyzeDocument("prebuilt-read", buffer);
    const result = await poller.pollUntilDone();

    if (!result?.content) {
      throw new Error("No content found in document");
    }

    const text = result.content;
    const words = text.split(/\s+/);
    const sentences = text.split(/[.!?]+\s+/);
    const charCount = text.length;
    const charCountNoSpaces = text.replace(/\s+/g, '').length;
    const avgWordLength = words.reduce((sum, word) => sum + word.length, 0) / words.length;

    // Calculate word frequency with support for non-English characters
    const wordFrequency = words.reduce((acc: Record<string, number>, word) => {
      // Remove punctuation and special characters while preserving non-English letters
      const cleanWord = word.toLowerCase()
        .replace(/[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,\-.\/:;<=>?@\[\]^_`{|}~]/g, '')
        .trim();
      
      if (cleanWord && cleanWord.length > 1) { // Only count words with 2 or more characters
        acc[cleanWord] = (acc[cleanWord] || 0) + 1;
      }
      return acc;
    }, {});

    const sortedWords = Object.entries(wordFrequency)
      .sort(([, a], [, b]) => b - a)
      .map(([word, count]) => ({ word, count }));

    return {
      wordCount: words.length,
      charCount,
      charCountNoSpaces,
      sentenceCount: sentences.length,
      avgWordLength,
      frequentWords: sortedWords,
      rawText: text,
    };
  } catch (error) {
    console.error('Error analyzing document:', error);
    throw error;
  }
}

// Common English stop words
export const stopWords = new Set([
  'a', 'an', 'and', 'are', 'as', 'at', 'be', 'by', 'for', 'from', 'has', 'he',
  'in', 'is', 'it', 'its', 'of', 'on', 'that', 'the', 'to', 'was', 'were',
  'will', 'with'
]);