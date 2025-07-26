import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import './LanguageSelector.css';

const LanguageSelector = () => {
  const { language, setLanguage, t } = useLanguage();

  const languages = [
    { code: 'en', name: t('english'), flag: '🇺🇸' },
    { code: 'hi', name: t('hindi'), flag: '🇮🇳' },
    { code: 'ta', name: t('tamil'), flag: '🇮🇳' }
  ];

  return (
    <div className="language-selector">
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        className="language-select"
        aria-label={t('selectLanguage')}
      >
        {languages.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.flag} {lang.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageSelector;