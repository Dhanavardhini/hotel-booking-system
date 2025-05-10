import React, { useState } from 'react';
import './Admin.css';
import { useNavigate } from 'react-router-dom';

function Adminlogin() {
  const [user_name, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
  
    // Trim both username and password
    const trimmedUserName = user_name.trim();
    const trimmedPassword = password.trim();
  
    if (!trimmedUserName || !trimmedPassword) {
      alert('Please enter both username and password.');
      return;
    }
  
    // Remove the password length check as the password has 9 characters
    setLoading(true);
    setError('');
  
    try {
      // Check if username and password match the static values
      if (trimmedUserName === 'admin@gmail.com' && trimmedPassword === 'admin123') {
        alert('Login successful! Redirecting to dashboard...');
        navigate('/dash');
      } else {
        setError('Invalid login credentials.');
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
        <h1 className="login-title">Admin Login</h1>
        <form className="login-form" onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={user_name}
              onChange={(e) => setUserName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
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

export default Adminlogin;
