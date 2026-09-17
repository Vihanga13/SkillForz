"use client";

import React, { useState, useRef } from "react";
import { cn } from "@/lib/utils";
import { UploadCloud, FileText, CheckCircle2, X, AlertCircle } from "lucide-react";

export interface FileUploadProps {
  label?: string;
  accept?: string;
  maxSizeMB?: number;
  helperText?: string;
  onFileSelect?: (file: File | null) => void;
  error?: string;
  initialFileName?: string;
  className?: string;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  label,
  accept = ".pdf,.doc,.docx",
  maxSizeMB = 5,
  helperText = "PDF, DOC, DOCX up to 5MB",
  onFileSelect,
  error: externalError,
  initialFileName,
  className,
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string | null>(initialFileName || null);
  const [fileSize, setFileSize] = useState<string | null>(null);
  const [internalError, setInternalError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const error = externalError || internalError;

  const validateAndProcessFile = (file: File) => {
    setInternalError(null);

    // Size check
    const maxSizeBytes = maxSizeMB * 1024 * 1024;
    if (file.size > maxSizeBytes) {
      setInternalError(`File size exceeds ${maxSizeMB}MB limit.`);
      return;
    }

    setSelectedFile(file);
    setFileName(file.name);
    setFileSize((file.size / (1024 * 1024)).toFixed(2) + " MB");
    if (onFileSelect) onFileSelect(file);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndProcessFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      validateAndProcessFile(e.target.files[0]);
    }
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedFile(null);
    setFileName(null);
    setFileSize(null);
    setInternalError(null);
    if (inputRef.current) inputRef.current.value = "";
    if (onFileSelect) onFileSelect(null);
  };

  return (
    <div className={cn("w-full space-y-1.5 text-left", className)}>
      {label && <label className="block text-sm font-medium text-ink-900">{label}</label>}

      {!fileName ? (
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          className={cn(
            "relative flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border bg-bg/50 p-6 text-center transition-all duration-150 cursor-pointer hover:bg-primary-50/50 hover:border-primary-400 group",
            dragActive && "border-primary-600 bg-primary-50 ring-2 ring-primary-600/20",
            error && "border-accent-danger bg-red-50/30"
          )}
        >
          <input
            ref={inputRef}
            type="file"
            accept={accept}
            onChange={handleChange}
            className="hidden"
          />
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-50 text-primary-600 group-hover:scale-110 group-hover:bg-primary-100 transition-all duration-200">
            <UploadCloud className="h-6 w-6" />
          </div>
          <div className="mt-3">
            <span className="text-sm font-semibold text-primary-600">Click to upload</span>
            <span className="text-sm text-ink-500"> or drag and drop</span>
          </div>
          <p className="mt-1 text-xs text-ink-500">{helperText}</p>
        </div>
      ) : (
        <div className="flex items-center justify-between rounded-xl border border-primary-200 bg-primary-50/60 p-3.5">
          <div className="flex items-center space-x-3 overflow-hidden">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-100 text-primary-600">
              <FileText className="h-5 w-5" />
            </div>
            <div className="truncate">
              <p className="truncate text-sm font-medium text-ink-900">{fileName}</p>
              <p className="text-xs text-ink-500">
                {fileSize || "Ready for upload"} &bull; Verified
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleRemove}
            className="ml-2 rounded-lg p-1.5 text-ink-500 hover:bg-white hover:text-accent-danger transition-colors"
            title="Remove file"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {error && (
        <div className="flex items-center gap-1.5 text-xs text-accent-danger mt-1">
          <AlertCircle className="h-3.5 w-3.5 shrink-0" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};
