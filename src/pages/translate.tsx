import React, { useState } from 'react';
import { convertPDFToText } from '../../lib/utils'; 
import {performInference} from '../../lib/fetches';
import Head from 'next/head';
import Hero from '../components/Hero';
import LanguageSelector from '../components/LanguageSelector';
import LoadingSpinner from '../components/Loading';
import  ChatDisplay from '../components/ChatDisplay';
import ProgressBar from '../NexUIComponents/ProgressBar';
import Table from '../NexUIComponents/Table'
import Input from '../NexUIComponents/input';

import { InferenceResponse } from '../../lib/interfaces';

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
  const [selectedLanguage, setSelectedLanguage] = useState(''); 
  const [loading, setLoading] = useState(false);
 


  const handleLanguageChange = (language: React.SetStateAction<string>) => {
    console.log('Selected Language:', language);
    setSelectedLanguage(language);
  };

  
  const [summary, setSummary] = useState('');
  const [translation, setTranslation] = useState('');

 
  
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      setSelectedFile(file);
    } else {
      alert('Please select a valid PDF file.');
    }
  };

  const handleUpload = async () => {
    setLoading(true);
    console.log("FIle",selectedFile);
    if (selectedFile) {
      try{ 
      const text = await convertPDFToText(selectedFile);
      console.log(text);
      const summary: InferenceResponse | null = await performInference(
        "randolfuy09@gmail.com/llama-2-7b-chat-2023-10-28-11-55-42",
        `Q: Please provide a concise summary of the following document, emphasizing the key terms, obligations, rights, penalties, and any potential risks or liabilities: ${text}\nA:`
      );
      
      const summaryText = summary?.output.choices[0].text || ''; // Getting the summary response text
      
      setLoading(true);
      setSummary(''); // Clearing the chat text
      
      for (let i = 0; i < summaryText.length; i++) {
        setTimeout(() => {
          setSummary((prevText) => prevText + summaryText[i]); // Update the chat text one letter at a time
        }, i * 100); // Delay the execution to create a typing effect
      }
      
      
      const translation: InferenceResponse | null = await performInference(
        "togethercomputer/RedPajama-INCITE-7B-Chat",
        `Q: Translate the following to ${selectedLanguage}, only output the ${selectedLanguage} text: ${summary?.output.choices[0].text}\nA:`,
        0.2,
        undefined,
        undefined,
        1000
      );
      setTranslation(''); // Clearing the chat text
      
      for (let i = 0; i < summaryText.length; i++) {
        setTimeout(() => {
          setTranslation((prevText) => prevText + summaryText[i]); // Update the chat text one letter at a time
        }, i * 100); // Delay the execution to create a typing effect
      }
      console.log("translation:", translation?.output.choices[0].text);
      
      }catch(error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    } else {
      alert('Please select a PDF file to upload.');
      setLoading(false);
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
          <h2 className="text-2xl font-bold mb-25">Add your file...</h2>
        </div>
        {/* Input file element */}
        <label className="cursor-pointer border-2 border-dashed rounded-md p-4">
          <input
            type="file"
            className="hidden"
            onChange={handleFileChange}
          />
          <span className="text-gray-700 ">Choose a file</span>
        </label>

        {/* Display the selected file name, if any */}
        
        {selectedFile && (
          <p className="mt-4 text-gray-600">Selected File: {selectedFile.name}</p>
        )}

        {/* Language Selector */}
        <div className="mt-8 text-center">
          <h2 className="text-2xl font-bold mb-10">Select your Language</h2>
        </div>

        <LanguageSelector
        
          languages={languages}
          onSelectLanguage={handleLanguageChange}
          
        />
        

        <div>
     
        {loading && <LoadingSpinner/>}
        {selectedLanguage !== '' && <button onClick={() => {
          handleUpload();
          setLoading(true);
        }} className='border shadow-lg p-3 w-full mt-2 '>Submit</button>}
        <div className="border shadow-lg p-3 w-full mt-2">
          
          <ChatDisplay title={"Summary"} chatText={summary} /> 
          <ChatDisplay title={ "Native" } chatText = {translation} /> 
          <ProgressBar/>
          <Table/>
          <Input/>
          
        </div>
        </div>
      </div>
    </div>
  );
}

