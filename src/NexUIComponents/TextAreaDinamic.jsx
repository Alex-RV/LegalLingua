import React, { useEffect, useState } from 'react';

const TextArea = ({ title, chatText }) => {
  const [summary, setSummary] = useState('');

  useEffect(() => {
    const typingEffect = setInterval(() => {
      if (summary.length < chatText.length) {
        setSummary((prevText) => prevText + chatText[summary.length]); // Update the chat text one letter at a time
      } else {
        clearInterval(typingEffect);
      }
    }, 10); // Delay the execution to create a typing effect

    return () => {
      clearInterval(typingEffect);
    };
  }, []);
  
  return (
    <div className="border shadow-lg p-3 w-full mt-2">
      <h3>{title}</h3>
      <textarea
        className="h-32 p-2 border rounded resize-none"
        readOnly
        value={summary}
      />
    </div>
  );
};

export default TextArea;
