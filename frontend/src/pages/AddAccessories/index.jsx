import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { IoCloudUploadOutline, IoTrashOutline, IoCheckmark, IoChevronDownOutline, IoClose } from 'react-icons/io5';

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

function InputField({ label, name, type = 'text', placeholder, register, rules, error }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={name} className="text-sm font-medium text-gray-700">
        {label}
        {rules?.required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        id={name}
        type={type}
        placeholder={placeholder}
        className={`w-full px-4 py-2.5 rounded-lg border ${error ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200`}
        {...register(name, rules)}
      />
      {error && (
        <p className="text-red-500 text-sm mt-1">{error.message}</p>
      )}
    </div>
  );
}

function SelectField({ label, name, placeholder, options, register, rules, error }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={name} className="text-sm font-medium text-gray-700">
        {label}
        {rules?.required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div className="relative">
        <select
          id={name}
          className={`w-full px-4 py-2.5 rounded-lg border ${error ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 appearance-none bg-white`}
          {...register(name, rules)}
        >
          <option value="">{placeholder}</option>
          {options.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <IoChevronDownOutline className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
      </div>
      {error && (
        <p className="text-red-500 text-sm mt-1">{error.message}</p>
      )}
    </div>
  );
}

function MultiSelect({ label, name, placeholder, options, setValue, register, error }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);

  register(name);

  const toggleOption = (option) => {
    let newSelected;
    if (selectedOptions.some(item => item.value === option.value)) {
      newSelected = selectedOptions.filter(item => item.value !== option.value);
    } else {
      newSelected = [...selectedOptions, option];
    }
    setSelectedOptions(newSelected);
    setValue(name, newSelected.map(item => item.value));
  };

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <div className="relative">
        <div
          className={`w-full px-4 py-2.5 rounded-lg border ${error ? 'border-red-500' : 'border-gray-300'} cursor-pointer min-h-[42px] flex items-center`}
          onClick={() => setIsOpen(!isOpen)}
        >
          {selectedOptions.length === 0 ? (
            <span className="text-gray-400">{placeholder}</span>
          ) : (
            <div className="flex flex-wrap gap-2">
              {selectedOptions.map(option => (
                <span
                  key={option.value}
                  className="bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded-full flex items-center gap-1"
                >
                  {option.label}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleOption(option);
                    }}
                    className="hover:bg-blue-200 rounded-full p-0.5"
                  >
                    <IoClose className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-full left-0 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10 max-h-60 overflow-auto"
            >
              {options.map(option => (
                <div
                  key={option.value}
                  className={`px-4 py-2 cursor-pointer flex items-center justify-between hover:bg-gray-50 ${
                    selectedOptions.some(item => item.value === option.value)
                      ? 'bg-blue-50 text-blue-600'
                      : ''
                  }`}
                  onClick={() => toggleOption(option)}
                >
                  {option.label}
                  {selectedOptions.some(item => item.value === option.value) && (
                    <IoCheckmark className="text-blue-600" />
                  )}
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function FileUpload({ label, name, onChange, error, previewImage }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <div className={`border-2 border-dashed rounded-lg ${error ? 'border-red-500' : 'border-gray-300'}`}>
        {!previewImage ? (
          <label className="flex flex-col items-center justify-center p-8 cursor-pointer hover:bg-gray-50 transition-colors duration-200">
            <IoCloudUploadOutline className="w-12 h-12 text-blue-500 mb-2" />
            <span className="text-gray-600">Click to upload image</span>
            <p className="text-sm text-gray-400 mt-1">JPG or PNG, max 5MB</p>
            <input
              type="file"
              accept=".jpg,.jpeg,.png"
              onChange={onChange}
              className="hidden"
            />
          </label>
        ) : (
          <div className="relative p-4">
            <img
              src={previewImage}
              alt="Preview"
              className="w-full h-48 object-cover rounded-lg"
            />
            <button
              type="button"
              onClick={() => {
                onChange({ target: { files: [] } });
              }}
              className="absolute top-6 right-6 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors duration-200"
            >
              <IoTrashOutline className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
      {error && (
        <p className="text-red-500 text-sm mt-1">{error.message}</p>
      )}
    </div>
  );
}

function AddAccessories() {
  const [previewImage, setPreviewImage] = useState(null);
  
  const { 
    register, 
    handleSubmit, 
    formState: { errors, isSubmitting },
    reset,
    setValue,
    watch 
  } = useForm({
    defaultValues: {
      accessoryName: '',
      accessoryType: '',
      price: '',
      phoneModel: '',
      brand: '',
      compatibleModels: [],
      accessoryDescription: '',
      accessoryImage: null
    }
  });

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
      
      setValue('accessoryImage', file);
      const reader = new FileReader();
      reader.onload = (event) => setPreviewImage(event.target.result);
      reader.readAsDataURL(file);
    } else {
      setValue('accessoryImage', null);
      setPreviewImage(null);
    }
  };

  const onSubmit = async (data) => {
    try {
      console.log('Form data:', data);
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert('Accessory added successfully!');
      reset();
      setPreviewImage(null);
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to add accessory. Please try again.');
    }
  };

  const watchedPhoneModel = watch('phoneModel');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-6 sm:p-10">
        <h1 className="text-3xl font-semibold text-gray-900 text-center mb-8">
          Add New Accessory
        </h1>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-6">
              <InputField
                label="Accessory Name"
                name="accessoryName"
                placeholder="Enter accessory name"
                register={register}
                rules={{ 
                  required: "Accessory name is required",
                  maxLength: { value: 100, message: "Name cannot exceed 100 characters" },
                  pattern: { 
                    value: /^[a-zA-Z0-9 -]*$/,
                    message: "No special symbols allowed"
                  }
                }}
                error={errors.accessoryName}
              />
              
              <SelectField
                label="Accessory Type"
                name="accessoryType"
                placeholder="Select accessory type"
                options={accessoryTypes}
                register={register}
                rules={{ required: "Accessory type is required" }}
                error={errors.accessoryType}
              />
              
              <InputField
                label="Price (LKR)"
                name="price"
                type="number"
                placeholder="Enter price"
                register={register}
                rules={{ 
                  required: "Price is required",
                  min: { value: 0, message: "Price must be positive" }
                }}
                error={errors.price}
              />
              
              <SelectField
                label="Phone Model"
                name="phoneModel"
                placeholder="Select phone model"
                options={phoneModels}
                register={register}
                rules={{ required: "Phone model is required" }}
                error={errors.phoneModel}
              />
            </div>
            
            <div className="space-y-6">
              <InputField
                label="Brand"
                name="brand"
                placeholder="Enter brand name (optional)"
                register={register}
                rules={{ maxLength: { value: 50, message: "Brand name too long" } }}
                error={errors.brand}
              />
              
              <MultiSelect
                label="Compatible Models"
                name="compatibleModels"
                placeholder="Select compatible models"
                options={phoneModels.filter(model => model.value !== watchedPhoneModel)}
                setValue={setValue}
                register={register}
                error={errors.compatibleModels}
              />
              
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  {...register("accessoryDescription", {
                    maxLength: { value: 500, message: "Description too long" }
                  })}
                  placeholder="Enter description (optional)"
                  className={`w-full px-4 py-2.5 rounded-lg border ${errors.accessoryDescription ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 min-h-[120px] resize-y`}
                />
                {errors.accessoryDescription && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.accessoryDescription.message}
                  </p>
                )}
              </div>
              
              <FileUpload
                label="Image Upload"
                name="accessoryImage"
                onChange={handleImageChange}
                error={errors.accessoryImage}
                previewImage={previewImage}
              />
            </div>
          </div>
          
          <div className="flex justify-end gap-4 pt-6">
            <button
              type="button"
              onClick={() => {
                reset();
                setPreviewImage(null);
              }}
              className="px-6 py-2.5 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200 disabled:bg-blue-300"
            >
              {isSubmitting ? 'Adding...' : 'Add Accessory'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddAccessories;