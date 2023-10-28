import Head from 'next/head';
import Hero from '../components/Hero';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Legalingua</title>
        <meta name='description' content='Generated Legalingua' />
      </Head>
      <Hero heading='Trust me' message='You can Sign' />

      <div className="mt-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Personal Experience...</h2>
      
        <p className="text-gray-700 ">
        We&apos;re the Legalingua team, a diverse bunch with backgrounds from Colombia, Russia, and the Philippines. 
        Our journey to the United States has been filled with dreams, challenges, and a whole lot of paperwork.
        </p>
       
        <p className="text-gray-700">
        Picture this: you or your relatives move to a new country, and suddenly, you find yourselves face-to-face
        with heaps of legal documents. Bank papers, immigration forms, police reports – you name it. Now, imagine 
        trying to understand every line, every detail, especially when the documents are in a language that&apos;s not 
        your own
        </p>
        <p className="text-gray-700">
        We&apos;ve been there. Whether it&apos;s explaining complex immigration paperwork to our parents or deciphering legal 
        jargon ourselves, it&apos;s a struggle. And we bet many of you have been in similar shoes. It&apos;s not just about 
        translating words; it&apos;s about grasping the meaning, the implications, and making sure nothing important gets 
        lost in translation.
        </p>
        
        <p className="text-gray-700">
        So, here&apos;s where Legalingua comes into play. We decided to turn our shared experiences into something more 
        – a solution for anyone who&apos;s ever felt the stress of translating vital documents. Our web application, 
        crafted with love using Next.js and styled with the sleekness of Tailwind CSS, aims to make this process a 
        whole lot smoother.
        </p>
        <p className="text-gray-700">
        But it&apos;s not just about the tech – it&apos;s about understanding. Legalingua isn&apos;t just a project; it&apos;s a heartfelt
        response to the real struggles faced by immigrants. We&apos;ve trained our own machine learning model on over 100
        legal documents, making sure it understands the nuances and intricacies of legal language.
        </p>
        <p className="text-gray-700">
        And this is just the beginning. Our vision for Legalingua extends beyond this hackathon. We want to expand our 
        language support, enhance accuracy, and collaborate with legal experts. We&apos;re not just building a tool; we&apos;re 
        building a bridge, a bridge that connects people, cultures, and understanding.
        </p>
        <p className="text-gray-700">
        So, here&apos;s to Legalingua – a little project born from our own journey, a project that we hope will make the 
        immigration process a bit smoother, a bit less daunting, and a whole lot more human. Thanks for joining us on 
        this adventure. Let&apos;s bridge those borders together!
        </p>
      </div>

      <div className="mt-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Personal Experience...</h2>
        <p className="text-gray-700">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
          Proin vestibulum, quam eget fermentum tincidunt, dui massa fermentum velit.
        </p>
      </div>

      <div className="mt-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Story..</h2>
        <p className="text-gray-700">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
          Proin vestibulum, quam eget fermentum tincidunt, dui massa fermentum velit.
        </p>
      </div>
    </div>
  );
}
