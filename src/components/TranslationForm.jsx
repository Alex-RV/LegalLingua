import React from 'react'

const Contact = () => {
  return (
    <div className='max-w-[1240px] m-auto p-4 h-screen'>
        <h1 className='text-2xl font-bold text-center p-4'>Ls work together</h1>
        <div className='max-w-[600px] m-auto'>
           
            <textarea className='border shadow-lg p-3 w-full' cols="80" rows="10" placeholder='Message'></textarea>
        </div>
    </div>
  )
}

export default Contact