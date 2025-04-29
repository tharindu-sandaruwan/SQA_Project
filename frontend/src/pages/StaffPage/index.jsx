import React, { useState } from "react";

const StaffPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    age: "",
    birthDate: "",
    email: "",
    contact: "",
    gender: "",
    role: "",
    salary: "",
    image: null,
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const validateForm = () => {
    const newErrors = {};

    if (!/^[A-Za-z]+$/.test(formData.firstName)) {
      newErrors.firstName = "Only letters are allowed in First Name.";
    }
    if (!/^[A-Za-z]+$/.test(formData.lastName)) {
      newErrors.lastName = "Only letters are allowed in Last Name.";
    }
    if (!/^\d+$/.test(formData.age) || formData.age < 18 || formData.age > 50) {
      newErrors.age = "Age must be between 18 and 50.";
    }
    const birthYear = new Date(formData.birthDate).getFullYear();
    if (birthYear > 2005) {
      newErrors.birthDate = "Birthdate must be before 2005.";
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Enter a valid email address.";
    }
    if (!/^\d{10}$/.test(formData.contact)) {
      newErrors.contact = "Contact number must be 10 digits.";
    }
    if (!/^[A-Za-z]+$/.test(formData.role)) {
      newErrors.role = "Role should only contain letters.";
    }
    if (!/^\d+$/.test(formData.salary)) {
      newErrors.salary = "Salary must be numeric.";
    }
    if (formData.image) {
      const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
      if (!allowedTypes.includes(formData.image.type)) {
        newErrors.image = "Only JPG, JPEG, and PNG files are allowed.";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccessMessage("");
    if (validateForm()) {
      setSuccessMessage("Staff added successfully!");
      setFormData({
        firstName: "",
        lastName: "",
        address: "",
        age: "",
        birthDate: "",
        email: "",
        contact: "",
        gender: "",
        role: "",
        salary: "",
        image: null,
      });
      setErrors({});
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  return (
    <form
      className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg"
      onSubmit={handleSubmit}
    >
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Add Staff</h2>

      {successMessage && (
        <p className="mb-4 text-green-500 font-medium">{successMessage}</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {[
          { label: "First Name", name: "firstName", type: "text", placeholder: "John" },
          { label: "Last Name", name: "lastName", type: "text", placeholder: "Doe" },
          { label: "Address", name: "address", type: "text", placeholder: "123 Main St" },
          { label: "Age", name: "age", type: "number", placeholder: "25" },
          { label: "Birth Date", name: "birthDate", type: "date" },
          { label: "Email", name: "email", type: "email", placeholder: "john.doe@example.com" },
          { label: "Contact", name: "contact", type: "text", placeholder: "1234567890" },
          { label: "Role", name: "role", type: "text", placeholder: "Manager" },
          { label: "Basic Salary", name: "salary", type: "number", placeholder: "50000" },
        ].map(({ label, name, type, placeholder }) => (
          <div key={name}>
            <label className="block text-gray-700 font-medium mb-1">
              {label}
            </label>
            <input
              type={type}
              name={name}
              value={formData[name]}
              onChange={handleChange}
              placeholder={placeholder}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            />
            {errors[name] && (
              <p className="text-red-500 text-sm mt-1">{errors[name]}</p>
            )}
          </div>
        ))}

        <div>
          <label className="block text-gray-700 font-medium mb-1">Gender</label>
          <div className="flex items-center space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="gender"
                value="Male"
                onChange={handleChange}
                checked={formData.gender === "Male"}
                className="mr-2"
              />
              Male
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="gender"
                value="Female"
                onChange={handleChange}
                checked={formData.gender === "Female"}
                className="mr-2"
              />
              Female
            </label>
          </div>
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">
            User Image
          </label>
          <input
            type="file"
            onChange={handleFileChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          {errors.image && (
            <p className="text-red-500 text-sm mt-1">{errors.image}</p>
          )}
        </div>
      </div>

      <button
        type="submit"
        className="mt-6 w-full bg-blue-600 text-white py-3 rounded-md font-medium hover:bg-blue-700 transition"
      >
        Add Staff
      </button>
    </form>
  );
};

export default StaffPage;
