import React from 'react';

const ChatDisplay = ({ title ,chatText }) => {
  return (
   
    
    <div className="h-60 p-60 border rounded">
        <h2 className='text-2xl font-bold'>{title}</h2>
        {chatText}
     </div>
    )};


export default ChatDisplay;
