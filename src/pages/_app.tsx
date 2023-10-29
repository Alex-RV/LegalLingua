import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Navbar from '../NexUIComponents/Navbar';
import Footer from '../NexUIComponents/Footer';

export default function App({ Component, pageProps }: AppProps) {
  return <>
  <Navbar />
   <Component {...pageProps} />
  <Footer/>
  </> 
}