import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const StaffPage = () => {
  const navigate = useNavigate();
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
  const [isPopupVisible, setPopupVisible] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First Name is required.";
    } else if (!/^[A-Za-z]+$/.test(formData.firstName)) {
      newErrors.firstName = "Only letters are allowed in First Name.";
    }

    if (!formData.lastName.trim()) {
        newErrors.lastName = "Last Name is required.";
    } else if (!/^[A-Za-z]+$/.test(formData.lastName)) {
      newErrors.lastName = "Only letters are allowed in Last Name.";
    }

    if (!formData.address.trim()) {
        newErrors.address = "Address is required.";
    }

    if (!formData.age.trim()) {
      newErrors.age = "Age is required.";
    } else if (!/^\d+$/.test(formData.age) || formData.age < 18 /*|| formData.age > 50 */) {
      newErrors.age = "Age must be between 18 and 50.";
    }

    if (!formData.birthDate) {
        newErrors.birthDate = "Birth Date is required.";
    } else {
        const birthYear = new Date(formData.birthDate).getFullYear();
        // --- THIS LINE WAS CHANGED ---
        if (isNaN(birthYear) || birthYear >= 2005) { // Changed > to >= and added isNaN check
        // --- THIS LINE WAS CHANGED ---
            newErrors.birthDate = "Birthdate must be before 2005.";
        }
    }

    if (!formData.email.trim()) {
        newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Enter a valid email address.";
    }

    if (!formData.contact.trim()) {
        newErrors.contact = "Contact number is required.";
    } else if (!/^\d{10}$/.test(formData.contact)) {
      newErrors.contact = "Contact number must be 10 digits.";
    }

    if (!formData.gender) {
        newErrors.gender = "Gender is required."; // Added validation for gender
    }

    if (!formData.role.trim()) {
        newErrors.role = "Role is required.";
    } else if (!/^[A-Za-z\s]+$/.test(formData.role)) { // Allow spaces in role if needed, otherwise remove \s
      newErrors.role = "Role should only contain letters (and optionally spaces).";
    }

    if (!formData.salary.trim()) {
        newErrors.salary = "Salary is required.";
    } else if (!/^\d+(\.\d{1,2})?$/.test(formData.salary)) { // Allow optional decimals
      newErrors.salary = "Salary must be a valid numeric value (e.g., 50000 or 50000.00).";
    }

    // Keep image validation optional (only validate if an image is selected)
    if (formData.image) {
      const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
      if (!allowedTypes.includes(formData.image.type)) {
        newErrors.image = "Only JPG, JPEG, and PNG files are allowed.";
      }
      const maxSize = 5 * 1024 * 1024; // 5MB limit
      if (formData.image.size > maxSize) {
          newErrors.image = "Image size cannot exceed 5MB.";
      }
    } else {
      // Optionally make image required
      // newErrors.image = "User image is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
        console.log("Form Data Submitted:", formData); // Good for debugging
        // --- TODO: Add actual form submission logic here (e.g., API call) ---
        // Example:
        // const dataToSend = new FormData();
        // Object.keys(formData).forEach(key => {
        //     dataToSend.append(key, formData[key]);
        // });
        // fetch('/api/staff', { method: 'POST', body: dataToSend })
        //    .then(response => response.json())
        //    .then(data => { console.log('Success:', data); setPopupVisible(true); })
        //    .catch(error => { console.error('Error:', error); /* Handle error */ });


        // ---- Currently just shows popup and resets form ---
        setPopupVisible(true);
        // Reset form - Consider resetting file input value specifically if needed
        const fileInput = document.querySelector('input[type="file"]');
        if (fileInput) {
            fileInput.value = ""; // Attempt to reset file input
        }
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
        // --- End of current placeholder logic ---

    } else {
        console.log("Form Validation Failed:", errors); // Good for debugging
    }
};


  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
         ...prev,
         // Use checked for radio buttons, otherwise use value
         [name]: type === 'radio' ? value : value
    }));
     // Optionally clear the error for a field when it's changed
     if (errors[name]) {
        setErrors(prev => ({...prev, [name]: undefined }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
        setFormData((prev) => ({ ...prev, image: file }));
        // Optionally clear image error when a new file is selected
        if (errors.image) {
            setErrors(prev => ({...prev, image: undefined }));
        }
    } else {
         // Handle case where user deselects file
        setFormData((prev) => ({ ...prev, image: null }));
    }
  };

  // Close popup handler
  const closePopup = () => {
    setPopupVisible(false);
    // Optionally navigate away after closing popup
    // navigate('/displayStaff');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100"> {/* Added background color */}
      {/* Header */}
      <header className="bg-gray-800 text-white py-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center px-4">
          <h1
            onClick={() => navigate("/")}
            className="text-2xl font-bold cursor-pointer hover:text-gray-300 transition"
          >
            Grand Mobile
          </h1>
          <nav className="space-x-4"> {/* Added spacing */}
            <button
              onClick={() => navigate("/promotions")}
              className="hover:underline"
            >
              Promotions
            </button>
            <button
              onClick={() => navigate("/displayStaff")}
              className="hover:underline"
            >
              Staff
            </button>
            <button
              onClick={() => navigate("/phones")}
              className="hover:underline"
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
      {/* Added novalidate to prevent default browser validation, relying solely on React validation */}
      <form
        className="flex-grow max-w-3xl w-full mx-auto bg-white p-6 md:p-8 rounded-lg shadow-lg my-5" // Added w-full and adjusted padding/margin
        onSubmit={handleSubmit}
        noValidate // Prevent default HTML5 validation
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Add New Staff Member</h2> {/* Centered title */}

        {/* Display general form errors if any (e.g., API submission error) */}
        {/* {formError && <p className="text-red-600 text-center mb-4">{formError}</p>} */}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4"> {/* Adjusted gap */}
          {[
            { label: "First Name", name: "firstName", type: "text", placeholder: "John", required: true },
            { label: "Last Name", name: "lastName", type: "text", placeholder: "Doe", required: true },
            { label: "Address", name: "address", type: "text", placeholder: "123 Main St, Anytown", required: true }, // Added placeholder example
            { label: "Age", name: "age", type: "number", placeholder: "e.g., 30", required: true },
            { label: "Birth Date", name: "birthDate", type: "date", required: true },
            { label: "Email Address", name: "email", type: "email", placeholder: "john.doe@example.com", required: true },
            { label: "Contact No.", name: "contact", type: "tel", placeholder: "1234567890", required: true }, // Changed type to tel
            { label: "Role/Position", name: "role", type: "text", placeholder: "e.g., Sales Manager", required: true },
            { label: "Basic Salary (LKR)", name: "salary", type: "text", inputMode:"decimal", placeholder: "e.g., 75000.00", required: true }, // Changed type to text with inputMode
          ].map(({ label, name, type, placeholder, required, inputMode }) => (
            <div key={name} className={name === 'address' ? 'sm:col-span-2' : ''}> {/* Make address span 2 columns */}
              <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1"> {/* Use htmlFor */}
                {label} {required && <span className="text-red-500">*</span>}
              </label>
              <input
                type={type}
                id={name} // Add id matching htmlFor
                name={name}
                value={formData[name]}
                onChange={handleChange}
                placeholder={placeholder}
                required={required} // Add required attribute for accessibility/fallback
                inputMode={inputMode} // Useful for numeric/tel inputs on mobile
                className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 ${
                    errors[name]
                    ? 'border-red-500 focus:ring-red-300'
                    : 'border-gray-300 focus:ring-blue-300 focus:border-blue-500' // Added focus border color
                } transition`}
                aria-invalid={errors[name] ? "true" : "false"} // Accessibility
                aria-describedby={errors[name] ? `${name}-error` : undefined} // Accessibility
              />
              {errors[name] && (
                <p id={`${name}-error`} className="text-red-600 text-xs mt-1">{errors[name]}</p> // Adjusted error style
              )}
            </div>
          ))}

          {/* Gender Radio Buttons - improved layout and accessibility */}
          <fieldset className="sm:col-span-2"> {/* Group radio buttons */}
             <legend className="block text-sm font-medium text-gray-700 mb-2">
                Gender <span className="text-red-500">*</span>
             </legend>
             <div className="flex items-center space-x-6"> {/* Increased spacing */}
                <label className="flex items-center cursor-pointer">
                    <input
                    type="radio"
                    name="gender"
                    value="Male"
                    onChange={handleChange}
                    checked={formData.gender === "Male"}
                    required // Mark as required
                    className="mr-2 h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500" // Styling
                    />
                    <span className="text-sm text-gray-800">Male</span>
                </label>
                <label className="flex items-center cursor-pointer">
                    <input
                    type="radio"
                    name="gender"
                    value="Female"
                    onChange={handleChange}
                    checked={formData.gender === "Female"}
                    required
                    className="mr-2 h-4 w-4 text-pink-600 border-gray-300 focus:ring-pink-500" // Styling
                    />
                     <span className="text-sm text-gray-800">Female</span>
                </label>
                {/* Add other options if needed */}
             </div>
              {errors.gender && (
                <p className="text-red-600 text-xs mt-1">{errors.gender}</p>
              )}
          </fieldset>

            {/* File Input - improved layout */}
          <div className="sm:col-span-2">
            <label htmlFor="image-upload" className="block text-sm font-medium text-gray-700 mb-1">
              User Image (Optional, JPG/PNG, max 5MB)
            </label>
            <input
              id="image-upload"
              type="file"
              accept="image/jpeg, image/png" // Specify accepted types
              onChange={handleFileChange}
              className={`block w-full text-sm text-gray-500 border rounded-md cursor-pointer
                          file:mr-4 file:py-2 file:px-4
                          file:rounded-l-md file:border-0
                          file:text-sm file:font-semibold
                          file:bg-blue-50 file:text-blue-700
                          hover:file:bg-blue-100
                          focus:outline-none focus:ring-2 focus:ring-offset-1 ${
                            errors.image
                            ? 'border-red-500 focus:ring-red-300'
                            : 'border-gray-300 focus:ring-blue-300'
                          }`} // Enhanced styling
                aria-describedby={errors.image ? `image-error` : undefined}
            />
             {errors.image && (
                <p id="image-error" className="text-red-600 text-xs mt-1">{errors.image}</p>
             )}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="mt-8 w-full bg-blue-600 text-white py-3 px-4 rounded-md font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out disabled:opacity-50" // Added focus and disabled styles
          // disabled={isSubmitting} // Example: disable button during API call
        >
          {/* {isSubmitting ? 'Adding...' : 'Add Staff Member'} */}
          Add Staff Member
        </button>
      </form>

      {/* Success Popup Modal */}
      {isPopupVisible && (
        <div
            className="fixed inset-0 z-50 bg-black bg-opacity-60 flex justify-center items-center p-4"
            aria-labelledby="success-popup-title"
            role="dialog"
            aria-modal="true"
         >
          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-sm text-center"> {/* Adjusted max-width */}
            {/* Optional: Add an icon */}
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
              <svg className="h-6 w-6 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            </div>
            <h3 id="success-popup-title" className="text-lg font-semibold text-gray-900 mb-2"> {/* Adjusted text size/color */}
              Success!
            </h3>
             <p className="text-sm text-gray-600 mb-5"> {/* Added detail text */}
                New staff member added successfully.
            </p>
            <button
              onClick={closePopup} // Use handler
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-4 mt-auto"> {/* Ensure footer sticks to bottom */}
        <div className="container mx-auto text-center text-sm"> {/* Adjusted text size */}
          <p>© {new Date().getFullYear()} Grand Mobile. All Rights Reserved.</p> {/* Dynamic year */}
        </div>
      </footer>
    </div>
  );
};

export default StaffPage;