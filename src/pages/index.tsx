import Head from "next/head";
import Hero from "../components/Hero";
import Accordion from "../NexUIComponents/Acordion";
import Textarea from "../NexUIComponents/TextArea";

export default function Home() {
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
            AI tool that instantly explains your legal document to you, in your language of choice.
            <br/>
            No more second-guessing.
          </>
        }
        redirect="Try LegalLingua"
      />
      <Accordion />
    </div>
  );
}
