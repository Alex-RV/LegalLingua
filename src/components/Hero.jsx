import React from 'react';
import Navbar from '../NexUIComponents/Navbar';
import backgroundImage from '../../public/bg.jpg';

const Hero = ({heading, message}) => {
  function handleClick() {
    window.location.href = '/translate#translate';
  }
  
  return (
    <div className='relative w-full h-screen flex items-center justify-center bg-fixed bg-no-repeat bg-center bg-cover custom-img'>
      {/* Overlay */}
      <div className='absolute top-0 left-0 right-0 bottom-0 bg-black/70 z-[2]' />
      <div className='p-5 text-white z-[2] mt-[-10rem]'>
        <h2 className='text-6xl font-bold'>{heading}</h2>
        <p className='py-5 text-xl max-w-xl'>{message}</p>
        <button className='px-8 py-2 border' onClick={handleClick}>
          Try it out
        </button>
      </div>
    </div>
  );
};

export default Hero;
