// frontend/src/components/AdminPortal.js
import React, { useState, useEffect } from 'react';
import api from '../api';
import AdminDashboard from './AdminDashboard';

const AdminPortal = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState('');
  const [isValidating, setIsValidating] = useState(true);

  // Check for token on mount
  useEffect(() => {
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
      } finally {
        setIsValidating(false);
      }
    };

    validateToken();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setStatus('');
    try {
      const { data } = await api.post('/auth/login', { username, password });
      localStorage.setItem('adminToken', data.token);
      setToken(data.token);
      setStatus('Login successful!');
      setIsLoggedIn(true);
    } catch (err) {
      setStatus('Login failed. Check your credentials.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setToken('');
    setIsLoggedIn(false);
    setStatus('You have been logged out.');
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
                <i className="bi bi-shield-lock-fill fs-1"></i>
              </div>
              <h3>Admin Portal</h3>
              <p className="small text-white-50">Authorized Staff &amp; Teachers Only</p>
              <form className="mt-3" onSubmit={handleLogin}>
                <input
                  type="text"
                  placeholder="Username"
                  className="form-control mb-2"
                  style={{
                    background: 'rgba(255,255,255,0.1)',
                    border: '1px solid rgba(255,255,255,0.3)',
                    color: 'white',
                  }}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="form-control mb-3"
                  style={{
                    background: 'rgba(255,255,255,0.1)',
                    border: '1px solid rgba(255,255,255,0.3)',
                    color: 'white',
                  }}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button className="btn btn-light w-100 fw-bold" type="submit">
                  Login
                </button>
              </form>
              {status && <p className="mt-3 small">{status}</p>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPortal;