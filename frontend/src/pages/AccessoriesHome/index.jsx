import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { IoSearchOutline, IoFilterOutline, IoStarOutline, IoStar, IoAddOutline } from 'react-icons/io5';

const sampleAccessories = [
  {
    id: 1,
    name: "Premium Leather Case",
    type: "case",
    price: 3500,
    brand: "CaseMate",
    phoneModel: "iPhone 15 Pro",
    image: "https://bellroy-product-images.imgix.net/bellroy_dot_com_gallery_image/USD/PMYH-AGV-133/0?auto=format&fit=crop&w=1500&h=1500",
    rating: 4.5,
    reviews: 128
  },
  {
    id: 2,
    name: "Fast Charging Adapter",
    type: "charger",
    price: 4500,
    brand: "Anker",
    phoneModel: "Samsung S24",
    image: "https://celltronics.lk/wp-content/uploads/2022/02/ry-u30aw_04.png",
    rating: 4.8,
    reviews: 256
  },
  {
    id: 3,
    name: "Wireless Earbuds",
    type: "earphones",
    price: 12000,
    brand: "Sony",
    phoneModel: "Universal",
    image: "https://images.pexels.com/photos/3780681/pexels-photo-3780681.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    rating: 4.7,
    reviews: 512
  },
  {
    id: 4,
    name: "Tempered Glass Screen Protector",
    type: "screenProtector",
    price: 1500,
    brand: "Spigen",
    phoneModel: "iPhone 14",
    image: "https://celltronics.lk/wp-content/uploads/2022/06/Samsung-Tempered-Glass.jpg",
    rating: 4.3,
    reviews: 89
  },
  {
    id: 5,
    name: "20000mAh Power Bank",
    type: "powerBank",
    price: 8500,
    brand: "Anker",
    phoneModel: "Universal",
    image: "https://i0.wp.com/directdealz.lk/wp-content/uploads/2024/10/Aspor-A316-20000-22.5W-Portable-Power-Bank-with-Built-in-Cable.png?fit=2400%2C2400&ssl=1",
    rating: 4.9,
    reviews: 345
  },
  {
    id: 6,
    name: "Phone Stand Holder",
    type: "stand",
    price: 2500,
    brand: "Generic",
    phoneModel: "Universal",
    image: "https://m.media-amazon.com/images/I/61d7kG8IRbL._AC_SL1292_.jpg",
    rating: 4.2,
    reviews: 67
  }
];

const accessoryTypes = [
  { value: 'all', label: 'All' },
  { value: 'charger', label: 'Chargers' },
  { value: 'case', label: 'Cases' },
  { value: 'earphones', label: 'Earphones' },
  { value: 'screenProtector', label: 'Screen Protectors' },
  { value: 'powerBank', label: 'Power Banks' },
  { value: 'stand', label: 'Phone Stands' }
];

function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <span key={star}>
          {star <= rating ? (
            <IoStar className="w-4 h-4 text-yellow-400" />
          ) : (
            <IoStarOutline className="w-4 h-4 text-yellow-400" />
          )}
        </span>
      ))}
    </div>
  );
}

function AccessoryCard({ accessory }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={accessory.image}
          alt={accessory.name}
          className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-4 right-4 bg-white/90 px-3 py-1 rounded-full">
          <span className="text-sm font-semibold text-gray-900">
            LKR {accessory.price.toLocaleString()}
          </span>
        </div>
      </div>
      
      <div className="p-5">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {accessory.name}
        </h3>
        
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm text-gray-600">{accessory.brand}</span>
          <span className="text-sm text-gray-600">{accessory.phoneModel}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <StarRating rating={accessory.rating} />
            <span className="text-sm text-gray-500">
              ({accessory.reviews})
            </span>
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors duration-200">
            View Details
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function AccessoriesHome() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const navigate = useNavigate();
  
  const filteredAccessories = sampleAccessories
    .filter(accessory => 
      (selectedType === 'all' || accessory.type === selectedType) &&
      (accessory.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
       accessory.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
       accessory.phoneModel.toLowerCase().includes(searchQuery.toLowerCase()))
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'priceLow':
          return a.price - b.price;
        case 'priceHigh':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        default:
          return 0;
      }
    });

  const handleAddAccessory = () => {
    navigate('/addAccessories');
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-gray-800 text-white py-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center px-4">
          <h1
            onClick={() => navigate("/")}
            className="text-2xl font-bold cursor-pointer"
          >
            Grand Mobile
          </h1>
          <nav>
            <button
              onClick={() => navigate("/promotions")}
              className="mr-4 hover:underline"
            >
              Promotions
            </button>
            <button
              onClick={() => navigate("/displayStaff")}
              className="mr-4 hover:underline"
            >
              Staff
            </button>
            <button
              onClick={() => navigate("/phones")}
              className="mr-4 hover:underline"
            >
              Phones
            </button>
            <button
              onClick={() => navigate("/accessoriesHome")}
              className="hover:underline"
            >
              Accessories
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              Phone Accessories
            </h1>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAddAccessory}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 shadow-md"
            >
              <IoAddOutline className="w-5 h-5" />
              <span>Add Accessory</span>
            </motion.button>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
            <div className="flex items-center gap-4 w-full md:w-auto">
              <div className="relative flex-1 md:w-64">
                <input
                  type="text"
                  placeholder="Search accessories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <IoSearchOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              </div>
              
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-white pl-4 pr-10 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
                >
                  <option value="featured">Featured</option>
                  <option value="priceLow">Price: Low to High</option>
                  <option value="priceHigh">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
                <IoFilterOutline className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
              </div>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-4 mb-8">
            {accessoryTypes.map((type) => (
              <button
                key={type.value}
                onClick={() => setSelectedType(type.value)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                  selectedType === type.value
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {type.label}
              </button>
            ))}
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAccessories.map((accessory) => (
              <AccessoryCard key={accessory.id} accessory={accessory} />
            ))}
          </div>
          
          {filteredAccessories.length === 0 && (
            <div className="text-center py-12">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                No accessories found
              </h2>
              <p className="text-gray-600">
                Try adjusting your search or filter criteria
              </p>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-4">
        <div className="container mx-auto text-center">
          <p>&copy; 2025 Grand Mobile. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default AccessoriesHome;