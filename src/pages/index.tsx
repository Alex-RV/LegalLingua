import Head from 'next/head';
import Hero from '../components/Hero';
import Accordion from '../NexUIComponents/Acordion';
import Textarea from '../NexUIComponents/TextArea'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Legalingua</title>
        <meta name='description' content='Generated Legalingua' />
      </Head>
      <Hero heading='Trust me' message='You can Sign' />
      <Accordion/>
      </div>
  );
}
