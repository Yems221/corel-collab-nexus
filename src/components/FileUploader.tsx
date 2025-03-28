
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { FileIcon, UploadIcon, XIcon } from 'lucide-react';

interface FileUploaderProps {
  onFileChange: (file: File | null) => void;
  accept?: string;
  maxSize?: number;
  initialFile?: File | null;
}

export const FileUploader: React.FC<FileUploaderProps> = ({
  onFileChange,
  accept = '*',
  maxSize = 10 * 1024 * 1024, // 10MB default
  initialFile = null,
}) => {
  const [file, setFile] = useState<File | null>(initialFile);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    
    if (!selectedFile) {
      resetFile();
      return;
    }
    
    // Check file size
    if (selectedFile.size > maxSize) {
      setError(`Le fichier est trop volumineux (max: ${formatBytes(maxSize)})`);
      return;
    }
    
    setFile(selectedFile);
    onFileChange(selectedFile);
    setError(null);
    
    // Create preview for images
    if (selectedFile.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setPreview(null);
    }
  };

  const resetFile = () => {
    setFile(null);
    setPreview(null);
    setError(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
    onFileChange(null);
  };

  const formatBytes = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="w-full">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept={accept}
        className="hidden"
        id="file-upload"
      />
      
      {!file ? (
        <div 
          className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:border-primary transition-colors"
          onClick={() => fileInputRef.current?.click()}
        >
          <UploadIcon className="h-10 w-10 text-gray-400 mb-2" />
          <p className="text-sm text-center text-gray-500">
            Cliquez pour sélectionner un fichier ou glissez-déposez ici
          </p>
          <p className="text-xs text-gray-400 mt-1">
            {accept !== '*' ? `Formats acceptés: ${accept.replace(/image\/\*/g, 'Images')}` : ''}
            {maxSize ? ` · Taille max: ${formatBytes(maxSize)}` : ''}
          </p>
        </div>
      ) : (
        <div className="border rounded-lg p-4 flex items-center justify-between">
          {preview ? (
            <div className="flex items-center gap-3">
              <img src={preview} alt="Preview" className="h-16 w-16 object-cover rounded" />
              <div>
                <p className="text-sm font-medium truncate max-w-[200px]">{file.name}</p>
                <p className="text-xs text-gray-500">{formatBytes(file.size)}</p>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-gray-100 rounded flex items-center justify-center">
                <FileIcon className="h-5 w-5 text-gray-500" />
              </div>
              <div>
                <p className="text-sm font-medium truncate max-w-[200px]">{file.name}</p>
                <p className="text-xs text-gray-500">{formatBytes(file.size)}</p>
              </div>
            </div>
          )}
          
          <Button type="button" variant="ghost" size="sm" onClick={resetFile}>
            <XIcon className="h-4 w-4" />
          </Button>
        </div>
      )}
      
      {error && (
        <p className="text-sm text-red-500 mt-1">{error}</p>
      )}
    </div>
  );
};
