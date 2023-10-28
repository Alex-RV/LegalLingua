import { createWorker } from 'tesseract.js';
import * as pdfjs from 'pdfjs-dist';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export const transcribeImage = async (pngDataUrl: string) => {
  const worker = await createWorker('eng');
  const { data: { text } } = await worker.recognize(pngDataUrl);
  console.log('OCR Result:', text);
  await worker.terminate();
};

export const convertPDFToPNG = async (pdfFile: File) => {
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

        const pngDataUrl = canvas.toDataURL('image/png');
        await transcribeImage(pngDataUrl);
      }
    });
  };

  fileReader.readAsArrayBuffer(pdfFile);
};
