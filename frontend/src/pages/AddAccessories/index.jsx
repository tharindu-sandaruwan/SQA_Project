import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AddAccessories() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    accessoryName: '',
    accessoryType: '',
    price: '',
    phoneModel: '',
    brand: '',
    compatibleModels: [],
    accessoryDescription: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  const phoneModels = [
    { value: 'iphone15pro', label: 'iPhone 15 Pro' },
    { value: 'iphone15', label: 'iPhone 15' },
    { value: 'iphone14pro', label: 'iPhone 14 Pro' },
    { value: 'iphone14', label: 'iPhone 14' },
    { value: 'iphone13', label: 'iPhone 13' },
    { value: 'iphoneSE', label: 'iPhone SE' },
    { value: 'samsungS24Ultra', label: 'Samsung Galaxy S24 Ultra' },
    { value: 'samsungS24', label: 'Samsung Galaxy S24' },
    { value: 'samsungS23', label: 'Samsung Galaxy S23' },
    { value: 'samsungA54', label: 'Samsung Galaxy A54' },
    { value: 'pixel8Pro', label: 'Google Pixel 8 Pro' },
    { value: 'pixel8', label: 'Google Pixel 8' },
    { value: 'oneplus12', label: 'OnePlus 12' }
  ];

  const accessoryTypes = [
    { value: 'charger', label: 'Charger' },
    { value: 'case', label: 'Case' },
    { value: 'earphones', label: 'Earphones' },
    { value: 'screenProtector', label: 'Screen Protector' },
    { value: 'powerBank', label: 'Power Bank' },
    { value: 'cable', label: 'Cable' },
    { value: 'stand', label: 'Phone Stand' },
    { value: 'other', label: 'Other' }
  ];

  const validate = () => {
    const newErrors = {};
    
    if (!formData.accessoryName) newErrors.accessoryName = "Accessory name is required";
    else if (formData.accessoryName.length > 20) newErrors.accessoryName = "Name cannot exceed 20 characters";
    else if (!/^[a-zA-Z0-9 -]*$/.test(formData.accessoryName)) newErrors.accessoryName = "No special symbols allowed";
    
    if (!formData.accessoryType) newErrors.accessoryType = "Accessory type is required";
    
    if (!formData.price) newErrors.price = "Price is required";
    else if (formData.price <= 0) newErrors.price = "Price must be positive";
    
    if (!formData.phoneModel) newErrors.phoneModel = "Phone model is required";
    
    if (formData.brand && formData.brand.length > 20) newErrors.brand = "Brand name too long";
    
    if (formData.accessoryDescription && formData.accessoryDescription.length > 200) 
      newErrors.accessoryDescription = "Description too long";

    if (!previewImage) newErrors.accessoryImage = "Image is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCompatibleModelsChange = (selectedValues) => {
    setFormData(prev => ({ 
      ...prev, 
      compatibleModels: selectedValues 
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!['image/jpeg', 'image/png'].includes(file.type)) {
        alert('Please upload only JPG or PNG images');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        alert('File size should not exceed 5MB');
        return;
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewImage(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        setIsSubmitting(true);
        console.log('Form data:', formData);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        alert('Accessory added successfully!');
        resetForm();
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      accessoryName: '',
      accessoryType: '',
      price: '',
      phoneModel: '',
      brand: '',
      compatibleModels: [],
      accessoryDescription: ''
    });
    setPreviewImage(null);
    setErrors({});
  };

  const handleReset = () => {
    resetForm();
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
      <main className="flex-grow">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8 my-10">
          <h2 className="text-3xl font-semibold text-gray-900 text-center mb-8">
            Add New Accessory
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input 
              label="Accessory Name" 
              name="accessoryName" 
              value={formData.accessoryName}
              onChange={handleChange} 
              error={errors.accessoryName} 
              placeholder="e.g., iPhone 15 Pro Case"
            />
            
            <Select 
              label="Accessory Type" 
              name="accessoryType" 
              value={formData.accessoryType}
              options={accessoryTypes} 
              onChange={handleChange} 
              error={errors.accessoryType} 
            />
            
            <Input 
              label="Price (LKR)" 
              name="price" 
              type="number" 
              value={formData.price}
              onChange={handleChange} 
              error={errors.price}
              placeholder="e.g., 1990"
            />
            
            <Select 
              label="Phone Model" 
              name="phoneModel" 
              value={formData.phoneModel}
              options={phoneModels} 
              onChange={handleChange} 
              error={errors.phoneModel} 
            />
            
            <Input 
              label="Brand (Optional)" 
              name="brand" 
              value={formData.brand}
              onChange={handleChange} 
              error={errors.brand} 
              placeholder="e.g., Spigen, Apple"
            />
            
            <MultiSelect 
              label="Compatible Models" 
              name="compatibleModels" 
              options={phoneModels.filter(model => model.value !== formData.phoneModel)} 
              value={formData.compatibleModels}
              onChange={handleCompatibleModelsChange} 
              error={errors.compatibleModels} 
            />
            
            <TextArea 
              label="Description" 
              name="accessoryDescription" 
              value={formData.accessoryDescription}
              onChange={handleChange} 
              error={errors.accessoryDescription} 
            />

            <FileInput 
              label="Image Upload" 
              name="accessoryImage" 
              onChange={handleImageChange} 
              error={errors.accessoryImage}
              previewImage={previewImage}
            />
            
            <div className="col-span-1 md:col-span-2 flex justify-end gap-4 pt-6">
              <button
                type="button"
                onClick={handleReset}
                className="px-6 py-2.5 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="px-6 py-2.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200 disabled:bg-blue-300"
              >
                {isSubmitting ? 'Adding...' : 'Add Accessory'}
              </button>
            </div>
          </div>
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

// Reusable component implementations remain the same...
function Input({ label, name, type = "text", value, onChange, error, placeholder  }) {
  return (
    <div className="flex flex-col">
      <label htmlFor={name} className="mb-1 font-medium text-gray-700">
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`border rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          error ? "border-red-500" : "border-gray-300"
        }`}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}

function Select({ label, name, options, value, onChange, error }) {
  return (
    <div className="flex flex-col">
      <label htmlFor={name} className="mb-1 font-medium text-gray-700">
        {label}
      </label>
      <select
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        className={`border rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          error ? "border-red-500" : "border-gray-300"
        }`}
      >
        <option value="">Select {label}</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}

function MultiSelect({ label, name, options, value, onChange, error }) {
  const [isOpen, setIsOpen] = useState(false);
  const selectedLabels = options
    .filter(opt => value.includes(opt.value))
    .map(opt => opt.label);

  const handleOptionClick = (optValue) => {
    let newValue;
    if (value.includes(optValue)) {
      newValue = value.filter(v => v !== optValue);
    } else {
      newValue = [...value, optValue];
    }
    onChange(newValue);
  };

  return (
    <div className="flex flex-col">
      <label htmlFor={name} className="mb-1 font-medium text-gray-700">
        {label}
      </label>
      <div className="relative">
        <div
          onClick={() => setIsOpen(!isOpen)}
          className={`border rounded-xl px-4 py-2 cursor-pointer flex items-center justify-between ${
            error ? "border-red-500" : "border-gray-300"
          }`}
        >
          <div className="flex flex-wrap gap-1">
            {selectedLabels.length > 0 ? (
              selectedLabels.map((label, index) => (
                <span key={index} className="bg-blue-100 text-blue-800 text-sm px-2 py-0.5 rounded-full">
                  {label}
                </span>
              ))
            ) : (
              <span className="text-gray-400">Select {label} (Optional)</span>
            )}
          </div>
          <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
        
        {isOpen && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-xl shadow-lg max-h-48 overflow-auto">
            {options.map((opt) => (
              <div
                key={opt.value}
                onClick={() => handleOptionClick(opt.value)}
                className={`px-4 py-2 cursor-pointer hover:bg-gray-50 flex items-center ${
                  value.includes(opt.value) ? "bg-blue-50" : ""
                }`}
              >
                <div className={`w-4 h-4 mr-2 border rounded ${
                  value.includes(opt.value) ? "bg-blue-500 border-blue-500" : "border-gray-300"
                }`}>
                  {value.includes(opt.value) && (
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                {opt.label}
              </div>
            ))}
          </div>
        )}
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}

function TextArea({ label, name, value, onChange, error }) {
  return (
    <div className="flex flex-col">
      <label htmlFor={name} className="mb-1 font-medium text-gray-700">
        {label}
      </label>
      <textarea
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        className={`border rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-32 resize-y ${
          error ? "border-red-500" : "border-gray-300"
        }`}
        placeholder="Enter description (optional)"
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}

function FileInput({ label, name, onChange, error, previewImage }) {
  return (
    <div className="flex flex-col">
      <label className="mb-1 font-medium text-gray-700">{label}</label>
      <div className={`border-2 border-dashed rounded-xl p-2 ${error ? "border-red-500" : "border-gray-300"}`}>
        {!previewImage ? (
          <label className="flex flex-col items-center justify-center p-6 cursor-pointer hover:bg-gray-50 transition-colors">
            <div className="text-blue-500 text-4xl mb-2">↑</div>
            <span className="text-gray-600">Click to upload image</span>
            <p className="text-sm text-gray-400 mt-1">JPG or PNG, max 5MB</p>
            <input
              type="file"
              name={name}
              accept=".jpg,.jpeg,.png"
              onChange={onChange}
              className="hidden"
            />
          </label>
        ) : (
          <div className="relative p-2">
            <img
              src={previewImage}
              alt="Preview"
              className="w-full h-40 object-cover rounded-lg"
            />
            <button
              type="button"
              onClick={() => onChange({ target: { files: [] } })}
              className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
            >
              ✕
            </button>
          </div>
        )}
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}