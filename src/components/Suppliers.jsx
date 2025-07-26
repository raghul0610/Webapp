import React, { useState, useEffect } from 'react';
import './Suppliers.css';

const Suppliers = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [filteredSuppliers, setFilteredSuppliers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [cityFilter, setCityFilter] = useState('');
  const [deliveryFilter, setDeliveryFilter] = useState('');
  const [sortBy, setSortBy] = useState('rating');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(true);

  // Check login status on component mount
  useEffect(() => {
    const loginStatus = localStorage.getItem('isLoggedIn');
    if (loginStatus === 'true') {
      setIsLoggedIn(true);
    }
  }, []);

  // Fetch suppliers data
  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const response = await fetch('/suppliers.json');
        const data = await response.json();
        setSuppliers(data);
        setFilteredSuppliers(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching suppliers:', error);
        setLoading(false);
      }
    };

    fetchSuppliers();
  }, []);

  // Filter and search suppliers
  useEffect(() => {
    let filtered = suppliers;

    // Search by name or products
    if (searchTerm) {
      filtered = filtered.filter(supplier =>
        supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        supplier.products.some(product =>
          product.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    // Filter by city
    if (cityFilter) {
      filtered = filtered.filter(supplier => supplier.city === cityFilter);
    }

    // Filter by delivery status
    if (deliveryFilter) {
      const hasDelivery = deliveryFilter === 'available';
      filtered = filtered.filter(supplier => supplier.deliveryAvailable === hasDelivery);
    }

    // Sort by rating
    if (sortBy === 'rating') {
      filtered = filtered.sort((a, b) => b.rating - a.rating);
    }

    setFilteredSuppliers(filtered);
  }, [suppliers, searchTerm, cityFilter, deliveryFilter, sortBy]);

  // Get unique cities for filter dropdown
  const uniqueCities = [...new Set(suppliers.map(supplier => supplier.city))].sort();

  // Handle login
  const handleLogin = (e) => {
    e.preventDefault();
    if (phoneNumber.length === 10) {
      setIsLoggedIn(true);
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userPhone', phoneNumber);
      setShowLoginModal(false);
      setPhoneNumber('');
    } else {
      alert('Please enter a valid 10-digit phone number');
    }
  };

  // Handle logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userPhone');
  };

  // Render star rating
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={i} className="star full">★</span>);
    }

    if (hasHalfStar) {
      stars.push(<span key="half" className="star half">★</span>);
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<span key={`empty-${i}`} className="star empty">☆</span>);
    }

    return stars;
  };

  // Handle WhatsApp contact
  const handleWhatsAppContact = (whatsapp) => {
    window.open(`https://wa.me/91${whatsapp}`, '_blank');
  };

  if (loading) {
    return <div className="loading">Loading suppliers...</div>;
  }

  return (
    <div className="suppliers-container">
      <div className="suppliers-header">
        <h1>Suppliers Directory</h1>
        <p>Find the best suppliers for your business needs</p>
        
        {isLoggedIn && (
          <div className="user-info">
            <span>Welcome! </span>
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          </div>
        )}
      </div>

      {/* Search and Filter Controls */}
      <div className="controls">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search by name or product..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="filters">
          <select
            value={cityFilter}
            onChange={(e) => setCityFilter(e.target.value)}
            className="filter-select"
          >
            <option value="">All Cities</option>
            {uniqueCities.map(city => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>

          <select
            value={deliveryFilter}
            onChange={(e) => setDeliveryFilter(e.target.value)}
            className="filter-select"
          >
            <option value="">All Delivery Options</option>
            <option value="available">Delivery Available</option>
            <option value="notAvailable">No Delivery</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="filter-select"
          >
            <option value="rating">Sort by Rating</option>
          </select>
        </div>
      </div>

      {/* Suppliers Grid */}
      <div className="suppliers-grid">
        {filteredSuppliers.length === 0 ? (
          <div className="no-results">
            <p>No suppliers found matching your criteria.</p>
          </div>
        ) : (
          filteredSuppliers.map(supplier => (
            <div key={supplier.id} className="supplier-card">
              <div className="supplier-image">
                <img src={supplier.image} alt={supplier.name} />
                {supplier.deliveryAvailable && (
                  <div className="delivery-badge">Delivery Available</div>
                )}
              </div>

              <div className="supplier-info">
                <h3 className="supplier-name">{supplier.name}</h3>
                <p className="supplier-city">📍 {supplier.city}</p>
                
                <div className="supplier-rating">
                  {renderStars(supplier.rating)}
                  <span className="rating-number">({supplier.rating})</span>
                </div>

                <div className="supplier-products">
                  <h4>Products:</h4>
                  <div className="products-list">
                    {supplier.products.map((product, index) => (
                      <span key={index} className="product-tag">
                        {product}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="supplier-pricing">
                  <strong>Pricing: {supplier.pricing}</strong>
                </div>

                <div className="supplier-actions">
                  {isLoggedIn ? (
                    <button
                      onClick={() => handleWhatsAppContact(supplier.whatsapp)}
                      className="whatsapp-btn"
                    >
                      💬 Contact on WhatsApp
                    </button>
                  ) : (
                    <button
                      onClick={() => setShowLoginModal(true)}
                      className="login-prompt-btn"
                    >
                      🔒 Login to Contact
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Login Modal */}
      {showLoginModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>Login to Contact Suppliers</h2>
              <button
                onClick={() => setShowLoginModal(false)}
                className="close-btn"
              >
                ×
              </button>
            </div>
            
            <form onSubmit={handleLogin} className="login-form">
              <div className="form-group">
                <label htmlFor="phone">Phone Number:</label>
                <input
                  type="tel"
                  id="phone"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="Enter 10-digit phone number"
                  maxLength="10"
                  pattern="[0-9]{10}"
                  required
                  className="phone-input"
                />
              </div>
              
              <button type="submit" className="login-submit-btn">
                Login
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Suppliers;