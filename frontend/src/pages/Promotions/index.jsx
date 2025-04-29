import React, { useState, useMemo } from 'react';
import { Search, Smartphone, Headphones, ChevronDown, ChevronUp, Clock, Tag } from 'lucide-react';

const promotions = [
  {
    id: '1',
    title: 'iPhone 15 Pro',
    description: 'Experience the revolutionary A17 Pro chip, stunning ProMotion display, and professional-grade camera system. Limited time offer with free AirPods included!',
    productType: 'phone',
    originalPrice: '294,990.00',
    discountedPrice: '265,490.00',
    discountPercentage: 10,
    imageUrl: 'https://images.pexels.com/photos/5750001/pexels-photo-5750001.jpeg',
    isLimited: true,
    endDate: '2025-01-15T00:00:00Z',
    featured: true
  },
  {
    id: '2',
    title: 'Samsung Galaxy S23 Ultra',
    description: 'Featuring a 200MP camera, 8K video recording, and all-day battery life. Get a free Galaxy Watch with your purchase!',
    productType: 'phone',
    originalPrice: '359,000',
    discountedPrice: '299,000',
    discountPercentage: 17,
    imageUrl: 'https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg',
    isLimited: true,
    endDate: '2025-01-10T00:00:00Z',
    featured: true
  },
  {
    id: '3',
    title: 'Google Pixel 8',
    description: 'Powered by Google Tensor and featuring the most advanced Pixel camera yet with computational photography that delivers stunning photos in any light.',
    productType: 'phone',
    originalPrice: '209,490',
    discountedPrice: '179,490',
    discountPercentage: 14,
    imageUrl: 'https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg',
    isLimited: false,
    endDate: '2025-02-28T00:00:00Z',
    featured: false
  },
  {
    id: '4',
    title: 'AirPods Pro',
    description: 'Active Noise Cancellation, Adaptive EQ, and up to 6 hours of listening time. Wireless charging case included.',
    productType: 'accessory',
    originalPrice: '74,490',
    discountedPrice: '59,490',
    discountPercentage: 20,
    imageUrl: 'https://images.pexels.com/photos/3780681/pexels-photo-3780681.jpeg',
    isLimited: false,
    endDate: '2025-01-31T00:00:00Z',
    featured: true
  },
  {
    id: '5',
    title: 'Samsung Galaxy Watch 6',
    description: 'Track your health, fitness, and sleep with advanced sensors. Enjoy a vibrant AMOLED display and seamless integration with your smartphone.',
    productType: 'accessory',
    originalPrice: '104,500',
    discountedPrice: '83,490',
    discountPercentage: 20,
    imageUrl: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg',
    isLimited: true,
    endDate: '2025-01-05T00:00:00Z',
    featured: false
  },
  {
    id: '6',
    title: 'Nothing Phone (2)',
    description: 'Transparent design with Glyph Interface. Snapdragon 8+ Gen 1, 120Hz OLED display, and wireless charging. The most unique phone design of the year.',
    productType: 'phone',
    originalPrice: '179,490',
    discountedPrice: '149,490',
    discountPercentage: 17,
    imageUrl: 'https://images.pexels.com/photos/4957/person-woman-hand-smartphone.jpg',
    isLimited: false,
    endDate: '2025-02-15T00:00:00Z',
    featured: false
  },
  {
    id: '7',
    title: 'MagSafe Charger',
    description: 'Fast wireless charging for iPhone with perfect alignment every time. Compatible with all MagSafe-enabled iPhones.',
    productType: 'accessory',
    originalPrice: '11,690',
    discountedPrice: '8,690',
    discountPercentage: 26,
    imageUrl: 'https://images.pexels.com/photos/1092671/pexels-photo-1092671.jpeg',
    isLimited: false,
    endDate: '2025-03-15T00:00:00Z',
    featured: false
  },
  {
    id: '8',
    title: 'JBL Tune wireless headphone',
    description: 'Active noise cancellation, spatial audio, and up to 31 hours of battery life with the charging case. Perfect companion for your Pixel phone.',
    productType: 'accessory',
    originalPrice: '59,490',
    discountedPrice: '44,690',
    discountPercentage: 25,
    imageUrl: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg',
    isLimited: true,
    endDate: '2025-01-20T00:00:00Z',
    featured: false
  }
];

function Promotions() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [expandedCards, setExpandedCards] = useState({});

  const toggleCardExpansion = (id) => {
    setExpandedCards(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const filteredPromotions = useMemo(() => {
    return promotions.filter((promotion) => {
      const matchesType = selectedType === 'all' || promotion.productType === selectedType;
      const matchesSearch = promotion.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          promotion.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesType && matchesSearch;
    });
  }, [searchQuery, selectedType]);

  const featuredPromotions = useMemo(() => {
    return filteredPromotions.filter(promo => promo.featured);
  }, [filteredPromotions]);

  const nonFeaturedPromotions = filteredPromotions.filter(promo => !promo.featured);

  const getDaysRemaining = (endDateStr) => {
    const endDate = new Date(endDateStr);
    const today = new Date();
    const diffTime = endDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedType('all');
  };

  const renderPromotionCard = (promotion) => {
    const isExpanded = expandedCards[promotion.id];
    const daysRemaining = getDaysRemaining(promotion.endDate);

    return (
      <div 
        key={promotion.id}
        className={`bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden transform hover:-translate-y-1
          ${promotion.featured ? 'border-2 border-blue-500' : 'border border-gray-200'}`}
      >
        <div className="relative">
          <img 
            src={promotion.imageUrl} 
            alt={promotion.title} 
            className="w-full h-48 object-cover transition-transform duration-500 hover:scale-110"
          />
          
          {promotion.isLimited && (
            <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
              <Clock size={12} />
              <span>{daysRemaining} days left</span>
            </div>
          )}
          
          {promotion.featured && (
            <div className="absolute top-3 left-3 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">
              Featured
            </div>
          )}
        </div>
        
        <div className="p-4">
          <div className="justify-center items-start mb-2">
            <h3 className="text-l font-semibold text-gray-900">{promotion.title}</h3>
            <div className="text-md font-bold text-blue-600">
              Rs.{promotion.discountedPrice}
              <span className="ml-2 text-sm text-gray-500 line-through">Rs.{promotion.originalPrice}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2 mb-3">
            <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded flex items-center">
              <Tag size={12} className="mr-1" />
              {promotion.discountPercentage}% OFF
            </span>
            <span className="text-xs text-gray-500 capitalize">
              {promotion.productType}
            </span>
          </div>
          
          <div className={`overflow-hidden transition-all duration-300 ${isExpanded ? 'max-h-96' : 'max-h-12'}`}>
            <p className="text-gray-700 text-sm mb-4">
              {promotion.description}
            </p>
          </div>
          
          <button 
            onClick={() => toggleCardExpansion(promotion.id)}
            className="w-full flex items-center justify-center gap-1 mt-2 text-sm text-blue-600 hover:text-blue-800 transition-colors"
          >
            {isExpanded ? (
              <>
                <span>Show less</span>
                <ChevronUp size={16} />
              </>
            ) : (
              <>
                <span>Show more</span>
                <ChevronDown size={16} />
              </>
            )}
          </button>
        </div>
      </div>
    );
  };

  const renderPromotionGrid = (promotions, title) => {
    if (promotions.length === 0) return null;

    return (
      <div className="py-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">{title}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {promotions.map(renderPromotionCard)}
        </div>
      </div>
    );
  };

  const renderEmptyState = () => (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      {selectedType === 'all' ? (
        <Search size={48} className="text-gray-400 mb-4" />
      ) : (
        selectedType === 'phone' ? (
          <Smartphone size={48} className="text-gray-400 mb-4" />
        ) : (
          <Headphones size={48} className="text-gray-400 mb-4" />
        )
      )}
      <h3 className="text-xl font-semibold text-gray-800 mb-2">
        We couldn't find any promotions
        {searchQuery && ` matching "${searchQuery}"`}
        {selectedType !== 'all' && `${searchQuery ? ' and' : ' matching'} the ${selectedType} category`}
      </h3>
      <p className="text-gray-600 mb-6">Try adjusting your search or filter criteria</p>
      <button
        onClick={resetFilters}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        Clear all filters
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <h1 className="text-3xl font-bold text-gray-900">Promotions</h1>
            
            <div className="flex items-center gap-2 w-full md:w-auto">
              <div className="relative flex-grow md:w-64">
                <input
                  type="text"
                  placeholder="Search promotions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              </div>
              
              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedType('all')}
                  className={`px-4 py-2 rounded-lg transition-all ${
                    selectedType === 'all'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setSelectedType('phone')}
                  className={`px-4 py-2 rounded-lg transition-all flex items-center gap-1 ${
                    selectedType === 'phone'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Smartphone size={16} />
                  <span className="hidden sm:inline">Phones</span>
                </button>
                <button
                  onClick={() => setSelectedType('accessory')}
                  className={`px-4 py-2 rounded-lg transition-all flex items-center gap-1 ${
                    selectedType === 'accessory'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Headphones size={16} />
                  <span className="hidden sm:inline">Accessories</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto px-4 pb-16">
        {filteredPromotions.length === 0 ? (
          renderEmptyState()
        ) : (
          <>
            {renderPromotionGrid(featuredPromotions, "Featured Promotions")}
            {renderPromotionGrid(nonFeaturedPromotions, "All Promotions")}
          </>
        )}
      </main>
      
      <footer className="bg-white border-t border-gray-200 py-6">
        <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} Phone Shop. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

export default Promotions;