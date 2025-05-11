import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Trash2, Eye } from "lucide-react";

const phones = [
  {
    id: 1,
    name: "iPhone 15 Pro",
    price: 999,
    description: "Apple's flagship phone with A17 chip and titanium body.",
    image: "/20.webp",
    specs: '6.1" display, 128GB storage, A17 Pro chip',
  },
  {
    id: 2,
    name: "Samsung Galaxy S24",
    price: 899,
    description: "Samsung's latest with AMOLED display and AI camera.",
    image: "/21.jpg",
    specs: '6.8" AMOLED, 256GB storage, Snapdragon 8 Gen 3',
  },
  {
    id: 3,
    name: "Google Pixel 8",
    price: 799,
    description: "Clean Android with great AI features and camera.",
    image: "/22.jpeg",
    specs: '6.2" OLED, 128GB, Tensor G3 chip',
  },
  {
    id: 4,
    name: "OnePlus 12",
    price: 749,
    description: "Fast performance with Oxygen OS and smooth display.",
    image: "/23.jpeg",
    specs: '6.7" AMOLED, 512GB, Snapdragon 8 Gen 2',
  },
  {
    id: 1,
    name: "iPhone 15 Pro",
    price: 999,
    description: "Apple's flagship phone with A17 chip and titanium body.",
    image: "/21.jpg",
    specs: '6.1" display, 128GB storage, A17 Pro chip',
  },
  {
    id: 2,
    name: "Samsung Galaxy S24",
    price: 899,
    description: "Samsung's latest with AMOLED display and AI camera.",
    image: "/20.webp",
    specs: '6.8" AMOLED, 256GB storage, Snapdragon 8 Gen 3',
  },
];

export default function PhoneShopPage() {
  const [phoneList, setPhoneList] = useState(phones);
  const [selectedPhoneId, setSelectedPhoneId] = useState(null);
  const navigate = useNavigate();

  const handleDelete = (id) => {
    const confirmed = confirm("Are you sure you want to delete this phone?");
    if (confirmed) {
      setPhoneList((prev) => prev.filter((phone) => phone.id !== id));
    }
  };

  const handleViewDetails = (id) => {
    setSelectedPhoneId((prevId) => (prevId === id ? null : id));
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
      <div className="p-4 max-w-6xl mx-auto">
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-xl font-semibold">Phone Management</h2>
          <button
            onClick={() => navigate("/AddPhone")}
            className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
          >
            + Add Phone
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {phoneList.map((phone) => (
            <div key={phone.id} className="p-4 bg-white rounded-xl shadow-sm">
              <div className="flex flex-col items-center text-center gap-3">
                <img
                  src={phone.image}
                  alt={phone.name}
                  className="h-36 object-contain"
                />
                <h3 className="font-semibold text-base">{phone.name}</h3>
                <p className="text-sm text-gray-500">{phone.description}</p>
                <p className="text-orange-500 font-bold text-lg">
                  ${phone.price.toFixed(2)}
                </p>
                <div className="flex gap-3 mt-2">
                  <button
                    onClick={() => handleViewDetails(phone.id)}
                    className="flex items-center gap-1 px-3 py-1 rounded bg-blue-500 text-white text-sm hover:bg-blue-600"
                  >
                    <Eye size={16} /> View
                  </button>
                  <button
                    onClick={() => handleDelete(phone.id)}
                    className="flex items-center gap-1 px-3 py-1 rounded bg-red-500 text-white text-sm hover:bg-red-600"
                  >
                    <Trash2 size={16} /> Delete
                  </button>
                </div>

                {selectedPhoneId === phone.id && (
                  <div className="mt-4 w-full text-left text-sm bg-gray-50 p-3 rounded-lg">
                    <p>
                      <strong>Name:</strong> {phone.name}
                    </p>
                    <p>
                      <strong>Price:</strong> ${phone.price.toFixed(2)}
                    </p>
                    <p>
                      <strong>Description:</strong> {phone.description}
                    </p>
                    <p>
                      <strong>Specifications:</strong> {phone.specs}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Footer */}
      <footer className="bg-gray-800 text-white py-4 mt-5">
        <div className="container mx-auto text-center">
          <p>&copy; 2025 Grand Mobile. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}
