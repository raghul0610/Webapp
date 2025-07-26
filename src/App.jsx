import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';
import Suppliers from './components/Suppliers';
import LanguageSelector from './components/LanguageSelector';
import './App.css';

function AppContent() {
  const { t } = useLanguage();
  
  return (
    <Router>
      <div className="App">
        <nav className="navbar">
          <div className="nav-container">
            <Link to="/" className="nav-logo">
              {t('supplierHub')}
            </Link>
            <div className="nav-right">
              <ul className="nav-menu">
                <li className="nav-item">
                  <Link to="/" className="nav-link">
                    {t('home')}
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/suppliers" className="nav-link">
                    {t('suppliers')}
                  </Link>
                </li>
              </ul>
              <LanguageSelector />
            </div>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/suppliers" element={<Suppliers />} />
        </Routes>
      </div>
    </Router>
  );
}

function Home() {
  const { t } = useLanguage();
  
  return (
    <div className="home">
      <div className="hero">
        <h1>{t('welcomeTitle')}</h1>
        <p>{t('welcomeSubtitle')}</p>
        <Link to="/suppliers" className="cta-button">
          {t('browseSuppliers')}
        </Link>
      </div>
    </div>
  );
}

function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

export default App;