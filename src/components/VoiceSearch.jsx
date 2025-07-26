import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import './VoiceSearch.css';

const VoiceSearch = ({ onVoiceResult, searchTerm, setSearchTerm }) => {
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState(null);
  const [isSupported, setIsSupported] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    // Check if Web Speech API is supported
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      
      recognitionInstance.continuous = false;
      recognitionInstance.interimResults = false;
      recognitionInstance.lang = 'en-US';
      
      recognitionInstance.onstart = () => {
        setIsListening(true);
      };
      
      recognitionInstance.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setSearchTerm(transcript);
        onVoiceResult(transcript);
        setIsListening(false);
      };
      
      recognitionInstance.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
        alert(t('listeningError'));
      };
      
      recognitionInstance.onend = () => {
        setIsListening(false);
      };
      
      setRecognition(recognitionInstance);
      setIsSupported(true);
    } else {
      setIsSupported(false);
    }
  }, [onVoiceResult, setSearchTerm, t]);

  const startListening = () => {
    if (recognition && !isListening) {
      try {
        recognition.start();
      } catch (error) {
        console.error('Error starting recognition:', error);
        alert(t('listeningError'));
      }
    }
  };

  const stopListening = () => {
    if (recognition && isListening) {
      recognition.stop();
    }
  };

  if (!isSupported) {
    return (
      <div className="voice-search-unsupported">
        <button 
          className="voice-search-btn disabled"
          disabled
          title={t('voiceNotSupported')}
        >
          🎤
        </button>
      </div>
    );
  }

  return (
    <div className="voice-search">
      <button
        className={`voice-search-btn ${isListening ? 'listening' : ''}`}
        onClick={isListening ? stopListening : startListening}
        title={isListening ? t('listeningStart') : t('voiceSearch')}
        disabled={!isSupported}
      >
        {isListening ? (
          <span className="listening-animation">🎤</span>
        ) : (
          '🎤'
        )}
      </button>
      {isListening && (
        <div className="listening-indicator">
          <span className="listening-text">{t('listeningStart')}</span>
          <div className="sound-waves">
            <div className="wave wave1"></div>
            <div className="wave wave2"></div>
            <div className="wave wave3"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VoiceSearch;