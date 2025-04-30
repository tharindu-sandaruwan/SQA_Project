import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function PhoneForm() {
  const [formData, setFormData] = useState({
    phoneName: "",
    brand: "",
    modelNumber: "",
    warrantyPeriod: "",
    condition: "New",
    storageCapacity: "",
    color: "",
    purchasePrice: "",
    sellingPrice: "",
    quantity: "",
    dateAdded: "",
    image: null,
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (!formData.phoneName) newErrors.phoneName = "Phone Name is required";
    if (!formData.brand) newErrors.brand = "Brand is required";
    if (!formData.modelNumber)
      newErrors.modelNumber = "Model Number is required";
    if (!formData.storageCapacity)
      newErrors.storageCapacity = "Storage Capacity is required";
    if (!formData.color) newErrors.color = "Color is required";
    if (!formData.purchasePrice || formData.purchasePrice <= 0)
      newErrors.purchasePrice = "Purchase Price must be positive";
    if (
      !formData.sellingPrice ||
      formData.sellingPrice < formData.purchasePrice
    )
      newErrors.sellingPrice =
        "Selling Price should not be less than Purchase Price";
    if (!formData.quantity || isNaN(formData.quantity))
      newErrors.quantity = "Quantity must be a number";
    if (formData.warrantyPeriod && formData.warrantyPeriod <= 0)
      newErrors.warrantyPeriod = "Warranty Period must be greater than 0";
    if (!formData.condition) newErrors.condition = "Condition is required";
    if (!formData.dateAdded) newErrors.dateAdded = "Date Added is required";
    if (!formData.image) newErrors.image = "Phone image is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("Submitted Data:", formData);
      toast.success("Phone successfully submitted!");
    } else {
      toast.error("Please fix the errors in the form before submitting.");
    }
  };
  

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({ ...prev, image: file }));
  };

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-2xl p-8 mt-10">
      <ToastContainer  position="top-center" />
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        Add New Phone
      </h2>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <Input
          label="Phone Name"
          name="phoneName"
          onChange={handleChange}
          error={errors.phoneName}
        />
        <Input
          label="Brand"
          name="brand"
          onChange={handleChange}
          error={errors.brand}
        />
        <Input
          label="Model Number"
          name="modelNumber"
          onChange={handleChange}
          error={errors.modelNumber}
        />
        <Input
          label="Warranty Period (Months)"
          name="warrantyPeriod"
          type="number"
          onChange={handleChange}
          error={errors.warrantyPeriod}
        />
        <Select
          label="Condition"
          name="condition"
          options={["New", "Used", "Refurbished"]}
          onChange={handleChange}
          error={errors.condition}
        />
        <Input
          label="Storage Capacity"
          name="storageCapacity"
          onChange={handleChange}
          error={errors.storageCapacity}
        />
        <Input
          label="Color"
          name="color"
          onChange={handleChange}
          error={errors.color}
        />
        <Input
          label="Purchase Price"
          name="purchasePrice"
          type="number"
          onChange={handleChange}
          error={errors.purchasePrice}
        />
        <Input
          label="Selling Price"
          name="sellingPrice"
          type="number"
          onChange={handleChange}
          error={errors.sellingPrice}
        />
        <Input
          label="Quantity"
          name="quantity"
          type="number"
          onChange={handleChange}
          error={errors.quantity}
        />
        <Input
          label="Date Added"
          name="dateAdded"
          type="date"
          onChange={handleChange}
          error={errors.dateAdded}
        />
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Phone Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          {errors.image && (
            <p className="text-red-500 text-sm mt-1">{errors.image}</p>
          )}
        </div>

        <div className="col-span-1 md:col-span-2 text-right">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-all"
          >
            Submit Phone
          </button>
        </div>
      </form>
    </div>
  );
}

function Input({ label, name, type = "text", onChange, error }) {
  return (
    <div className="flex flex-col">
      <label htmlFor={name} className="mb-1 font-medium text-gray-700">
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={name}
        onChange={onChange}
        className="border rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}

function Select({ label, name, options, onChange, error }) {
  return (
    <div className="flex flex-col">
      <label htmlFor={name} className="mb-1 font-medium text-gray-700">
        {label}
      </label>
      <select
        name={name}
        id={name}
        onChange={onChange}
        className="border rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}
