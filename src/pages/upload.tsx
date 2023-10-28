import React, { useState } from 'react';
import { convertPDFToText } from '../../lib/utils'; 

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

  const handleUpload = async () => {
    if (selectedFile) {
      const text = await convertPDFToText(selectedFile);
      console.log(text)
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
