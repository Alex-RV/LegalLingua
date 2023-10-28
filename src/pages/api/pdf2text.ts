import type { NextApiRequest, NextApiResponse } from 'next';
import { createWorker } from 'tesseract.js';
import * as pdfjs from 'pdfjs-dist';
import { getDocument, GlobalWorkerOptions, PDFDocumentProxy } from 'pdfjs-dist';

// Import the worker as a string
import pdfWorker from 'pdfjs-dist/build/pdf.worker.min.js';

// Setup the worker for PDF.js
const pdfjsWorkerBlob = new Blob([pdfWorker], { type: 'application/javascript' });
const pdfjsWorkerURL = URL.createObjectURL(pdfjsWorkerBlob);
GlobalWorkerOptions.workerSrc = pdfjsWorkerURL;

// pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
function isError(error: unknown): error is Error {
    return error instanceof Error;
  }
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).end(); // Method Not Allowed
  }

  const pdfFileBuffer = req.body;

  if (!pdfFileBuffer) {
    return res.status(400).json({ error: 'Please provide a PDF file.' });
  }

  try {
    const text = await extractTextFromPDF(pdfFileBuffer);
    res.status(200).json({ text });
  } catch (err) {
    console.error(err); // Log the error for debugging
    
    const errorMessage = isError(err) ? err.message : 'An unknown error occurred';
    res.status(500).json({ error: `Failed to process PDF: ${errorMessage}` });
  }
}

async function extractTextFromPDF(pdfBuffer: Buffer): Promise<string> {
  try {
    const loadingTask = pdfjs.getDocument(new Uint8Array(pdfBuffer));
    const pdf = await loadingTask.promise;
    const numPages = pdf.numPages;
    let extractedText = '';

    for (let pageNumber = 1; pageNumber <= numPages; pageNumber++) {
      const page = await pdf.getPage(pageNumber);
      const viewport = page.getViewport({ scale: 1.0 });
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d') as CanvasRenderingContext2D;

      canvas.width = viewport.width;
      canvas.height = viewport.height;

      await page.render({ canvasContext: context, viewport: viewport }).promise;

      const pngDataUrl = canvas.toDataURL('image/png');
      extractedText += await transcribeImage(pngDataUrl);
    }

    return extractedText;
} catch (err) {
    console.error('Error in extractTextFromPDF:', err);
    
    const errorMessage = isError(err) ? err.message : 'An unknown error occurred';
    throw new Error(`Error in extractTextFromPDF: ${errorMessage}`);
  }
}

async function transcribeImage(pngDataUrl: string): Promise<string> {
  try {
    const worker = await createWorker('eng');
    const { data: { text } } = await worker.recognize(pngDataUrl);
    await worker.terminate();
    return text;
} catch (err) {
    console.error('Error in transcribeImage:', err);
    
    const errorMessage = isError(err) ? err.message : 'An unknown error occurred';
    throw new Error(`Error in transcribeImage: ${errorMessage}`);
  }
}
