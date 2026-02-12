import React, { useState } from 'react'
import API from '../services/api'

export default function Login({ onLoginSuccess }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isSignUp, setIsSignUp] = useState(false)
  const [role, setRole] = useState('Sales')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      let endpoint = isSignUp ? '/auth/register' : '/auth/login'
      let payload = { username, password }
      if (isSignUp) payload.role = role

      const response = await API.post(endpoint, payload)
      const { access_token, user } = response.data

      localStorage.setItem('access_token', access_token)
      localStorage.setItem('user', JSON.stringify(user))
      onLoginSuccess(user)
    } catch (err) {
      setError(err.response?.data?.msg || 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-container">
      <div className="login-left">
        <div className="login-branding">
          <h1 className="logo-title"> RELYN</h1>
          
          <div className="feature-list">
            <div className="feature-item">✓ Manage Customers</div>
            <div className="feature-item">✓ Track Deals</div>
            <div className="feature-item">✓ Log Activities</div>
            <div className="feature-item">✓ Real-time Dashboard</div>
          </div>
        </div>
      </div>

      <div className="login-right">
        <div className="login-card">
          <div className="app-branding">
            <h1 className="app-logo"> RELYN</h1>
            
          </div>

          <div className="login-header">
            <h2>{isSignUp ? 'Create Account' : 'Welcome Back'}</h2>
            <p>{isSignUp ? 'Join our platform' : 'Sign in to your account'}</p>
          </div>
          
          {error && <div className="error-message">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email or Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="username@example.com"
                required
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>

            {isSignUp && (
              <div className="form-group">
                <label>Role</label>
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                  <option value="Sales">Sales Representative</option>
                  <option value="Manager">Sales Manager</option>
                  <option value="Admin">Administrator</option>
                </select>
              </div>
            )}

            <button type="submit" disabled={loading} className="btn-primary">
              {loading ? 'Processing...' : (isSignUp ? 'Create Account' : 'Sign In')}
            </button>
          </form>

          <div className="auth-divider">
            <span>{isSignUp ? 'or' : 'or'}</span>
          </div>

          <p className="toggle-auth">
            {isSignUp ? 'Already have an account? ' : "Don't have an account? "}
            <button 
              type="button" 
              onClick={() => setIsSignUp(!isSignUp)}
              className="link-button"
            >
              {isSignUp ? 'Sign In' : 'Sign Up'}
            </button>
          </p>
        </div>
      </div>

      <style>{`
        .login-container {
          display: flex;
          min-height: 100vh;
          background: #f5f7fa;
        }

        .login-left {
          display: none;
          flex: 1;
          background: linear-gradient(135deg, #1e3a8a 0%, #0f172a 100%);
          color: white;
          padding: 60px 40px;
          justify-content: center;
          align-items: center;
          position: relative;
          overflow: hidden;
        }

        .login-left::before {
          content: '';
          position: absolute;
          top: -50%;
          right: -50%;
          width: 500px;
          height: 500px;
          background: rgba(59, 130, 246, 0.1);
          border-radius: 50%;
        }

        .login-left::after {
          content: '';
          position: absolute;
          bottom: -30%;
          left: -30%;
          width: 300px;
          height: 300px;
          background: rgba(99, 102, 241, 0.1);
          border-radius: 50%;
        }

        .login-branding {
          position: relative;
          z-index: 1;
          text-align: center;
        }

        .logo-title {
          font-size: 48px;
          font-weight: 700;
          margin-bottom: 10px;
          letter-spacing: 2px;
        }

        .logo-subtitle {
          font-size: 18px;
          opacity: 0.9;
          margin-bottom: 50px;
          font-weight: 300;
        }

        .feature-list {
          display: grid;
          gap: 15px;
          text-align: left;
        }

        .feature-item {
          font-size: 16px;
          padding: 8px 0;
          opacity: 0.95;
        }

        .login-right {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 40px 20px;
        }

        .login-card {
          background: white;
          padding: 50px;
          border-radius: 12px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.08);
          width: 100%;
          max-width: 420px;
        }

        .app-branding {
          text-align: center;
          margin-bottom: 36px;
          padding-bottom: 28px;
          border-bottom: 2px solid #e2e8f0;
        }

        .app-logo {
          font-size: 36px;
          font-weight: 700;
          margin: 0;
          letter-spacing: 2px;
          color: #1e3a8a;
          margin-bottom: 6px;
        }

        .app-tagline {
          font-size: 13px;
          color: #64748b;
          margin: 0;
          font-weight: 500;
          letter-spacing: 0.3px;
        }

        .login-header {
          margin-bottom: 40px;
          text-align: center;
        }

        .login-header h2 {
          font-size: 28px;
          font-weight: 700;
          color: #1e293b;
          margin-bottom: 8px;
        }

        .login-header p {
          font-size: 14px;
          color: #64748b;
          font-weight: 500;
        }

        .form-group {
          margin-bottom: 22px;
        }

        .form-group label {
          display: block;
          margin-bottom: 8px;
          font-weight: 600;
          color: #334155;
          font-size: 14px;
        }

        .form-group input,
        .form-group select {
          width: 100%;
          padding: 12px 14px;
          border: 2px solid #e2e8f0;
          border-radius: 8px;
          font-size: 14px;
          box-sizing: border-box;
          transition: all 0.3s;
          font-family: inherit;
          background: #f8fafc;
        }

        .form-group input::placeholder {
          color: #94a3b8;
        }

        .form-group input:focus,
        .form-group select:focus {
          outline: none;
          border-color: #3b82f6;
          background: white;
          box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.08);
        }

        .form-group input:hover,
        .form-group select:hover {
          border-color: #cbd5e1;
        }

        .btn-primary {
          width: 100%;
          padding: 12px 20px;
          background: linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%);
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
          letter-spacing: 0.5px;
          margin-top: 8px;
        }

        .btn-primary:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(30, 58, 138, 0.3);
        }

        .btn-primary:disabled {
          background: #cbd5e1;
          cursor: not-allowed;
          transform: none;
        }

        .error-message {
          background: #fee2e2;
          color: #b91c1c;
          padding: 14px;
          border-radius: 8px;
          margin-bottom: 24px;
          border-left: 4px solid #dc2626;
          font-size: 14px;
          font-weight: 500;
        }

        .auth-divider {
          display: flex;
          align-items: center;
          margin: 28px 0;
          color: #94a3b8;
        }

        .auth-divider::before,
        .auth-divider::after {
          content: '';
          flex: 1;
          height: 1px;
          background: #e2e8f0;
        }

        .auth-divider span {
          padding: 0 12px;
          font-size: 13px;
          font-weight: 500;
        }

        .toggle-auth {
          text-align: center;
          color: #475569;
          font-size: 14px;
          font-weight: 500;
        }

        .link-button {
          background: none;
          border: none;
          color: #3b82f6;
          cursor: pointer;
          text-decoration: none;
          font-weight: 600;
          padding: 0 4px;
          transition: all 0.3s;
        }

        .link-button:hover {
          color: #1e40af;
          text-decoration: underline;
        }

        @media (min-width: 768px) {
          .login-left {
            display: flex;
          }
        }

        @media (max-width: 768px) {
          .login-container {
            flex-direction: column;
          }

          .login-right {
            min-height: 100vh;
          }

          .login-card {
            padding: 40px 30px;
          }
        }
      `}</style>
    </div>
  )
}
