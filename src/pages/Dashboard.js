import React from 'react';
import Navbar from '../components/Navbar';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', sales: 400 },
  { name: 'Feb', sales: 300 },
  { name: 'Mar', sales: 500 },
  { name: 'Apr', sales: 700 },
  { name: 'May', sales: 200 },
];

const Dashboard = () => {
  return (
    <>
    <Navbar/>
    <div style={{ padding: '2rem' }}>
      <h2>Dashboard</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <CartesianGrid strokeDasharray="3 3" />
          <Bar dataKey="sales" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
    </>
  );
};

export default Dashboard;
