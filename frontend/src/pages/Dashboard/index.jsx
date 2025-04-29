import React from "react";

import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Users, Phone, Gift, Percent } from "lucide-react";
import { useNavigate } from "react-router-dom";

const dashboardData = {
  staffCount: 12,
  phonesCount: 120,
  accessoriesCount: 45,
  activePromotions: 5,
  salesTrend: [
    { month: "Jan", sales: 400 },
    { month: "Feb", sales: 300 },
    { month: "Mar", sales: 500 },
    { month: "Apr", sales: 450 },
    { month: "May", sales: 600 },
  ],
};

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">
        Phone Shop Management Dashboard
      </h1>

      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {/* Staff Management */}
        <div
        onClick={() => navigate("/staff")}  
        className="p-4 bg-white shadow-lg rounded-2xl cursor-pointer hover:shadow-xl transition"
        >
          <div className="mb-4 flex items-center space-x-4">
            <Users size={32} className="text-blue-500" />
            <h2 className="text-xl font-semibold">Staff</h2>
          </div>
          <p className="text-3xl font-bold">{dashboardData.staffCount}</p>
          <p>Total Staff Members</p>
        </div>

        {/* Phone Management */}
        <div
        onClick={() => navigate("/phones")}  
        className="p-4 bg-white shadow-lg rounded-2xl cursor-pointer hover:shadow-xl transition"
        >
          <div className="mb-4 flex items-center space-x-4">
            <Phone size={32} className="text-green-500" />
            <h2 className="text-xl font-semibold">Phones</h2>
          </div>
          <p className="text-3xl font-bold">{dashboardData.phonesCount}</p>
          <p>Available Phones</p>
        </div>

        {/* Accessories Management */}
        <div
        onClick={() => navigate("/")}  
        className="p-4 bg-white shadow-lg rounded-2xl cursor-pointer hover:shadow-xl transition"
        >
          <div className="mb-4 flex items-center space-x-4">
            <Gift size={32} className="text-red-500" />
            <h2 className="text-xl font-semibold">Accessories</h2>
          </div>
          <p className="text-3xl font-bold">{dashboardData.accessoriesCount}</p>
          <p>Available Accessories</p>
        </div>

        {/* Promotions Management */}
        <div
        onClick={() => navigate("/")}  
        className="p-4 bg-white shadow-lg rounded-2xl cursor-pointer hover:shadow-xl transition"
        >
          <div className="mb-4 flex items-center space-x-4">
            <Percent size={32} className="text-yellow-500" />
            <h2 className="text-xl font-semibold">Promotions</h2>
          </div>
          <p className="text-3xl font-bold">{dashboardData.activePromotions}</p>
          <p>Active Promotions</p>
        </div>
      </div>

      {/* Sales Trends */}
      <div className="mt-8 p-4 bg-white shadow-lg rounded-2xl">
        <h2 className="text-xl font-semibold mb-4">Sales Trend</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={dashboardData.salesTrend}>
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <Line type="monotone" dataKey="sales" stroke="#8884d8" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Call-to-Action */}
    
    </div>
  );
};

export default Dashboard;
