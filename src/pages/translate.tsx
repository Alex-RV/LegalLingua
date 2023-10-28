import React, { useState } from 'react';
import { convertPDFToText } from '../../lib/utils'; 
import {performInference} from '../../lib/fetches';
import Head from 'next/head';
import Hero from '../components/Hero';
import LanguageSelector from '../components/LanguageSelector'; // Correct import path

const languages = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Spanish' },
  { code: 'fr', name: 'French' },
  { code: 'de', name: 'German' },
  { code: 'pt', name: 'Portuguese' },
  { code: 'it', name: 'Italian' },
  { code: 'nl', name: 'Dutch' },
  { code: 'sv', name: 'Swedish' },
  { code: 'da', name: 'Danish' },
  { code: 'no', name: 'Norwegian' },
  { code: 'fi', name: 'Finnish' },
  { code: 'is', name: 'Icelandic' },
  { code: 'el', name: 'Greek' },
  { code: 'ru', name: 'Russian' },
  { code: 'pl', name: 'Polish' },
  { code: 'cs', name: 'Czech' },
  { code: 'hu', name: 'Hungarian' },
  { code: 'ro', name: 'Romanian' },
  { code: 'bg', name: 'Bulgarian' },
  { code: 'tr', name: 'Turkish' },
  { code: 'ar', name: 'Arabic' },
  { code: 'he', name: 'Hebrew' },
  { code: 'hi', name: 'Hindi' },
  { code: 'bn', name: 'Bengali' },
  { code: 'ja', name: 'Japanese' },
  { code: 'ko', name: 'Korean' },
  { code: 'zh', name: 'Chinese' },
  { code: 'vi', name: 'Vietnamese' },
  { code: 'th', name: 'Thai' },
  { code: 'id', name: 'Indonesian' },
  { code: 'ms', name: 'Malay' },
  { code: 'fil', name: 'Filipino' },
  { code: 'sw', name: 'Swahili' },
  
];


export default function Home() {
  const [selectedLanguage, setSelectedLanguage] = useState(''); // Add this line

  const handleLanguageChange = (language: React.SetStateAction<string>) => {
    console.log('Selected Language:', language);
    setSelectedLanguage(language);
  };

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
        `Q: Please provide a concise summary of the following document, emphasizing the key terms, obligations, rights, penalties, and any potential risks or liabilities: ${text}\nA:`
      );
      
      const translation = await performInference(
        "togethercomputer/RedPajama-INCITE-7B-Chat",
        `Q: Translate the following to ${lang}, only output the ${lang} text: ${summary}\nA:`
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

        {/* Language Selector */}
        <div className="mt-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Select your Language</h2>
        </div>

        <LanguageSelector
          languages={languages}
          onSelectLanguage={handleLanguageChange}
        />

       <button onClick={() => {
          handleUpload;
        }} className='border shadow-lg p-3 w-full mt-2'>Submit</button>
      </div>
    </div>
  );
}
