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
    <nav style={{ background: '#eee', padding: '1rem' }}>
      <Link to="/dashboard" style={{ marginRight: '1rem' }}>Dashboard</Link>
      <Link to="/products" style={{ marginRight: '1rem' }}>Products</Link>
      <button onClick={handleLogout}>Logout</button>
    </nav>
  );
};

export default Navbar;
