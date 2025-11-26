// frontend/src/components/AdminPortal.js
import React, { useState, useEffect } from 'react';
import api from '../api';
import AdminDashboard from './AdminDashboard';

const AdminPortal = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [status, setStatus] = useState('');
  const [statusType, setStatusType] = useState(''); // 'success' or 'error'
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState('');
  const [isValidating, setIsValidating] = useState(true);
  const [isRegistering, setIsRegistering] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Check for token on mount and handle email verification
  useEffect(() => {
    // Check for verification token in URL
    const urlParams = new URLSearchParams(window.location.search);
    const verifyToken = urlParams.get('verify');

    if (verifyToken) {
      verifyEmail(verifyToken);
    }

    const storedToken = localStorage.getItem('adminToken');
    if (!storedToken) {
      setIsValidating(false);
      return;
    }

    const validateToken = async () => {
      try {
        await api.get('/admin/me', {
          headers: { Authorization: `Bearer ${storedToken}` },
        });
        setToken(storedToken);
        setIsLoggedIn(true);
      } catch (err) {
        localStorage.removeItem('adminToken');
        setStatus('Session expired. Please log in again.');
        setStatusType('error');
      } finally {
        setIsValidating(false);
      }
    };

    validateToken();
  }, []);

  const verifyEmail = async (verifyToken) => {
    try {
      const { data } = await api.get(`/auth/verify/${verifyToken}`);
      setStatus(data.message);
      setStatusType('success');
      // Clean up URL
      window.history.replaceState({}, document.title, window.location.pathname);
    } catch (err) {
      setStatus(err.response?.data?.message || 'Verification failed');
      setStatusType('error');
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setStatus('');
    setIsLoading(true);
    try {
      const { data } = await api.post('/auth/login', { username, password });
      localStorage.setItem('adminToken', data.token);
      setToken(data.token);
      setStatus('Login successful!');
      setStatusType('success');
      setIsLoggedIn(true);
    } catch (err) {
      setStatus(err.response?.data?.message || 'Login failed. Check your credentials.');
      setStatusType('error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setStatus('');

    if (password !== confirmPassword) {
      setStatus('Passwords do not match');
      setStatusType('error');
      return;
    }

    if (password.length < 6) {
      setStatus('Password must be at least 6 characters');
      setStatusType('error');
      return;
    }

    setIsLoading(true);
    try {
      const { data } = await api.post('/auth/register', { username, email, password });
      setStatus(data.message);
      setStatusType('success');
      // Clear form and switch to login
      setUsername('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setIsRegistering(false);
    } catch (err) {
      setStatus(err.response?.data?.message || 'Registration failed. Please try again.');
      setStatusType('error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setToken('');
    setIsLoggedIn(false);
    setStatus('You have been logged out.');
    setStatusType('');
  };

  const toggleMode = () => {
    setIsRegistering(!isRegistering);
    setStatus('');
    setUsername('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  };

  const inputStyle = {
    background: 'rgba(255,255,255,0.1)',
    border: '1px solid rgba(255,255,255,0.3)',
    color: 'white',
  };

  return (
    <div className="container">
      {isValidating ? (
        <p className="text-center py-5">Validating session...</p>
      ) : isLoggedIn ? (
        <AdminDashboard token={token} onLogout={handleLogout} />
      ) : (
        <div className="row g-4">
          <div className="col-lg-4">
            <div className="admin-box h-100 d-flex flex-column justify-content-center">
              <div className="mb-3">
                <i className={`bi ${isRegistering ? 'bi-person-plus-fill' : 'bi-shield-lock-fill'} fs-1`}></i>
              </div>
              <h3>{isRegistering ? 'Register' : 'Admin Portal'}</h3>
              <p className="small text-white-50">
                {isRegistering ? 'Create a new admin account' : 'Authorized Staff & Teachers Only'}
              </p>

              {isRegistering ? (
                <form className="mt-3" onSubmit={handleRegister}>
                  <input
                    type="text"
                    placeholder="Username"
                    className="form-control mb-2"
                    style={inputStyle}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    disabled={isLoading}
                  />
                  <input
                    type="email"
                    placeholder="Email Address"
                    className="form-control mb-2"
                    style={inputStyle}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={isLoading}
                  />
                  <input
                    type="password"
                    placeholder="Password (min 6 characters)"
                    className="form-control mb-2"
                    style={inputStyle}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={isLoading}
                  />
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    className="form-control mb-3"
                    style={inputStyle}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    disabled={isLoading}
                  />
                  <button className="btn btn-light w-100 fw-bold" type="submit" disabled={isLoading}>
                    {isLoading ? 'Registering...' : 'Register'}
                  </button>
                </form>
              ) : (
                <form className="mt-3" onSubmit={handleLogin}>
                  <input
                    type="text"
                    placeholder="Username"
                    className="form-control mb-2"
                    style={inputStyle}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    disabled={isLoading}
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    className="form-control mb-3"
                    style={inputStyle}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={isLoading}
                  />
                  <button className="btn btn-light w-100 fw-bold" type="submit" disabled={isLoading}>
                    {isLoading ? 'Logging in...' : 'Login'}
                  </button>
                </form>
              )}

              {status && (
                <p className={`mt-3 small ${statusType === 'success' ? 'text-success' : statusType === 'error' ? 'text-warning' : ''}`}>
                  {status}
                </p>
              )}

              <button
                className="btn btn-link text-white-50 mt-2 p-0"
                onClick={toggleMode}
                type="button"
                disabled={isLoading}
              >
                {isRegistering ? 'Already have an account? Login' : 'Need an account? Register'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPortal;