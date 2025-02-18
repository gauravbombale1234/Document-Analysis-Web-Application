import React, { useState } from 'react';
import { ToggleLeft, ToggleRight } from 'lucide-react';
import { stopWords } from '../lib/azure';

interface WordFrequencyProps {
  words: Array<{ word: string; count: number }>;
}

export function WordFrequency({ words }: WordFrequencyProps) {
  // State to toggle exclusion of common stop words
  const [excludeStopWords, setExcludeStopWords] = useState(true);

  // Filter words: Exclude stop words only if they are fully in English
  const filteredWords = excludeStopWords
    ? words
        .filter(({ word }) => {
          const hasNonEnglish = /[^\u0000-\u007F]/.test(word); // Check if the word contains non-English characters
          return hasNonEnglish || !stopWords.has(word.toLowerCase()); // Exclude if it's in the stop words list
        })
        .slice(0, 20) // Limit to top 20 words
    : words.slice(0, 20); // If stop word exclusion is off, return the first 20 words as is

  // If no words are provided, return nothing
  if (words.length === 0) {
    return null;
  }

  return (
    <div className="space-y-6 p-6 bg-gray-50 rounded-lg shadow-md">
      {/* Header Section with Title and Toggle Button */}
      <div className="flex items-center justify-between border-b pb-4">
        <h3 className="text-lg font-semibold text-gray-800">📖 Most Frequent Words</h3>
        <button
          onClick={() => setExcludeStopWords(!excludeStopWords)} // Toggle stop words exclusion
          className="flex items-center gap-2 text-sm text-gray-700 hover:text-gray-900 transition-all"
        >
          {excludeStopWords ? (
            <ToggleRight className="w-5 h-5 text-blue-500" /> // Active toggle icon
          ) : (
            <ToggleLeft className="w-5 h-5 text-gray-500" /> // Inactive toggle icon
          )}
          Exclude Common Words
        </button>
      </div>

      {/* Display the filtered word list in a responsive grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {filteredWords.map(({ word, count }) => (
          <div
            key={word}
            className="bg-white p-4 rounded-lg shadow-md border border-gray-200 transition transform hover:scale-105 hover:shadow-lg"
          >
            {/* Word Display */}
            <p className="font-semibold text-gray-800 truncate">🔤 {word}</p>
            {/* Word Frequency Count */}
            <p className="text-sm text-gray-500">🔢 Count: {count}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
