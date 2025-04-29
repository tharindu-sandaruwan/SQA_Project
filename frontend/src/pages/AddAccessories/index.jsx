import { useState } from 'react';

export default function AddAccessories() {
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
    else if (formData.accessoryName.length > 100) newErrors.accessoryName = "Name cannot exceed 100 characters";
    else if (!/^[a-zA-Z0-9 -]*$/.test(formData.accessoryName)) newErrors.accessoryName = "No special symbols allowed";
    
    if (!formData.accessoryType) newErrors.accessoryType = "Accessory type is required";
    
    if (!formData.price) newErrors.price = "Price is required";
    else if (formData.price <= 0) newErrors.price = "Price must be positive";
    
    if (!formData.phoneModel) newErrors.phoneModel = "Phone model is required";
    
    if (formData.brand && formData.brand.length > 50) newErrors.brand = "Brand name too long";
    else if (!formData.brand) newErrors.brand = "Brand name is required";
    
    if (formData.accessoryDescription && formData.accessoryDescription.length > 500) 
      newErrors.accessoryDescription = "Description too long";
    
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitting(true);
      try {
        const dataToSend = {
          accessoryName: formData.accessoryName,
          accessoryType: formData.accessoryType,
          price: Number(formData.price),
          phoneModel: formData.phoneModel,
          brand: formData.brand,
          compatibleModels: formData.compatibleModels,
          accessoryDescription: formData.accessoryDescription
        };

        const response = await fetch('http://localhost:5000/api/accessories', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dataToSend)
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to submit form');
        }

        const result = await response.json();
        console.log('Success:', result);
        alert('Accessory added successfully!');
        
        // Reset form
        setFormData({
          accessoryName: '',
          accessoryType: '',
          price: '',
          phoneModel: '',
          brand: '',
          compatibleModels: [],
          accessoryDescription: ''
        });
      } catch (error) {
        console.error('Error submitting form:', error);
        alert(error.message || 'Failed to add accessory. Please try again.');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleReset = () => {
    setFormData({
      accessoryName: '',
      accessoryType: '',
      price: '',
      phoneModel: '',
      brand: '',
      compatibleModels: [],
      accessoryDescription: ''
    });
    setErrors({});
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8 mt-10">
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
          label="Brand" 
          name="brand" 
          value={formData.brand}
          onChange={handleChange} 
          error={errors.brand} 
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
  );
}

function Input({ label, name, type = "text", value, onChange, error }) {
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