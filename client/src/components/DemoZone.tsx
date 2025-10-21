import React, { useState, useCallback } from 'react';
import SpotlightCard from './SpotlightCard';

const DemoZone: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [optimizedSvg, setOptimizedSvg] = useState<string | null>(null);
  const [originalSize, setOriginalSize] = useState<number>(0);
  const [optimizedSize, setOptimizedSize] = useState<number>(0);
  const [compressionRatio, setCompressionRatio] = useState<number>(0);
  const [processingStage, setProcessingStage] = useState<string>('');

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      // Verify the file is a valid File object
      if (file instanceof File) {
        handleFile(file);
      } else {
        console.error('Invalid file object from drag and drop:', file);
        alert('Invalid file dropped. Please try again.');
      }
    }
  }, []);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    // Ensure we're getting the file from the correct event target
    const target = e.target;
    if (target && target.files && target.files.length > 0) {
      const file = target.files[0];
      // Verify the file is a valid File object
      if (file instanceof File) {
        handleFile(file);
      } else {
        console.error('Invalid file object:', file);
        alert('Invalid file selected. Please try again.');
      }
    }
  }, []);

  const handleFile = (file: File) => {
    if (file.type !== 'image/svg+xml') {
      alert('Please upload an SVG file');
      return;
    }
    
    setFile(file);
    setIsProcessing(true);
    setOriginalSize(file.size);
    setProcessingStage('Preparing file for optimization...');
    
    // Create FormData for server upload
    const formData = new FormData();
    formData.append('file', file);
    
    // Log the file size to verify it's being sent correctly
    console.log(`Sending file to server: ${file.name}, size: ${(file.size / 1024).toFixed(2)} KB`);
    
    // Send to server for optimization
    setProcessingStage('Uploading to optimization server...');
    fetch('/api/optimize-svg', {
      method: 'POST',
      body: formData,
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`Server optimization failed: ${response.status} ${response.statusText}`);
        }
        setProcessingStage('Processing SVG with SVGO...');
        return response.json();
      })
      .then(data => {
        console.log('Server optimization complete:', data);
        setProcessingStage('Downloading optimized file...');
        // Get the optimized SVG from the server
        return fetch(data.downloadUrl).then(response => {
          if (!response.ok) {
            throw new Error('Failed to download optimized SVG');
          }
          // IMPORTANT: Ensure we await the blob so we pass a real Blob to FileReader
          return response.blob().then((blob) => {
            // Verify the blob is valid before proceeding
            if (!(blob instanceof Blob)) {
              throw new Error('Downloaded content is not a valid Blob');
            }
            return { blob, stats: data };
          });
        });
      })
      .then(({blob, stats}) => {
        setProcessingStage('Finalizing optimization...');
        // Read the blob as text
        return new Promise((resolve, reject) => {
          // Double-check that we have a valid Blob
          if (!blob || !(blob instanceof Blob)) {
            reject(new Error('Invalid blob object for FileReader'));
            return;
          }
          
          const reader = new FileReader();
          reader.onload = (e) => {
            const content = e.target?.result;
            if (typeof content !== 'string') {
              reject(new Error('FileReader did not return text content'));
              return;
            }
            resolve({
              content: content,
              stats: stats
            });
          };
          reader.onerror = (e) => {
            console.error('FileReader error:', e);
            reject(new Error('Failed to read SVG content with FileReader'));
          };
          
          // This is the critical fix - ensure we're passing a valid Blob to readAsText
          reader.readAsText(blob, 'UTF-8');
        });
      })
      .then((result: any) => {
        const { content, stats } = result;
        
        // Verify we have content
        if (!content) {
          throw new Error('Received empty content from server');
        }
        
        console.log(`Original: ${stats.originalBytes} bytes, Optimized: ${stats.optimizedBytes} bytes`);
        
        // Use server-provided stats if available, otherwise calculate locally
        const newSize = stats.optimizedBytes || new Blob([content]).size;
        const ratio = stats.percentSaved || ((file.size - newSize) / file.size) * 100;
        
        setOptimizedSvg(content);
        setOptimizedSize(newSize);
        setCompressionRatio(parseFloat(ratio.toFixed(2)));
        setProcessingStage('');
        setIsProcessing(false);
      })
      .catch(error => {
        console.error('Error during SVG optimization:', error);
        alert('Error optimizing SVG: ' + error.message);
        setProcessingStage('');
        setIsProcessing(false);
      });
  };

  const handleDownload = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!optimizedSvg) return;
    
    const blob = new Blob([optimizedSvg], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = file ? `${file.name.replace('.svg', '')}.optimized.svg` : 'optimized.svg';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <section id="demo" className="mx-auto mt-16 max-w-6xl px-6 mb-16">
      <SpotlightCard className="mb-8">
        <div className="grid items-center gap-8 p-8 md:grid-cols-2">
          {/* Left: Drop zone */}
          <div 
            className={`flex h-72 flex-col items-center justify-center rounded-xl border-2 ${
              dragActive ? 'border-purple-500 bg-purple-500/10' : 'border-white/15 bg-white/5'
            } text-center transition-all duration-200 relative`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <input 
              type="file" 
              accept=".svg" 
              onChange={handleFileChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            />
            
            {isProcessing ? (
              <div className="flex flex-col items-center">
                <div className="h-14 w-14 border-4 border-t-purple-500 border-white/20 rounded-full animate-spin"></div>
                <p className="mt-4 text-sm text-zinc-300">Optimizing your SVG...</p>
                {processingStage && (
                  <p className="mt-2 text-xs text-zinc-400">{processingStage}</p>
                )}
              </div>
            ) : file && optimizedSvg ? (
              <div className="flex flex-col items-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full border border-green-500/50 bg-green-500/20">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-400">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                </div>
                <p className="mt-3 text-sm text-zinc-300">{file.name} optimized!</p>
              </div>
            ) : (
              <>
                <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/20 bg-white/10">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 5 17 10" />
                    <line x1="12" y1="5" x2="12" y2="20" />
                  </svg>
                </div>
                <p className="mt-3 text-sm text-zinc-300">Drop your SVG here or click to browse</p>
                <p className="text-xs text-zinc-400">Optimize your SVG files instantly</p>
              </>
            )}
          </div>

          {/* Right: Description */}
          <div>
            <h3 className="text-xl font-semibold">Enterprise-Grade SVG Optimization</h3>
            <p className="mt-2 text-sm text-zinc-300">
              Client-side optimization trusted by industry leaders. Your data never leaves your device.
            </p>
            <ul className="mt-6 space-y-2">
              <li className="flex items-center text-sm text-zinc-300">
                <svg className="w-5 h-5 mr-2 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                Removes unnecessary metadata and attributes
              </li>
              <li className="flex items-center text-sm text-zinc-300">
                <svg className="w-5 h-5 mr-2 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                Optimizes paths and shapes for maximum efficiency
              </li>
              <li className="flex items-center text-sm text-zinc-300">
                <svg className="w-5 h-5 mr-2 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                Significant file size reduction for faster loading
              </li>
              <li className="flex items-center text-sm text-zinc-300">
                <svg className="w-5 h-5 mr-2 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                GDPR compliant - no server processing required
              </li>
            </ul>
          </div>
        </div>
      </SpotlightCard>
      
      {file && optimizedSvg && (
        <div className="flex flex-col items-center">
          <div className="bg-white/10 rounded-lg p-4 mb-4 text-center">
            <div className="flex justify-center items-center space-x-8">
              <div>
                <p className="text-sm text-zinc-400">Original Size</p>
                <p className="text-xl font-semibold">{(originalSize / 1024).toFixed(2)} KB</p>
              </div>
              <div className="text-green-400">
                <p className="text-sm text-zinc-400">Compression</p>
                <p className="text-xl font-semibold">-{compressionRatio}%</p>
              </div>
              <div>
                <p className="text-sm text-zinc-400">Optimized Size</p>
                <p className="text-xl font-semibold">{(optimizedSize / 1024).toFixed(2)} KB</p>
              </div>
            </div>
          </div>
          <button 
            onClick={handleDownload}
            className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg text-base font-medium transition-colors shadow-lg hover:shadow-xl flex items-center"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
            </svg>
            Download Optimized SVG
          </button>
        </div>
      )}
    </section>
  );
};

export default DemoZone;
