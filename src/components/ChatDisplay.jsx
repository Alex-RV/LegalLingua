import React from 'react';

const ChatDisplay = ({ chatText }) => {
  return (
   
    
    <div className="border shadow-lg p-3 w-full mt-2">
          <textarea
            className="h-60 p-20 border rounded resize-none"
            readOnly
            value={chatText} // Display the chat text in the textarea or a div
          />
        </div>
    )};


export default ChatDisplay;
