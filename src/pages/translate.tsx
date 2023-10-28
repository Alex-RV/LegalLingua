import React, { useState } from 'react';
import { convertPDFToText } from '../../lib/utils'; 
import {performInference} from '../../lib/fetches';
import Head from 'next/head';
import Hero from '../components/Hero';

export default function Home() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const lang = 'Spanish';

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      setSelectedFile(file);
    } else {
      alert('Please select a valid PDF file.');
    }
  };

  const handleUpload = async () => {
    if (selectedFile) {
      const text = await convertPDFToText(selectedFile);
      const summary = await performInference(
        "randolfuy09@gmail.com/llama-2-7b-chat-2023-10-28-11-55-42",
        `Q: Please provide a concise summary of the following document, emphasizing the key terms, obligations, rights, penalties, and any potential risks or liabilities: ${text}\nA:`,
        0.8,
        0.7,
        50,
        1,
        1
      );
      
      const translation = await performInference(
        "togethercomputer/RedPajama-INCITE-7B-Chat",
        `Q: Translate the following to ${lang}, only output the ${lang} text: ${summary}\nA:`,
        0.8,
        0.7,
        50,
        250,
        1
      );
      
      console.log("translation:", translation);
      
      console.log(text)
    } else {
      alert('Please select a PDF file to upload.');
    }
  };

  return (
    <div>
      <Head>
        <title>Legalingua</title>
        <meta name='description' content='Generated Legalingua' />
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
          {/* {pdfText && (
            <p className="mt-4 text-gray-600">Extracted Text: {pdfText}</p>
          )} */}
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
