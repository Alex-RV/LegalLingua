import Head from 'next/head';
import Hero from '../components/Hero';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Legalingua</title>
        <meta name='description' content='Generated Legalingua' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Hero heading='' message='Trust what you sign' />

      <div className="mt-8 text-center">
        <h2 className="text-2xl font-bold mb-4">What is Legalingua?</h2>
        <p className="text-gray-700">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
          Proin vestibulum, quam eget fermentum tincidunt, dui massa fermentum velit.
        </p>
        {/* Add more paragraphs or information as needed */}
      </div>

      <div className="mt-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Personal Experience...</h2>
        <p className="text-gray-700">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
          Proin vestibulum, quam eget fermentum tincidunt, dui massa fermentum velit.
        </p>
        {/* Add more paragraphs or information as needed */}
      </div>

      <div className="mt-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Story..</h2>
        <p className="text-gray-700">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
          Proin vestibulum, quam eget fermentum tincidunt, dui massa fermentum velit.
        </p>
        {/* Add more paragraphs or information as needed */}
      </div>
    </div>
  );
}
