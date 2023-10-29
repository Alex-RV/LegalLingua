import React, { useEffect, useState } from "react";
import Head from "next/head";
import Hero from "../components/Hero";
import AccordionComponent from "../NexUIComponents/Acordion";
import TextArea from "../NexUIComponents/TextArea";
import { Link } from "@nextui-org/react";

export default function Home() {
  const [summary, setSummary] = useState("");
  const sentence =
    "Legalingua isn't just a project; it's a heartfelt response to the real struggles faced by immigrants.";

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
        <meta name="description" content="Generated Legalingua" />
      </Head>
      <Hero
        heading="Skip the jargon"
        message={
          <>
            AI tool that instantly explains your legal document to you, in your
            language of choice.
            <br />
            No more second-guessing.
          </>
        }
        redirect={<Link className="text-white" href="/translate">Try LegalLingua</Link>}
      />
      <div className="border shadow-lg p-30 w-full mt-9 flex-row">
        <AccordionComponent />
        <div className="border shadow-lg p-3">
          <h3>HELLO WORLD!</h3>
          <TextArea title="Summary" chatText={summary} />
        </div>
      </div>
    </div>
  );
}
