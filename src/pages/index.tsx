import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Hero from '../components/Hero';
import Accordion from '../NexUIComponents/Acordion';
import TextArea from '../NexUIComponents/TextArea';

export default function Home() {
  const [summary, setSummary] = useState('');
  const sentence = "Legalingua isn't just a project; it's a heartfelt response to the real struggles faced by immigrants.";

  useEffect(() => {
    for (let i = 0; i < sentence.length; i++) {
      setTimeout(() => {
        setSummary((prevText) => prevText + sentence[i]); // Update the summary one letter at a time
      }, i * 300); // Delay the execution to create a typing effect
    }
  }, []);

  return (
    <div>
      <Head>
        <title>Legalingua</title>
        <meta name='description' content='Generated Legalingua' />
      </Head>
      <Hero heading='LegalLingua' message='AI tool that instantly explains your legal document to you, in your language of choice. No more second-guessing.' />
      <div className="border shadow-lg p-30 w-full mt-9" style={{ display: 'flex', flexDirection: 'row' }}>
        <Accordion/>
        <div className="border shadow-lg p-3">
          <h3>HELLO WORLD!</h3>
          <TextArea title={"Summary"}  chatText={summary} /> 
        </div>
      </div>
    </div>
  );
}

