import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Hero from '../components/Hero';
import AccordionComponent from '../NexUIComponents/Acordion';
import TextArea from '../NexUIComponents/TextArea';
import Table from '../NexUIComponents/Table';



export default function Home() {
  const [summary, setSummary] = useState('');
  const sentence = "Legalingua isn't just a project; it's a heartfelt response to the real struggles faced by immigrants.";

  useEffect(() => {
    for (let i = 0; i < sentence.length; i++) {
      setTimeout(() => {
        setSummary((prevText) => prevText + sentence[i]);
      }, i * 300);
    }
  }, []);

  return (
    <div>
      <Head>
        <title>Legalingua</title>
        <meta name='description' content='Generated Legalingua' />
      </Head>
      <Hero heading='LegalLingua' message='AI tool that instantly explains your legal document to you, in your language of choice. No more second-guessing.' />
      <div className="border shadow-lg p-3 w-50p mt-9 flex-row" style={{display: 'flex', flexDirection:'row'}}>
        <AccordionComponent />
        <TextArea title={"HELLO WORLD!"}  chatText={"Legalingua isn't just a project; it's a heartfelt response to the real struggles faced by immigrants."} /> 
        
      </div>

      <Table/>
      </div>
  );
}
