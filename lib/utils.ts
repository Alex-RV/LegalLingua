import { createWorker } from 'tesseract.js';
import * as pdfjs from 'pdfjs-dist';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const transcribeImage = async (pngDataUrl: string) => {
  const worker = await createWorker('eng');
  const { data: { text } } = await worker.recognize(pngDataUrl);
//   console.log('OCR Result:', text);
  await worker.terminate();
  return text;
};

export const convertPDFToText = async (pdfFile: File) => {
  return new Promise<string>(async (resolve, reject) => {
    const fileReader = new FileReader();
    let allText = ''; // Initialize a variable to store all text

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

          const pngDataUrl = canvas.toDataURL('image/png');
          const page_text = await transcribeImage(pngDataUrl);

          // Concatenate the text from each page
          allText += page_text;
        }

        // Now, 'allText' contains the text from all pages concatenated
        resolve(allText);
      });
    };

    fileReader.onerror = () => {
      reject(new Error('Error reading the PDF file.'));
    };

    fileReader.readAsArrayBuffer(pdfFile);
  });
};
