import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/slices/authSlice';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <nav className='bg-gray-800 text-white p-4 flex justify-center  items-center'>
      <Link to="/dashboard" className='mr-4'>Dashboard</Link>
      <Link to="/products" className='mr-4'>Products</Link>
      <button onClick={handleLogout} className='bg-red-500 px-4 py-2 rounded'>Logout</button>
    </nav>
  );
};

export default Navbar;
