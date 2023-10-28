import React, { useState } from 'react';
import 'pdfjs-dist/build/pdf.worker.entry';
import * as pdfjs from 'pdfjs-dist';
import { createWorker } from 'tesseract.js';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export default function Upload() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      setSelectedFile(file);
    } else {
      alert('Please select a valid PDF file.');
    }
  };

  const transcribeImage = async (pngDataUrl: string) => {
    const worker = await createWorker('eng'); // Create a worker for the English language
    const { data: { text } } = await worker.recognize(pngDataUrl);
    console.log('OCR Result:', text);
    await worker.terminate(); // Terminate the worker once the job is done
  };

  const convertPDFToPNG = async (pdfFile: File) => {
    const fileReader = new FileReader();

    fileReader.onload = async (e: ProgressEvent<FileReader>) => {
      const pdfData = e.target?.result as ArrayBuffer;

      const loadingTask = pdfjs.getDocument(new Uint8Array(pdfData));

      loadingTask.promise.then(async (pdf) => {
        const numPages = pdf.numPages;
        for (let pageNumber = 1; pageNumber <= numPages; pageNumber++) {
          const page = await pdf.getPage(pageNumber);

          const viewport = page.getViewport({ scale: 1.0 });
          const canvas = document.createElement('canvas');
          const context = canvas.getContext('2d') as CanvasRenderingContext2D;

          canvas.width = viewport.width;
          canvas.height = viewport.height;

          const renderContext = {
            canvasContext: context,
            viewport: viewport,
          };

          await page.render(renderContext).promise;

          // Convert the canvas to a PNG data URL
          const pngDataUrl = canvas.toDataURL('image/png');

          // Transcribe the converted PNG using Tesseract.js
          await transcribeImage(pngDataUrl);
        }
      });
    };

    fileReader.readAsArrayBuffer(pdfFile);
  };

  const handleUpload = () => {
    if (selectedFile) {
      convertPDFToPNG(selectedFile);
    } else {
      alert('Please select a PDF file to upload.');
    }
  };

  return (
    <div>
      <h2>PDF Uploader</h2>
      <input type="file" accept=".pdf" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload PDF</button>
    </div>
  );
}
