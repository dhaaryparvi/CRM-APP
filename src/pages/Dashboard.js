import React from 'react';
import Navbar from '../components/Navbar';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from 'recharts';

const data = [
  { name: 'Jan', sales: 400 },
  { name: 'Feb', sales: 300 },
  { name: 'Mar', sales: 500 },
  { name: 'Apr', sales: 700 },
  { name: 'May', sales: 200 },
];

const pieData = [
  { name: 'Product A', value: 300 },
  { name: 'Product B', value: 200 },
  { name: 'Product C', value: 100 },
];

const COLORS = ['#36454F', '#7C99AC', '#D6E4E5'];

const Dashboard = () => {
  return (
    <>
      <Navbar />
      <div className="p-8">
        <h2 className="text-2xl font-semibold mb-6">Dashboard</h2>

        {/* Bar Chart */}
        <div className="bg-white rounded-xl shadow-md p-4 mb-8">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <CartesianGrid strokeDasharray="3 3" />
              <Bar dataKey="sales" fill="#36454F" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Flex Row for Pie and Line Chart */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Pie Chart */}
          <div className="bg-white rounded-xl shadow-md p-4 w-full md:w-1/2 h-[300px]">
            <h3 className="text-lg font-medium mb-2 text-center">Product Distribution</h3>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={80}
                  fill="#8884d8"
                  label
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Line Chart */}
          <div className="bg-white rounded-xl shadow-md p-4 w-full md:w-1/2 h-[300px]">
            <h3 className="text-lg font-medium mb-2 text-center">Sales Trend</h3>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <CartesianGrid strokeDasharray="3 3" />
                <Line type="monotone" dataKey="sales" stroke="#36454F" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
