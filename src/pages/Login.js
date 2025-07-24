import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, token } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await dispatch(loginUser(formData));
    if (res.meta.requestStatus === 'fulfilled') {
      navigate('/dashboard');
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '100px auto' }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="username"
          value={formData.username}
          onChange={handleChange}
          required
        /><br /><br />
        <input
          type="password"
          name="password"
          placeholder="password"
          value={formData.password}
          onChange={handleChange}
          required
        /><br /><br />
        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
};

export default Login;
