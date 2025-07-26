# Supplier Hub - React Supplier Listing Application

A comprehensive React application for browsing and contacting suppliers with advanced search, filtering, and authentication features.

## Features

### 🏪 Supplier Listing
- **Card Layout**: Beautiful card-based design showing supplier information
- **40 Dummy Suppliers**: Pre-populated with diverse suppliers across multiple Indian cities
- **High-Quality Images**: Using Unsplash images for realistic supplier photos

### 🔍 Search & Filter
- **Search Bar**: Search by supplier name or products
- **City Filter**: Filter suppliers by city location
- **Delivery Filter**: Filter by delivery availability
- **Sort by Rating**: Automatically sorted by highest ratings

### ⭐ Supplier Information
- **Name & Location**: Clear supplier identification
- **Star Ratings**: Visual 5-star rating system with half-star support
- **Products**: Categorized product tags
- **Pricing**: Clear pricing information
- **Delivery Badge**: Visual indicator for delivery availability

### 🔐 Authentication System
- **Login Protection**: WhatsApp contact requires login
- **Phone Authentication**: Simple phone number-based login
- **Persistent Login**: Login status saved in localStorage
- **Logout Functionality**: Easy logout option

### 📱 WhatsApp Integration
- **Direct Contact**: One-click WhatsApp contact (https://wa.me/91{number})
- **Login Required**: Contact buttons only shown after authentication

### 📱 Responsive Design
- **Mobile-First**: Optimized for mobile devices
- **Tablet Support**: Responsive grid layout
- **Desktop Optimized**: Beautiful desktop experience
- **Touch-Friendly**: Large touch targets for mobile

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation Steps

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm start
   ```

3. **Open Browser**
   - Navigate to `http://localhost:3000`
   - The app will automatically reload on code changes

## Project Structure

```
supplier-listing-app/
├── public/
│   ├── index.html
│   └── suppliers.json          # Supplier data
├── src/
│   ├── components/
│   │   ├── Suppliers.jsx       # Main suppliers component
│   │   └── Suppliers.css       # Suppliers styling
│   ├── App.jsx                 # Main app with routing
│   ├── App.css                 # App styling
│   ├── index.js                # React entry point
│   └── index.css               # Global styles
├── package.json
└── README.md
```

## Usage Guide

### 🏠 Home Page
- Welcome page with navigation to suppliers
- Clean, modern design with call-to-action

### 📋 Suppliers Page (`/suppliers`)
1. **Browse Suppliers**: View all 40 suppliers in card layout
2. **Search**: Type in search bar to find suppliers by name or products
3. **Filter by City**: Use dropdown to filter by specific cities
4. **Filter by Delivery**: Show only suppliers with delivery options
5. **View Details**: Each card shows complete supplier information

### 🔑 Login Process
1. Click "Login to Contact" on any supplier card
2. Enter 10-digit phone number in modal
3. Login persists across browser sessions
4. Access WhatsApp contact buttons after login

### 📞 Contact Suppliers
- After login, click "Contact on WhatsApp" 
- Opens WhatsApp with pre-filled number
- Direct communication with suppliers

## Data Structure

### Supplier Object
```json
{
  "id": 1,
  "name": "Fresh Fruits Express",
  "city": "Mumbai",
  "products": ["Apples", "Bananas", "Oranges", "Mangoes"],
  "pricing": "₹50-200/kg",
  "whatsapp": "9876543210",
  "rating": 4.5,
  "deliveryAvailable": true,
  "image": "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=300&h=200&fit=crop"
}
```

## Technologies Used

- **React 18**: Modern React with hooks
- **React Router**: Client-side routing
- **CSS Grid**: Responsive layout system
- **Local Storage**: Persistent login state
- **Fetch API**: Data loading from JSON
- **CSS Animations**: Smooth transitions and effects

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Features

- **Lazy Loading**: Efficient image loading
- **Responsive Images**: Optimized image sizes
- **CSS Grid**: Efficient layout rendering
- **Local Storage**: Fast login state management

## Security Features

- **Input Validation**: Phone number validation
- **XSS Protection**: Safe content rendering
- **Local Storage**: Secure client-side storage

## Future Enhancements

- [ ] Advanced search with multiple filters
- [ ] Supplier favorites/bookmarks
- [ ] Review and rating system
- [ ] Map integration for supplier locations
- [ ] Email contact options
- [ ] Bulk contact features
- [ ] Admin panel for supplier management

## Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## License

This project is licensed under the MIT License.

## Support

For support, email support@supplierhub.com or create an issue in the repository.