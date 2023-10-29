import React, { useState } from "react";
import { convertPDFToText } from "../../lib/utils";
import { performInference } from "../../lib/fetches";
import Head from "next/head";
import Hero from "../components/Hero";
import LanguageSelector from "../components/LanguageSelector";
import LoadingSpinner from "../components/Loading";
import ChatDisplay from "../components/ChatDisplay";
import TextArea from "../NexUIComponents/TextArea";
import Loading from "../NexUIComponents/Loading";
import Selector from "../NexUIComponents/Select";
import { PDFDocument } from "pdf-lib";

import { InferenceResponse } from "../../lib/interfaces";
import { Link } from "@nextui-org/react";

const languages = [
  { code: "en", name: "English" },
  { code: "es", name: "Spanish" },
  { code: "fr", name: "French" },
  { code: "de", name: "German" },
  { code: "pt", name: "Portuguese" },
  { code: "it", name: "Italian" },
  { code: "nl", name: "Dutch" },
  { code: "sv", name: "Swedish" },
  { code: "da", name: "Danish" },
  { code: "no", name: "Norwegian" },
  { code: "fi", name: "Finnish" },
  { code: "is", name: "Icelandic" },
  { code: "el", name: "Greek" },
  { code: "ru", name: "Russian" },
  { code: "pl", name: "Polish" },
  { code: "cs", name: "Czech" },
  { code: "hu", name: "Hungarian" },
  { code: "ro", name: "Romanian" },
  { code: "bg", name: "Bulgarian" },
  { code: "tr", name: "Turkish" },
  { code: "ar", name: "Arabic" },
  { code: "he", name: "Hebrew" },
  { code: "hi", name: "Hindi" },
  { code: "bn", name: "Bengali" },
  { code: "ja", name: "Japanese" },
  { code: "ko", name: "Korean" },
  { code: "zh", name: "Chinese" },
  { code: "vi", name: "Vietnamese" },
  { code: "th", name: "Thai" },
  { code: "id", name: "Indonesian" },
  { code: "ms", name: "Malay" },
  { code: "fil", name: "Filipino" },
  { code: "sw", name: "Swahili" },
  { code: "fa", name: "Farsi" },
  { code: "nep", name: "Nepali" },
];

export default function Home() {
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState(
    "llama-2-7b-chat-2023-10-28-11-55-42"
  );

  const handleLanguageChange = (language: React.SetStateAction<string>) => {
    console.log("Selected Language:", language);
    setSelectedLanguage(language);
  };

  const [summary, setSummary] = useState("");
  const [translation, setTranslation] = useState("");

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === "application/pdf") {
      setSelectedFile(file);
    } else {
      alert("Please select a valid PDF file.");
    }
  };

  const handleUpload = async () => {
    setLoading(true);
    console.log("File", selectedFile);
    if (selectedFile) {
      try {
        const uploadedPdfBuffer = await selectedFile.arrayBuffer();

        // Load the PDF into pdf-lib
        const pdfDoc = await PDFDocument.load(uploadedPdfBuffer);

        // Serialize the loaded PDF (this will inherently compress the PDF)
        const compressedPdfBytes = await pdfDoc.save();

        const sizeLimitMB = 2;
        const sizeLimitBytes = sizeLimitMB * 1024 * 1024;
        console.log(compressedPdfBytes.length);

        if (compressedPdfBytes.length > sizeLimitBytes) {
          alert(
            `The compressed PDF is larger than ${sizeLimitMB}MB. Please upload a smaller PDF.`
          );
          return;
        }

        const compressedPdfBlob = new Blob([compressedPdfBytes], {
          type: "application/pdf",
        });

        const compressedPdfFile = new File(
          [compressedPdfBlob],
          selectedFile.name,
          {
            type: "application/pdf",
            lastModified: selectedFile.lastModified,
          }
        );

        let text;
        try {
          text = await convertPDFToText(compressedPdfFile);
        } catch (err) {
          throw new Error("Error converting PDF to text: " + err);
        }

        console.log("TEXT", text);

        let summary;
        let stop = "";
        let prompt = "";
        if (selectedModel === "llama-2-7b-chat-2023-10-28-11-55-42") {
          prompt = `Q: Please provide a concise summary of the following document, emphasizing the key terms, obligations, rights, penalties, and any potential risks or liabilities: ${text}\nA:`;
          stop = "</s>";
        } else if (selectedModel === "LLaMA-2-7B-32K-2023-10-28-22-52-16") {
          prompt = `summarize this text and give your answer between <summary></summary> tags. text: ${text} <summary>`;
          stop = "</summary>";
        }
        try {
          summary = await performInference(
            `randolfuy09@gmail.com/${selectedModel}`,
            prompt,
            stop
          );
        } catch (err) {
          throw new Error("Error performing inference for summary: " + err);
        }

        const summaryText = summary?.output.choices[0].text || "";

        setLoading(true);
        setSummary("");

        for (let i = 0; i < summaryText.length; i++) {
          setTimeout(() => {
            setSummary((prevText) => prevText + summaryText[i]);
          }, i * 10);
        }

        let translation: InferenceResponse | null;
        try {
          translation = await performInference(
            "togethercomputer/llama-2-70b-chat",
            `<s>[INST]<<SYS>>\ntranslate this text from english to ${selectedLanguage}. Output should only be in ${selectedLanguage}.\n<</SYS>>\n ${summary?.output.choices[0].text}[/INST]`
          );
        } catch (err) {
          throw new Error("Error performing inference for translation: " + err);
        }

        setTranslation("");

        if (translation) {
          for (let i = 0; i < translation?.output.choices[0].text.length; i++) {
            setTimeout(() => {
              setTranslation(
                (prevText) => prevText + translation?.output.choices[0].text[i]
              );
            }, i * 10);
          }
          console.log("translation:", translation?.output.choices[0].text);
        }
      } catch (error) {
        console.error("Error:", error);
        alert("An error occurred: " + error);
      } finally {
        setLoading(false);
      }
    } else {
      alert("Please select a PDF file to upload.");
      setLoading(false);
    }
  };

  return (
    <div className="container w-full min-w-full bg-slate-100">
      <Head>
        <title>Legalingua</title>
        <meta name="description" content="Generated Legalingua" />
      </Head>

      <Hero
        heading="Translate"
        message="Experience LegalLingua Live"
        redirect={
          <Link className="text-white" href="/translate#translate">
            Upload your File
          </Link>
        }
      />

      <div
        id="translate"
        className="min-h-screen flex flex-col items-center justify-center mt-8 mx-10 md:mx-32 lg:mx-3 blue-text"
      >
        <div className="mt-8 text-center">
          <h2 className="text-2xl font-bold mb-3">Upload your PDF file</h2>
        </div>

        <label className="cursor-pointer filled-button">
          <input type="file" className="hidden" onChange={handleFileChange} />
          <span>Select a file</span>
        </label>

        {selectedFile && (
          <p className="mt-4 text-gray-600">Selected: {selectedFile.name}</p>
        )}

        <h2 className="text-2xl font-bold mb-3 mt-8">Language Selection</h2>
        <div className="outlined-button">
          <LanguageSelector
            languages={languages}
            onSelectLanguage={handleLanguageChange}
          />
        </div>

        <h2 className="text-2xl font-bold mb-3 mt-8">Model Selection</h2>
        <select
          value={selectedModel}
          onChange={(e) => setSelectedModel(e.target.value)}
          className="outlined-button"
        >
          <option value="llama-2-7b-chat-2023-10-28-11-55-42">
            Llama 2-7b (Stable: Key points & highlights)
          </option>
          <option value="LLaMA-2-7B-32K-2023-10-28-22-52-16">
            LLaMA-2-7B-32K (Summarization: Compress & minimalize)
          </option>
        </select>

        {loading && <LoadingSpinner />}

        {selectedLanguage && (
          <button
            onClick={handleUpload}
            className="bg-sky-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
          >
            Translate
          </button>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 w-full mb-4">
          <div className="blue-text"> 
          <TextArea title="Summary" chatText={summary} />
          </div>
          <TextArea title="Translation" chatText={translation} />
        </div>
      </div>
    </div>
  );
}
