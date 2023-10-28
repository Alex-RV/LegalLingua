// components/LoadingSpinner.js
import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="animate-spin rounded-full border-t-4 border-black-500 border-opacity-25 h-12 w-12"></div>
    </div>
  );
};

export default LoadingSpinner;
