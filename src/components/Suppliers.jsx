import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import VoiceSearch from './VoiceSearch';
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
  const [favorites, setFavorites] = useState([]);
  const [reviews, setReviews] = useState({});
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewingSupplierId, setReviewingSupplierId] = useState(null);
  const [reviewText, setReviewText] = useState('');
  const { t } = useLanguage();

  // Check login status on component mount
  useEffect(() => {
    const loginStatus = localStorage.getItem('isLoggedIn');
    if (loginStatus === 'true') {
      setIsLoggedIn(true);
    }
    
    // Load favorites from localStorage
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
    
    // Load reviews from localStorage
    const savedReviews = localStorage.getItem('reviews');
    if (savedReviews) {
      setReviews(JSON.parse(savedReviews));
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
      alert(t('validPhoneError'));
    }
  };

  // Handle logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userPhone');
  };

  // Handle favorites
  const toggleFavorite = (supplierId) => {
    const newFavorites = favorites.includes(supplierId)
      ? favorites.filter(id => id !== supplierId)
      : [...favorites, supplierId];
    
    setFavorites(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
  };

  // Handle reviews
  const openReviewModal = (supplierId) => {
    setReviewingSupplierId(supplierId);
    setShowReviewModal(true);
    setReviewText('');
  };

  const submitReview = (e) => {
    e.preventDefault();
    if (!reviewText.trim()) {
      alert(t('reviewError'));
      return;
    }

    const userPhone = localStorage.getItem('userPhone') || 'Anonymous';
    const newReview = {
      id: Date.now(),
      text: reviewText,
      author: userPhone,
      date: new Date().toLocaleDateString()
    };

    const updatedReviews = {
      ...reviews,
      [reviewingSupplierId]: [
        ...(reviews[reviewingSupplierId] || []),
        newReview
      ]
    };

    setReviews(updatedReviews);
    localStorage.setItem('reviews', JSON.stringify(updatedReviews));
    setShowReviewModal(false);
    setReviewText('');
    alert(t('reviewSubmitted'));
  };

  // Handle voice search
  const handleVoiceResult = (transcript) => {
    setSearchTerm(transcript);
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
    return <div className="loading">{t('loading')}</div>;
  }

  return (
    <div className="suppliers-container">
      <div className="suppliers-header">
        <h1>{t('suppliersDirectory')}</h1>
        <p>{t('findBestSuppliers')}</p>
        
        {isLoggedIn && (
          <div className="user-info">
            <span>{t('welcome')} </span>
            <button onClick={handleLogout} className="logout-btn">{t('logout')}</button>
          </div>
        )}
      </div>

      {/* Search and Filter Controls */}
      <div className="controls">
        <div className="search-section">
          <div className="search-bar">
            <input
              type="text"
              placeholder={t('searchPlaceholder')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          <VoiceSearch 
            onVoiceResult={handleVoiceResult}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
        </div>

        <div className="filters">
          <select
            value={cityFilter}
            onChange={(e) => setCityFilter(e.target.value)}
            className="filter-select"
          >
            <option value="">{t('allCities')}</option>
            {uniqueCities.map(city => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>

          <select
            value={deliveryFilter}
            onChange={(e) => setDeliveryFilter(e.target.value)}
            className="filter-select"
          >
            <option value="">{t('allDeliveryOptions')}</option>
            <option value="available">{t('deliveryAvailable')}</option>
            <option value="notAvailable">{t('noDelivery')}</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="filter-select"
          >
            <option value="rating">{t('sortByRating')}</option>
          </select>
        </div>
      </div>

      {/* Suppliers Grid */}
      <div className="suppliers-grid">
        {filteredSuppliers.length === 0 ? (
          <div className="no-results">
            <p>{t('noResults')}</p>
          </div>
        ) : (
          filteredSuppliers.map(supplier => (
            <div key={supplier.id} className="supplier-card">
              <div className="supplier-image">
                <img src={supplier.image} alt={supplier.name} />
                {supplier.deliveryAvailable && (
                  <div className="delivery-badge">{t('deliveryBadge')}</div>
                )}
                <button
                  className={`favorite-btn ${favorites.includes(supplier.id) ? 'favorited' : ''}`}
                  onClick={() => toggleFavorite(supplier.id)}
                  title={favorites.includes(supplier.id) ? t('removeFromFavorites') : t('addToFavorites')}
                >
                  {favorites.includes(supplier.id) ? '❤️' : '🤍'}
                </button>
              </div>

              <div className="supplier-info">
                <h3 className="supplier-name">{supplier.name}</h3>
                <p className="supplier-city">📍 {supplier.city}</p>
                
                <div className="supplier-rating">
                  {renderStars(supplier.rating)}
                  <span className="rating-number">({supplier.rating})</span>
                </div>

                <div className="supplier-products">
                  <h4>{t('products')}:</h4>
                  <div className="products-list">
                    {supplier.products.map((product, index) => (
                      <span key={index} className="product-tag">
                        {product}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="supplier-pricing">
                  <strong>{t('pricing')}: {supplier.pricing}</strong>
                </div>

                {/* Reviews Section */}
                <div className="reviews-section">
                  <div className="reviews-header">
                    <h4>{t('reviews')} ({(reviews[supplier.id] || []).length})</h4>
                    {isLoggedIn && (
                      <button
                        onClick={() => openReviewModal(supplier.id)}
                        className="write-review-btn"
                      >
                        {t('writeReview')}
                      </button>
                    )}
                  </div>
                  
                  <div className="reviews-list">
                    {reviews[supplier.id] && reviews[supplier.id].length > 0 ? (
                      reviews[supplier.id].slice(-2).map((review) => (
                        <div key={review.id} className="review-item">
                          <p className="review-text">"{review.text}"</p>
                          <div className="review-meta">
                            <span className="review-author">- {review.author}</span>
                            <span className="review-date">{review.date}</span>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="no-reviews">{t('noReviews')}</p>
                    )}
                  </div>
                </div>

                <div className="supplier-actions">
                  {isLoggedIn ? (
                    <button
                      onClick={() => handleWhatsAppContact(supplier.whatsapp)}
                      className="whatsapp-btn"
                    >
                      💬 {t('contactWhatsApp')}
                    </button>
                  ) : (
                    <button
                      onClick={() => setShowLoginModal(true)}
                      className="login-prompt-btn"
                    >
                      🔒 {t('loginToContact')}
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
              <h2>{t('loginTitle')}</h2>
              <button
                onClick={() => setShowLoginModal(false)}
                className="close-btn"
              >
                ×
              </button>
            </div>
            
            <form onSubmit={handleLogin} className="login-form">
              <div className="form-group">
                <label htmlFor="phone">{t('phoneNumber')}:</label>
                <input
                  type="tel"
                  id="phone"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder={t('phoneNumberPlaceholder')}
                  maxLength="10"
                  pattern="[0-9]{10}"
                  required
                  className="phone-input"
                />
              </div>
              
              <button type="submit" className="login-submit-btn">
                {t('login')}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Review Modal */}
      {showReviewModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>{t('writeReview')}</h2>
              <button
                onClick={() => setShowReviewModal(false)}
                className="close-btn"
              >
                ×
              </button>
            </div>
            
            <form onSubmit={submitReview} className="review-form">
              <div className="form-group">
                <textarea
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  placeholder={t('reviewPlaceholder')}
                  className="review-textarea"
                  rows="4"
                  required
                />
              </div>
              
              <button type="submit" className="review-submit-btn">
                {t('submitReview')}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Suppliers;