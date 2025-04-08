import React, { useState } from 'react';
import { AlertCircle } from 'lucide-react';
import './LoginPage.css';

// Mock API function (replace with your actual API call)
const mockLogin = async (credentials) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const { username, password } = credentials;
      if (username === 'admin' && password === 'password') {
        resolve({ role: 'admin', message: 'Login successful', data: { admittedPatients: [{ id: 'p1', fullName: 'Patient One', hospitalNumber: '123' }, { id: 'p2', fullName: 'Patient Two', hospitalNumber: '456' }] } });
      } else if (username === 'junior' && password === 'doctor') {
        resolve({ role: 'junior_doctor', message: 'Login successful', data: { patient: { id: 'p3', fullName: 'Patient Three', hospitalNumber: '789', treatmentCycles: [{ date: new Date(Date.now() + 86400000 * 7).toISOString() }] } } }); // Added a treatment cycle for testing
      } else {
        reject({ message: 'Invalid credentials' });
      }
    }, 500);
  });
};

const LoginPage = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await mockLogin({ username, password });
      if (response) {
        onLogin(response.role, response.data); // Pass the role and data to the parent component
      }
    } catch (err) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Login</h2>
        <p className="login-description">Enter your credentials to access the system.</p>
        {error && (
          <div className="login-error" role="alert">
            <AlertCircle className="login-error-icon" />
            <strong className="login-error-strong">Error: </strong>
            <span className="login-error-message">{error}</span>
          </div>
        )}
        <div className="login-form">
          <div>
            <label htmlFor="username" className="login-label">Username</label>
            <input
              id="username"
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="login-input"
            />
          </div>
          <div>
            <label htmlFor="password" className="login-label">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="login-input"
            />
          </div>
        </div>
        <div className="login-button-container">
          <button
            className="login-button"
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
