// components/LanguageSelector.js
import React, { useState } from 'react';

const LanguageSelector = ({ languages: languages, onSelectLanguage }) => {
  const [selectedLanguage, setSelectedLanguage] = useState('');

  const handleLanguageChange = (e) => {
    const language = e.target.value;
    setSelectedLanguage(language);
    onSelectLanguage(language);
  };

  return (
    <select value={selectedLanguage} onChange={handleLanguageChange}>
      <option value="" disabled>Select Language</option>
      {languages.map((lang) => (
        <option key={lang.code} value={lang.name}>{lang.name}</option>
      ))}
    </select>
  );
};

export default LanguageSelector;
