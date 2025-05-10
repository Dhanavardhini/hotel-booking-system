

import React, { useState } from 'react';
import './User.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Userlogin() {
  const [email, setemail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    // Check if email and password meet the required conditions
    if (!email || !password) {
      alert('Please enter both email and password.');
      return;
    }

    if (password.length < 6) {
      alert('Password must be at least 6 characters long.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost/hotelbackend/controllers/api/User/post/register.php', {
        email: email,
        password: password,
      }, {
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.data.message === "Plan Added successful") {
        navigate('/userlanding');
      } else {
        setError(response.data.message || 'Invalid login credentials.');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('An error occurred during login. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-box">
      <div className="login-container">
        <h1 className="login-title">User Login</h1>
        <form className="login-form" onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="email">email</label>
            <input
              type="text"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setemail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="btn-div">
            <button type="submit" className="login-button" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </div>

          {error && <div className="error-message">{error}</div>}
        </form>
      </div>
    </div>
  );
}

export default Userlogin;
