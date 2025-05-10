// import React, { useState } from 'react';
// import { Calendar, Upload, Tag, Clock } from 'lucide-react';

// function AddPromotions() {
//   const [formData, setFormData] = useState({
//     title: '',
//     description: '',
//     productType: 'phone',
//     originalPrice: '',
//     discountedPrice: '',
//     imageUrl: '',
//     isLimited: false,
//     endDate: '',
//     featured: false
//   });

//   const calculateDiscountPercentage = () => {
//     if (formData.originalPrice && formData.discountedPrice) {
//       const original = parseFloat(formData.originalPrice);
//       const discounted = parseFloat(formData.discountedPrice);
//       return Math.round(((original - discounted) / original) * 100);
//     }
//     return 0;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
    
//     const newPromotion = {
//       id: Date.now().toString(),
//       ...formData,
//       originalPrice: parseFloat(formData.originalPrice),
//       discountedPrice: parseFloat(formData.discountedPrice),
//       discountPercentage: calculateDiscountPercentage()
//     };

//     // Add to existing promotions
//     const existingPromotions = JSON.parse(localStorage.getItem('promotions') || '[]');
//     localStorage.setItem('promotions', JSON.stringify([...existingPromotions, newPromotion]));

//     // Reset form
//     setFormData({
//       title: '',
//       description: '',
//       productType: 'phone',
//       originalPrice: '',
//       discountedPrice: '',
//       imageUrl: '',
//       isLimited: false,
//       endDate: '',
//       featured: false
//     });

//     alert('Promotion added successfully!');
//   };

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value
//     }));
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-2xl mx-auto">
//         <div className="bg-white rounded-xl shadow-lg p-8">
//           <div className="mb-8">
//             <h1 className="text-3xl font-bold text-gray-900">Add New Promotion</h1>
//             <p className="mt-2 text-gray-600">Create a new promotion for phones or accessories</p>
//           </div>

//           <form onSubmit={handleSubmit} className="space-y-6">
//             <div>
//               <label className="block text-sm font-medium text-gray-700">Title</label>
//               <input
//                 type="text"
//                 name="title"
//                 value={formData.title}
//                 onChange={handleChange}
//                 required
//                 className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700">Description</label>
//               <textarea
//                 name="description"
//                 value={formData.description}
//                 onChange={handleChange}
//                 required
//                 rows={4}
//                 className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700">Product Type</label>
//               <select
//                 name="productType"
//                 value={formData.productType}
//                 onChange={handleChange}
//                 className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
//               >
//                 <option value="phone">Phone</option>
//                 <option value="accessory">Accessory</option>
//               </select>
//             </div>

//             <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700">Original Price ($)</label>
//                 <input
//                   type="number"
//                   name="originalPrice"
//                   value={formData.originalPrice}
//                   onChange={handleChange}
//                   required
//                   min="0"
//                   step="0.01"
//                   className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700">Discounted Price ($)</label>
//                 <input
//                   type="number"
//                   name="discountedPrice"
//                   value={formData.discountedPrice}
//                   onChange={handleChange}
//                   required
//                   min="0"
//                   step="0.01"
//                   className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
//                 />
//               </div>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700">Image URL</label>
//               <div className="mt-1 flex rounded-lg shadow-sm">
//                 <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
//                   <Upload size={18} />
//                 </span>
//                 <input
//                   type="url"
//                   name="imageUrl"
//                   value={formData.imageUrl}
//                   onChange={handleChange}
//                   required
//                   className="flex-1 block w-full rounded-none rounded-r-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
//                   placeholder="https://example.com/image.jpg"
//                 />
//               </div>
//             </div>

//             <div className="flex items-center gap-6">
//               <div className="flex items-center">
//                 <input
//                   type="checkbox"
//                   name="isLimited"
//                   checked={formData.isLimited}
//                   onChange={handleChange}
//                   className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
//                 />
//                 <label className="ml-2 block text-sm text-gray-700">Limited Time Offer</label>
//               </div>

//               <div className="flex items-center">
//                 <input
//                   type="checkbox"
//                   name="featured"
//                   checked={formData.featured}
//                   onChange={handleChange}
//                   className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
//                 />
//                 <label className="ml-2 block text-sm text-gray-700">Featured Promotion</label>
//               </div>
//             </div>

//             {formData.isLimited && (
//               <div>
//                 <label className="block text-sm font-medium text-gray-700">End Date</label>
//                 <div className="mt-1 flex rounded-lg shadow-sm">
//                   <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
//                     <Calendar size={18} />
//                   </span>
//                   <input
//                     type="datetime-local"
//                     name="endDate"
//                     value={formData.endDate}
//                     onChange={handleChange}
//                     required={formData.isLimited}
//                     className="flex-1 block w-full rounded-none rounded-r-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
//                   />
//                 </div>
//               </div>
//             )}

//             {formData.originalPrice && formData.discountedPrice && (
//               <div className="flex items-center gap-2 p-4 bg-gray-50 rounded-lg">
//                 <Tag size={18} className="text-green-600" />
//                 <span className="text-sm font-medium text-green-600">
//                   Discount: {calculateDiscountPercentage()}% OFF
//                 </span>
//               </div>
//             )}

//             <div className="flex justify-end">
//               <button
//                 type="submit"
//                 className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
//               >
//                 Add Promotion
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default AddPromotions;



// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom'
// import { Calendar, Upload, Tag, Clock } from 'lucide-react';

// function AddPromotions() {
//   const initialFormData = {
//     title: '',
//     description: '',
//     productType: 'phone',
//     originalPrice: '',
//     discountPercentage: '',
//     imageUrl: '',
//     isLimited: false,
//     endDate: '',
//     featured: false
//   };

//   const [formData, setFormData] = useState(initialFormData);
//   const [discountedPrice, setDiscountedPrice] = useState('');
//   const navigate = useNavigate();
//   useEffect(() => {
//     if (formData.originalPrice && formData.discountPercentage) {
//       const original = parseFloat(formData.originalPrice);
//       const discount = parseFloat(formData.discountPercentage);
//       const discounted = original - (original * (discount / 100));
//       setDiscountedPrice(discounted.toFixed(2));
//     } else {
//       setDiscountedPrice('');
//     }
//   }, [formData.originalPrice, formData.discountPercentage]);

//   const handleSubmit = (e) => {
//     e.preventDefault();
    
//     const newPromotion = {
//       id: Date.now().toString(),
//       ...formData,
//       originalPrice: parseFloat(formData.originalPrice),
//       discountedPrice: parseFloat(discountedPrice),
//       discountPercentage: parseFloat(formData.discountPercentage)
//     };

//     // Add to existing promotions
//     const existingPromotions = JSON.parse(localStorage.getItem('promotions') || '[]');
//     localStorage.setItem('promotions', JSON.stringify([...existingPromotions, newPromotion]));

//     // Reset form
//     setFormData(initialFormData);
//     setDiscountedPrice('');

//     alert('Promotion added successfully!');
//   };

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value
//     }));
//   };

//   return (

//     <div className="min-h-screen flex flex-col bg-gray-100">
//         {/* Header */}
//       <header className="bg-gray-800 text-white py-4 shadow-md">
//         <div className="container mx-auto flex justify-between items-center px-4">
//           <h1
//             onClick={() => navigate("/")}
//             className="text-2xl font-bold cursor-pointer hover:text-gray-300 transition"
//           >
//             Grand Mobile
//           </h1>
//           <nav className="space-x-4"> {/* Added spacing */}
//             <button
//               onClick={() => navigate("/promotions")}
//               className="hover:underline"
//             >
//               Promotions
//             </button>
//             <button
//               onClick={() => navigate("/displayStaff")}
//               className="hover:underline"
//             >
//               Staff
//             </button>
//             <button
//               onClick={() => navigate("/phones")}
//               className="hover:underline"
//             >
//               Phones
//             </button>
//             <button
//               onClick={() => navigate("/accessoriesHome")}
//               className="hover:underline"
//             >
//               Accessories
//             </button>
//           </nav>
//         </div>
//       </header>
//     <div className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-2xl mx-auto">
//         <div className="bg-white rounded-xl shadow-lg p-8">
//           <div className="mb-8">
//             <h1 className="text-3xl font-bold text-gray-900">Add New Promotion</h1>
//             <p className="mt-2 text-gray-600">Create a new promotion for phones or accessories</p>
//           </div>

//           <form onSubmit={handleSubmit} className="space-y-6">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
//               <input
//                 type="text"
//                 name="title"
//                 value={formData.title}
//                 onChange={handleChange}
//                 required
//                 className="mt-1 block w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
//                 placeholder="Enter promotion title"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
//               <textarea
//                 name="description"
//                 value={formData.description}
//                 onChange={handleChange}
//                 required
//                 rows={4}
//                 className="mt-1 block w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
//                 placeholder="Enter promotion description"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">Product Type</label>
//               <select
//                 name="productType"
//                 value={formData.productType}
//                 onChange={handleChange}
//                 className="mt-1 block w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
//               >
//                 <option value="phone">Phone</option>
//                 <option value="accessory">Accessory</option>
//               </select>
//             </div>

//             <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Original Price ($)</label>
//                 <input
//                   type="number"
//                   name="originalPrice"
//                   value={formData.originalPrice}
//                   onChange={handleChange}
//                   required
//                   min="0"
//                   step="0.01"
//                   className="mt-1 block w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
//                   placeholder="0.00"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Discount Percentage (%)</label>
//                 <input
//                   type="number"
//                   name="discountPercentage"
//                   value={formData.discountPercentage}
//                   onChange={handleChange}
//                   required
//                   min="0"
//                   max="100"
//                   className="mt-1 block w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
//                   placeholder="0"
//                 />
//               </div>
//             </div>

//             {discountedPrice && (
//               <div className="p-4 bg-green-50 rounded-lg border border-green-200">
//                 <div className="flex items-center justify-between">
//                   <span className="text-sm font-medium text-green-800">Calculated Discounted Price:</span>
//                   <span className="text-lg font-bold text-green-800">${discountedPrice}</span>
//                 </div>
//               </div>
//             )}

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
//               <div className="mt-1 flex rounded-lg shadow-sm">
//                 <span className="inline-flex items-center px-4 rounded-l-lg border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
//                   <Upload size={18} />
//                 </span>
//                 <input
//                   type="url"
//                   name="imageUrl"
//                   value={formData.imageUrl}
//                   onChange={handleChange}
//                   required
//                   className="flex-1 block w-full rounded-none rounded-r-lg px-4 py-3 border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
//                   placeholder="https://example.com/image.jpg"
//                 />
//               </div>
//             </div>

//             <div className="flex items-center gap-6">
//               <div className="flex items-center">
//                 <input
//                   type="checkbox"
//                   name="isLimited"
//                   checked={formData.isLimited}
//                   onChange={handleChange}
//                   className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
//                 />
//                 <label className="ml-2 block text-sm text-gray-700">Limited Time Offer</label>
//               </div>

//               <div className="flex items-center">
//                 <input
//                   type="checkbox"
//                   name="featured"
//                   checked={formData.featured}
//                   onChange={handleChange}
//                   className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
//                 />
//                 <label className="ml-2 block text-sm text-gray-700">Featured Promotion</label>
//               </div>
//             </div>

//             {formData.isLimited && (
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
//                 <div className="mt-1 flex rounded-lg shadow-sm">
//                   <span className="inline-flex items-center px-4 rounded-l-lg border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
//                     <Calendar size={18} />
//                   </span>
//                   <input
//                     type="datetime-local"
//                     name="endDate"
//                     value={formData.endDate}
//                     onChange={handleChange}
//                     required={formData.isLimited}
//                     className="flex-1 block w-full rounded-none rounded-r-lg px-4 py-3 border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
//                   />
//                 </div>
//               </div>
//             )}

//             <div className="flex justify-end">
//               <button
//                 type="submit"
//                 className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors text-lg font-medium"
//               >
//                 Add Promotion
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//     </div>
//   );
// }

// export default AddPromotions;


import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Upload, Tag, Clock } from 'lucide-react';

function AddPromotions() {
  const initialFormData = {
    title: '',
    description: '',
    productType: 'phone',
    originalPrice: '',
    discountPercentage: '',
    imageUrl: '',
    isLimited: false,
    endDate: '',
    featured: false
  };

  const [formData, setFormData] = useState(initialFormData);
  const [discountedPrice, setDiscountedPrice] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (formData.originalPrice && formData.discountPercentage) {
      const original = parseFloat(formData.originalPrice);
      const discount = parseFloat(formData.discountPercentage);
      const discounted = original - (original * (discount / 100));
      setDiscountedPrice(discounted.toFixed(2));
    } else {
      setDiscountedPrice('');
    }
  }, [formData.originalPrice, formData.discountPercentage]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.originalPrice) newErrors.originalPrice = 'Original price is required';
    if (!formData.discountPercentage) newErrors.discountPercentage = 'Discount percentage is required';
    else if (formData.discountPercentage > 100) newErrors.discountPercentage = "Discount must be between 0-100%";
    if (!formData.imageUrl.trim()) {
  newErrors.imageUrl = 'Image URL is required';
} else {
  try {
    // Basic URL validation
    const url = new URL(formData.imageUrl);
    
    // Check protocol
    if (!['http:', 'https:'].includes(url.protocol)) {
      newErrors.imageUrl = 'URL must be a valid image URL';
    }
  } catch (e) {
    newErrors.imageUrl = 'Please enter a valid URL (e.g., https://example.com/image.jpg)';
  }
}
        
    if (formData.isLimited && !formData.endDate) newErrors.endDate = 'End date is required for limited offers';
    if (formData.isLimited && formData.endDate) {
        const selectedDate = new Date(formData.endDate);
        const currentDate = new Date();
        
        if (selectedDate < currentDate) {
          newErrors.endDate = 'End date cannot be in the past';
        }
      }
      


    
    // Validate discount percentage range
    if (formData.discountPercentage && 
        (parseFloat(formData.discountPercentage) < 0 || 
        parseFloat(formData.discountPercentage) > 100)) {
      newErrors.discountPercentage = 'Discount must be between 0-100%';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    
    if (!validateForm()) return;
    
    const newPromotion = {
      id: Date.now().toString(),
      ...formData,
      originalPrice: parseFloat(formData.originalPrice),
      discountedPrice: parseFloat(discountedPrice),
      discountPercentage: parseFloat(formData.discountPercentage)
    };

    const existingPromotions = JSON.parse(localStorage.getItem('promotions') || '[]');
    localStorage.setItem('promotions', JSON.stringify([...existingPromotions, newPromotion]));

    setFormData(initialFormData);
    setDiscountedPrice('');
    setErrors({});
    setIsSubmitted(false);

    alert('Promotion added successfully!');
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = {...prev};
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const getInputClass = (fieldName) => {
    return `mt-1 block w-full px-4 py-3 rounded-lg border shadow-sm focus:ring-2 ${
      errors[fieldName] ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
    }`;
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <header className="bg-gray-800 text-white py-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center px-4">
          <h1
            onClick={() => navigate("/")}
            className="text-2xl font-bold cursor-pointer hover:text-gray-300 transition"
          >
            Grand Mobile
          </h1>
          <nav className="space-x-4">
            <button onClick={() => navigate("/promotions")} className="hover:underline">
              Promotions
            </button>
            <button onClick={() => navigate("/displayStaff")} className="hover:underline">
              Staff
            </button>
            <button onClick={() => navigate("/phones")} className="hover:underline">
              Phones
            </button>
            <button onClick={() => navigate("/accessoriesHome")} className="hover:underline">
              Accessories
            </button>
          </nav>
        </div>
      </header>

      <div className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 flex-1">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900">Add New Promotion</h1>
              <p className="mt-2 text-gray-600">Create a new promotion for phones or accessories</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Title Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Title*</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className={getInputClass('title')}
                  placeholder="Enter promotion title"
                />
                {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
              </div>

              {/* Description Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description*</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  className={getInputClass('description')}
                  placeholder="Enter promotion description"
                />
                {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
              </div>

              {/* Product Type Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Product Type</label>
                <select
                  name="productType"
                  value={formData.productType}
                  onChange={handleChange}
                  className={getInputClass('productType')}
                >
                  <option value="phone">Phone</option>
                  <option value="accessory">Accessory</option>
                </select>
              </div>

              {/* Price Fields */}
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Original Price (Rs)*</label>
                  <input
                    type="number"
                    name="originalPrice"
                    value={formData.originalPrice}
                    onChange={handleChange}
                    min="0"
                    step="0.01"
                    className={getInputClass('originalPrice')}
                    placeholder="0.00"
                  />
                  {errors.originalPrice && <p className="mt-1 text-sm text-red-600">{errors.originalPrice}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Discount Percentage (%)*</label>
                  <input
                    type="number"
                    name="discountPercentage"
                    value={formData.discountPercentage}
                    onChange={handleChange}
                    className={getInputClass('discountPercentage')}
                    placeholder="0"
                    error={errors.accessoryDescription} 
                  />
                  {errors.discountPercentage && <p className="mt-1 text-sm text-red-600">{errors.discountPercentage}</p>}
                </div>
              </div>

              {/* Discounted Price Display */}
              {discountedPrice && (
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-green-800">Calculated Discounted Price:</span>
                    <span className="text-lg font-bold text-green-800">Rs.{discountedPrice}</span>
                  </div>
                </div>
              )}

              {/* Image URL Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Image URL*</label>
                <div className="mt-1 flex rounded-lg shadow-sm">
                  <span className="inline-flex items-center px-4 rounded-l-lg border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                    <Upload size={18} />
                  </span>
                  <input
                    type="url"
                    name="imageUrl"
                    value={formData.imageUrl}
                    onChange={handleChange}
                    className={`flex-1 block w-full rounded-none rounded-r-lg px-4 py-3 focus:ring-2 ${
                      errors.imageUrl ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
                    }`}
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
                {errors.imageUrl && <p className="mt-1 text-sm text-red-600">{errors.imageUrl}</p>}
              </div>

              {/* Checkbox Fields */}
              <div className="flex items-center gap-6">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="isLimited"
                    checked={formData.isLimited}
                    onChange={handleChange}
                    className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label className="ml-2 block text-sm text-gray-700">Limited Time Offer</label>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="featured"
                    checked={formData.featured}
                    onChange={handleChange}
                    className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label className="ml-2 block text-sm text-gray-700">Featured Promotion</label>
                </div>
              </div>

              {/* End Date Field (conditional) */}
              {formData.isLimited && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">End Date*</label>
                  <div className="mt-1 flex rounded-lg shadow-sm">
                    <span className="inline-flex items-center px-4 rounded-l-lg border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                      <Calendar size={18} />
                    </span>
                    <input
                      type="datetime-local"
                      name="endDate"
                      value={formData.endDate}
                      onChange={handleChange}
                      className={`flex-1 block w-full rounded-none rounded-r-lg px-4 py-3 focus:ring-2 ${
                        errors.endDate ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
                      }`}
                    />
                  </div>
                  {errors.endDate && <p className="mt-1 text-sm text-red-600">{errors.endDate}</p>}
                </div>
              )}

              {/* Submit Button */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors text-lg font-medium"
                >
                  Add Promotion
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddPromotions;