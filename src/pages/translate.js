import { useState } from 'react';
import Head from 'next/head';
import Hero from '../components/Hero';
 // Import the utility function
import { SliderData } from '../components/SliderData';

export default function Home() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [pdfText, setPdfText] = useState(null);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);

    // Extract text from the PDF file
    const text = await extractTextFromPDF(file.path);
    setPdfText(text);

    // You can further process or save the extracted text as needed
  };

  return (
    <div>
      <Head>
        <title>Legalingua</title>
        <meta name='description' content='Generated Legalingua' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Hero heading='Translate' message='Here you can try it out' />

      <div className="min-h-screen flex flex-col items-center justify-center mt-8">
        <div className="mt-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Add your file...</h2>
          <p className="text-gray-700">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
            Proin vestibulum, quam eget fermentum tincidunt, dui massa fermentum velit.
          </p>
          {/* Display the extracted text, if available */}
          {pdfText && (
            <p className="mt-4 text-gray-600">Extracted Text: {pdfText}</p>
          )}
        </div>
        {/* Input file element */}
        <label className="cursor-pointer border-2 border-dashed rounded-md p-4">
          <input
            type="file"
            className="hidden"
            onChange={handleFileChange}
          />
          <span className="text-gray-700">Choose a file</span>
        </label>

        {/* Display the selected file name, if any */}
        {selectedFile && (
          <p className="mt-4 text-gray-600">Selected File: {selectedFile.name}</p>
        )}
      </div>
    </div>
  );
}
