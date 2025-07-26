import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Suppliers from './components/Suppliers';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar">
          <div className="nav-container">
            <Link to="/" className="nav-logo">
              Supplier Hub
            </Link>
            <ul className="nav-menu">
              <li className="nav-item">
                <Link to="/" className="nav-link">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/suppliers" className="nav-link">
                  Suppliers
                </Link>
              </li>
            </ul>
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
  return (
    <div className="home">
      <div className="hero">
        <h1>Welcome to Supplier Hub</h1>
        <p>Find the best suppliers for all your needs</p>
        <Link to="/suppliers" className="cta-button">
          Browse Suppliers
        </Link>
      </div>
    </div>
  );
}

export default App;