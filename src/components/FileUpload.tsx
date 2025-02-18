import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, File } from 'lucide-react';
import { cn } from '../lib/utils';

interface FileUploadProps {
  onFileSelect: (file: File) => void; // Callback function triggered when a file is selected
}

export function FileUpload({ onFileSelect }: FileUploadProps) {
  // Handle file drop event using useCallback to optimize performance
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      onFileSelect(acceptedFiles[0]); // Pass the first accepted file to the callback function
    }
  }, [onFileSelect]);

  // Configure the dropzone with file acceptance and max file limit
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop, // Function to handle dropped files
    accept: {
      'application/pdf': ['.pdf'], // Only accept PDF files
    },
    maxFiles: 1, // Allow only one file to be uploaded at a time
  });

  return (
    <div
      {...getRootProps()} // Spread dropzone root props for drag & drop functionality
      className={cn(
        'border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all shadow-sm',
        isDragActive ? 'border-blue-500 bg-blue-50 shadow-md' : 'border-gray-300 hover:border-blue-400' // Highlight when a file is dragged over
      )}
    >
      <input {...getInputProps()} /> {/* Hidden file input element for browsing files */}
      <div className="flex flex-col items-center gap-4">
        {isDragActive ? (
          <Upload className="w-12 h-12 text-blue-500 transition-transform scale-110" /> // Animated icon when dragging a file
        ) : (
          <File className="w-12 h-12 text-gray-400" /> // Default icon
        )}
        <div className="space-y-2">
          <p className="text-lg font-semibold text-gray-700">
            {isDragActive ? 'Drop the PDF here' : 'Drag & drop your PDF here'} {/* Update text based on drag state */}
          </p>
          <p className="text-sm text-gray-500">or click to browse files</p> {/* Secondary instruction */}
        </div>
      </div>
    </div>
  );
}
