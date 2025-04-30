import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, Edit3, Trash2 } from "lucide-react"; // Import icons

const DisplayStaffsPage = () => {
  const navigate = useNavigate();
  const [staffList, setStaffList] = useState([
    {
        id: 1,
        image: "/2.jpeg",
        name: "John Doe",
        email: "john.doe@example.com",
        contact: "1234567890",
        role: "Manager",
      },
      {
        id: 2,
        image: "/3.jpeg",
        name: "Jane Smith",
        email: "jane.smith@example.com",
        contact: "2345678901",
        role: "Assistant Manager",
      },
      {
        id: 3,
        image: "/4.jpeg",
        name: "Michael Brown",
        email: "michael.brown@example.com",
        contact: "3456789012",
        role: "HR Specialist",
      },
      {
        id: 4,
        image: "/1.jpeg",
        name: "Emily Johnson",
        email: "emily.johnson@example.com",
        contact: "4567890123",
        role: "Cashier",
      },
      {
        id: 5,
        image: "/5.jpeg",
        name: "Chris Davis",
        email: "chris.davis@example.com",
        contact: "5678901234",
        role: "Sales Assistant",
      },
      {
        id: 6,
        image: "/6.jpeg",
        name: "Laura Wilson",
        email: "laura.wilson@example.com",
        contact: "6789012345",
        role: "Sales Assistant",
      },
      {
        id: 7,
        image: "/7.jpeg",
        name: "Daniel Taylor",
        email: "daniel.taylor@example.com",
        contact: "7890123456",
        role: "Sales Assistant",
      },
      {
        id: 8,
        image: "/8.jpeg",
        name: "Sophia Anderson",
        email: "sophia.anderson@example.com",
        contact: "8901234567",
        role: "Sales Assistant",
      },
      {
        id: 9,
        image: "/9.jpeg",
        name: "Ethan Thomas",
        email: "ethan.thomas@example.com",
        contact: "9012345678",
        role: "Sales Assistant",
      },
      {
        id: 10,
        image: "/10.jpeg",
        name: "Isabella Moore",
        email: "isabella.moore@example.com",
        contact: "0123456789",
        role: "Sales Assistant",
      },
      {
        id: 11,
        image: "/11.jpeg",
        name: "Liam Martin",
        email: "liam.martin@example.com",
        contact: "1234509876",
        role: "Sales Assistant",
      },
      {
        id: 12,
        image: "/12.jpeg",
        name: "Olivia Lee",
        email: "olivia.lee@example.com",
        contact: "2345670981",
        role: "Sales Assistant",
      },
  ]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this staff member?")) {
      setStaffList((prev) => prev.filter((staff) => staff.id !== id));
    }
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
      <div className="flex-grow p-6 bg-gray-100">
        <div className="max-w-5xl mx-auto bg-white p-6 rounded-lg shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800">Staff List</h2>
            <button
              onClick={() => navigate("/staff")}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Add Staff
            </button>
          </div>
          <table className="w-full table-auto border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200 text-gray-700">
                <th className="border border-gray-300 p-2">No</th>
                <th className="border border-gray-300 p-2">Image</th>
                <th className="border border-gray-300 p-2">Name</th>
                <th className="border border-gray-300 p-2">Email</th>
                <th className="border border-gray-300 p-2">Contact</th>
                <th className="border border-gray-300 p-2">Role</th>
                <th className="border border-gray-300 p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {staffList.map((staff, index) => (
                <tr key={staff.id} className="text-center hover:bg-gray-100">
                  <td className="border border-gray-300 p-2">{index + 1}</td>
                  <td className="border border-gray-300 p-2">
                    <img
                      src={staff.image}
                      alt={staff.name}
                      className="w-10 h-10 rounded-full mx-auto"
                    />
                  </td>
                  <td className="border border-gray-300 p-2">{staff.name}</td>
                  <td className="border border-gray-300 p-2">{staff.email}</td>
                  <td className="border border-gray-300 p-2">{staff.contact}</td>
                  <td className="border border-gray-300 p-2">{staff.role}</td>
                  <td className="border border-gray-300 p-2 space-x-2 flex justify-center">
                    <button className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600">
                      <Eye size={16} />
                    </button>
                    <button className="bg-green-500 text-white p-2 rounded-full hover:bg-green-600">
                      <Edit3 size={16} />
                    </button>
                    <button
                      className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
                      onClick={() => handleDelete(staff.id)}
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-4">
        <div className="container mx-auto text-center">
          <p>&copy; 2025 Phone Shop Management. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default DisplayStaffsPage;
