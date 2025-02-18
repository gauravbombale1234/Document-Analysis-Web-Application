import React from 'react';
import { formatNumber } from '../lib/utils'; // Utility function to format numbers
import { BookText, FileText, AlignJustify, MessageSquare, Type } from 'lucide-react';

interface StatisticsProps {
  stats: {
    wordCount: number; // Total number of words in the text
    charCount: number; // Total number of characters including spaces
    charCountNoSpaces: number; // Total number of characters excluding spaces
    sentenceCount: number; // Total number of sentences
    avgWordLength: number; // Average length of words in the text
  };
}

export function Statistics({ stats }: StatisticsProps) {
  // Array to store statistical data along with corresponding icons
  const data = [
    { 
      label: 'Word Count', 
      value: formatNumber(stats.wordCount), 
      icon: <BookText className="w-6 h-6 text-blue-600" /> // Icon for word count
    },
    { 
      label: 'Character Count', 
      value: formatNumber(stats.charCount), 
      icon: <FileText className="w-6 h-6 text-green-600" /> // Icon for character count
    },
    { 
      label: 'Characters (No Spaces)', 
      value: formatNumber(stats.charCountNoSpaces), 
      icon: <AlignJustify className="w-6 h-6 text-purple-600" /> // Icon for character count without spaces
    },
    { 
      label: 'Sentence Count', 
      value: formatNumber(stats.sentenceCount), 
      icon: <MessageSquare className="w-6 h-6 text-red-600" /> // Icon for sentence count
    },
    { 
      label: 'Average Word Length', 
      value: stats.avgWordLength.toFixed(1), // Format average word length to one decimal place
      icon: <Type className="w-6 h-6 text-yellow-600" /> // Icon for average word length
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {data.map(({ label, value, icon }) => (
        <div 
          key={label} 
          className="flex items-center gap-4 bg-white p-5 rounded-xl shadow-md border border-gray-200"
        >
          <div className="p-3 bg-gray-100 rounded-full">
            {icon} {/* Display the corresponding icon */}
          </div>
          <div>
            <p className="text-sm text-gray-500">{label}</p> {/* Display the statistic label */}
            <p className="text-2xl font-semibold text-gray-900">{value}</p> {/* Display the statistic value */}
          </div>
        </div>
      ))}
    </div>
  );
}
